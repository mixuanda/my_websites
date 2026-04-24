import { NextResponse } from "next/server";
import { registerPasswordAuthUser } from "@/lib/password-auth";
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
      return { error: "This email is reserved for administrator login.", errorCode: code, status: 409 };
    case "email_already_registered":
      return { error: "This email is already registered.", errorCode: code, status: 409 };
    default:
      return { error: "Unable to create account.", errorCode: "registration_failed", status: 500 };
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      email?: unknown;
      name?: unknown;
      password?: unknown;
    };

    if (typeof payload.email !== "string" || typeof payload.password !== "string") {
      return NextResponse.json(
        { error: "Email and password are required.", errorCode: "missing_fields" },
        { status: 400 }
      );
    }

    const credentialUser = await registerPasswordAuthUser({
      email: payload.email,
      name: typeof payload.name === "string" ? payload.name : undefined,
      password: payload.password,
    });

    const profile = await upsertUserProfile({
      email: credentialUser.email,
      id: credentialUser.id,
      name: credentialUser.name,
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
    console.error("Registration failed:", error);
    const message = messageFor(error);
    return NextResponse.json(
      { error: message.error, errorCode: message.errorCode },
      { status: message.status }
    );
  }
}
