import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Passkey from "next-auth/providers/passkey";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore, firebaseEnabled } from "./firebase-admin";

const providers = [];

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  );
}

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

const passkeyEnabled = firebaseEnabled && process.env.AUTH_DISABLE_PASSKEY !== "true";
if (passkeyEnabled) {
  providers.push(Passkey({
    formFields: {
      email: {
        label: "Email",
        required: true,
        autocomplete: "username webauthn",
      },
    },
  }));
}

if (providers.length === 0) {
  // 在构建时允许没有 provider，运行时才会报错
  console.warn("Warning: No authentication providers configured. Please set env variables.");
}

const adapter = firebaseEnabled && firestore ? FirestoreAdapter(firestore) : undefined;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  experimental: {
    enableWebAuthn: true,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPrivate = nextUrl.pathname.startsWith("/diary") ||
                        nextUrl.pathname.startsWith("/private");
      
      if (isPrivate) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }
      
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id ?? user.email ?? token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
