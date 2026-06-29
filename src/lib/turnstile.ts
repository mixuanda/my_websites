const TURNSTILE_SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileSiteverifyResponse = {
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
  challenge_ts?: string;
  hostname?: string;
  success?: boolean;
};

export function isRegistrationTurnstileRequired() {
  return process.env.AUTH_REGISTRATION_REQUIRE_TURNSTILE === "true";
}

export function isRegistrationTurnstileConfigured() {
  return Boolean(process.env.AUTH_TURNSTILE_SECRET_KEY?.trim());
}

export async function verifyRegistrationTurnstile(
  token: unknown,
  remoteIp?: string | null
) {
  if (!isRegistrationTurnstileRequired()) {
    return;
  }

  if (typeof token !== "string" || !token.trim()) {
    throw new Error("captcha_required");
  }

  const secret = process.env.AUTH_TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    throw new Error("captcha_not_configured");
  }

  const body = new URLSearchParams({
    response: token.trim(),
    secret,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
    body,
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("captcha_failed");
  }

  const result = (await response.json()) as TurnstileSiteverifyResponse;
  if (!result.success) {
    throw new Error("captcha_failed");
  }
}
