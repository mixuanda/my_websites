"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  type Auth,
  type AuthProvider,
} from "firebase/auth";
import { getFirebaseClientConfig } from "@/lib/firebase-client-config";

export function getFirebaseClientAuth(): Auth {
  const config = getFirebaseClientConfig();
  if (!config) {
    throw new Error("firebase_client_not_configured");
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(config);
  return getAuth(app);
}

export function getFirebasePopupProvider(provider: "github" | "google"): AuthProvider {
  if (provider === "github") {
    const githubProvider = new GithubAuthProvider();
    githubProvider.addScope("user:email");
    return githubProvider;
  }

  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope("email");
  googleProvider.addScope("profile");
  googleProvider.setCustomParameters({ prompt: "select_account" });
  return googleProvider;
}
