export interface FirebaseClientConfig {
  apiKey: string;
  appId: string;
  authDomain: string;
  measurementId?: string;
  projectId: string;
}

const requiredPublicFirebaseConfig = {
  apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
  appId: "NEXT_PUBLIC_FIREBASE_APP_ID",
  authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
} as const;

function readPublicEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

export function getFirebaseClientConfigStatus() {
  const config: FirebaseClientConfig = {
    apiKey: readPublicEnv(requiredPublicFirebaseConfig.apiKey),
    appId: readPublicEnv(requiredPublicFirebaseConfig.appId),
    authDomain: readPublicEnv(requiredPublicFirebaseConfig.authDomain),
    measurementId: readPublicEnv("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID") || undefined,
    projectId: readPublicEnv(requiredPublicFirebaseConfig.projectId),
  };
  const missing = Object.values(requiredPublicFirebaseConfig).filter(
    (name) => !readPublicEnv(name)
  );

  return {
    config,
    configured: missing.length === 0,
    missing,
  };
}

export function getFirebaseClientConfig() {
  const status = getFirebaseClientConfigStatus();
  return status.configured ? status.config : null;
}

export function isFirebaseClientAuthConfigured() {
  return getFirebaseClientConfigStatus().configured;
}
