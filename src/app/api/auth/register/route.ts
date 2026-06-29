import { NextResponse } from "next/server";
import { assertAuthRateLimit } from "@/lib/auth-rate-limit";
import {
  isRegistrationEnabled,
  isRegistrationPersistenceConfigured,
  isRegistrationPersistenceRequired,
} from "@/lib/password-auth";
import {
  isFirebaseAuthBridgeConfigured,
  registerFirebaseAuthUser,
} from "@/lib/firebase-auth-bridge";
import { getFirebaseClientConfigStatus } from "@/lib/firebase-client-config";
import { notFoundApiResponseInProduction } from "@/lib/production-api-guard";
import {
  isRegistrationTurnstileConfigured,
  isRegistrationTurnstileRequired,
  verifyRegistrationTurnstile,
} from "@/lib/turnstile";
import { upsertUserProfile } from "@/lib/user-store";

export const dynamic = "force-dynamic";

function messageFor(error: unknown) {
  const code = error instanceof Error ? error.message : "registration_failed";

  switch (code) {
    case "registration_disabled":
      return { error: "Registration is not enabled.", errorCode: code, status: 403 };
    case "invalid_email":
      return { error: "Please enter a valid email address.", errorCode: code, status: 400 };
    case "weak_password":
      return { error: "Password must be at least 8 characters.", errorCode: code, status: 400 };
    case "admin_email_reserved":
      return { error: "This email is reserved and cannot self-register.", errorCode: code, status: 409 };
    case "email_already_registered":
      return { error: "This email is already registered.", errorCode: code, status: 409 };
    case "captcha_required":
      return { error: "Please complete the verification challenge.", errorCode: code, status: 403 };
    case "captcha_not_configured":
      return { error: "Registration verification is not configured.", errorCode: code, status: 503 };
    case "captcha_failed":
      return { error: "Verification failed. Please try again.", errorCode: code, status: 403 };
    case "registration_persistence_not_configured":
      return { error: "Registration storage is not configured.", errorCode: code, status: 503 };
    case "firebase_auth_not_configured":
      return { error: "Firebase Auth is not configured.", errorCode: code, status: 503 };
    case "firebase_client_not_configured":
      return { error: "Firebase browser auth is not configured.", errorCode: code, status: 503 };
    case "firebase_project_mismatch":
      return { error: "Firebase client and server projects do not match.", errorCode: code, status: 503 };
    case "rate_limited":
      return { error: "Too many attempts. Please try again later.", errorCode: code, status: 429 };
    default:
      return { error: "Unable to create account.", errorCode: "registration_failed", status: 500 };
  }
}

function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();

  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    forwardedIp ||
    "unknown"
  );
}

function getRegistrationReadiness() {
  const blockers: string[] = [];
  const enabled = isRegistrationEnabled();
  const persistenceRequired = isRegistrationPersistenceRequired();
  const persistenceConfigured = isRegistrationPersistenceConfigured();
  const captchaRequired = isRegistrationTurnstileRequired();
  const captchaConfigured = isRegistrationTurnstileConfigured();
  const firebaseClient = getFirebaseClientConfigStatus();
  const firebaseBridgeConfigured = isFirebaseAuthBridgeConfigured();

  if (!enabled) {
    blockers.push("registration_disabled");
  }

  if (persistenceRequired && !persistenceConfigured) {
    blockers.push("registration_persistence_not_configured");
  }

  if (captchaRequired && !captchaConfigured) {
    blockers.push("captcha_not_configured");
  }

  if (!firebaseBridgeConfigured) {
    blockers.push("firebase_auth_not_configured");
  }

  if (!firebaseClient.configured) {
    blockers.push("firebase_client_not_configured");
  }

  if (
    firebaseClient.configured &&
    process.env.FIREBASE_PROJECT_ID &&
    firebaseClient.config.projectId !== process.env.FIREBASE_PROJECT_ID
  ) {
    blockers.push("firebase_project_mismatch");
  }

  return {
    blockers,
    captcha: {
      configured: captchaConfigured,
      required: captchaRequired,
    },
    enabled,
    firebase: {
      bridgeConfigured: firebaseBridgeConfigured,
      clientConfigured: firebaseClient.configured,
      missingClientEnv: firebaseClient.missing,
    },
    persistence: {
      configured: persistenceConfigured,
      required: persistenceRequired,
    },
    ready: blockers.length === 0,
  };
}

export async function GET() {
  const hiddenResponse = notFoundApiResponseInProduction();
  if (hiddenResponse) return hiddenResponse;

  return NextResponse.json(getRegistrationReadiness());
}

export async function POST(request: Request) {
  const hiddenResponse = notFoundApiResponseInProduction();
  if (hiddenResponse) return hiddenResponse;

  try {
    const requestIp = getRequestIp(request);
    const payload = (await request.json()) as {
      captchaToken?: unknown;
      email?: unknown;
      name?: unknown;
      password?: unknown;
      turnstileToken?: unknown;
    };

    if (typeof payload.email !== "string" || typeof payload.password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required.", errorCode: "missing_fields" },
        { status: 400 }
      );
    }

    if (!isRegistrationEnabled()) {
      throw new Error("registration_disabled");
    }

    if (isRegistrationPersistenceRequired() && !isRegistrationPersistenceConfigured()) {
      throw new Error("registration_persistence_not_configured");
    }

    await assertAuthRateLimit({
      identifier: requestIp,
      limit: 8,
      scope: "registration-ip",
      windowMs: 60 * 60 * 1000,
    });

    await assertAuthRateLimit({
      identifier: payload.email,
      limit: 3,
      scope: "registration-email",
      windowMs: 60 * 60 * 1000,
    });

    await verifyRegistrationTurnstile(
      payload.turnstileToken ?? payload.captchaToken,
      requestIp === "unknown" ? null : requestIp
    );

    if (!isFirebaseAuthBridgeConfigured()) {
      throw new Error("firebase_auth_not_configured");
    }

    const firebaseClient = getFirebaseClientConfigStatus();
    if (!firebaseClient.configured) {
      throw new Error("firebase_client_not_configured");
    }

    if (
      process.env.FIREBASE_PROJECT_ID &&
      firebaseClient.config.projectId !== process.env.FIREBASE_PROJECT_ID
    ) {
      throw new Error("firebase_project_mismatch");
    }

    const { firebaseUser } = await registerFirebaseAuthUser({
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : undefined,
      password: payload.password,
    });

    const profile = await upsertUserProfile({
      email: firebaseUser.email,
      id: `firebase_${firebaseUser.uid}`,
      image: firebaseUser.photoURL,
      name: firebaseUser.displayName,
      role: "user",
    });

    return NextResponse.json(
      {
        profile: profile
          ? {
              email: profile.email,
              id: profile.id,
              name: profile.name,
              role: profile.role,
            }
          : null,
      },
      { status: 201 }
    );
  } catch (error) {
    const message = messageFor(error);
    if (message.status >= 500) {
      console.error("Registration failed:", error);
    }
    return NextResponse.json(
      { error: message.error, errorCode: message.errorCode },
      { status: message.status }
    );
  }
}
