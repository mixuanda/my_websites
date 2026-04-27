import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore, firebaseEnabled } from "./firebase-admin";
import { isAdminEmail } from "./membership/config";
import {
  authorizePasswordUser,
  getPasswordAuthUsers,
  isPasswordAuthConfigured,
  isRegistrationEnabled,
} from "./password-auth";
import { recordUserLogin } from "./user-store";
import { isPreviewOnlyPath, isProductionSurface } from "./site-surface";

const githubClientId =
  process.env.GITHUB_CLIENT_ID || process.env.AUTH_GITHUB_ID;
const githubClientSecret =
  process.env.GITHUB_CLIENT_SECRET || process.env.AUTH_GITHUB_SECRET;
const googleClientId =
  process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID;
const googleClientSecret =
  process.env.GOOGLE_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET;

const providers: Provider[] = [];

if (isPasswordAuthConfigured()) {
  providers.push(
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await authorizePasswordUser(credentials.email, credentials.password);
        if (!user) return null;

        return {
          email: user.email,
          id: user.id,
          image: user.image,
          name: user.name,
        };
      },
    })
  );
}

if (githubClientId && githubClientSecret) {
  providers.push(
    GitHub({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

if (googleClientId && googleClientSecret) {
  providers.push(
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      allowDangerousEmailAccountLinking: true,
    })
  );
}

if (providers.length === 0) {
  // 在构建时允许没有 provider；开发运行时给出提示即可。
  if (process.env.NODE_ENV !== "production") {
    console.warn("Warning: No authentication providers configured. Please set env variables.");
  }
}

const configuredPasswordUsers = getPasswordAuthUsers();

const adapter = firebaseEnabled && firestore ? FirestoreAdapter(firestore) : undefined;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: process.env.AUTH_TRUST_HOST !== "0",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (isProductionSurface() && isPreviewOnlyPath(nextUrl.pathname)) {
        return true;
      }

      const isLoggedIn = !!auth?.user;
      const isPrivate = nextUrl.pathname.startsWith("/diary") ||
                        nextUrl.pathname.startsWith("/private") ||
                        nextUrl.pathname.startsWith("/settings") ||
                        nextUrl.pathname.startsWith("/admin");
      
      if (isPrivate) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }
      
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id ?? user.email ?? token.sub;
        token.role = isAdminEmail(user.email) ? "admin" : "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
        (session.user as { role?: string }).role =
          isAdminEmail(session.user.email) || token.role === "admin" ? "admin" : "user";
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      try {
        await recordUserLogin(user, account);
      } catch (error) {
        console.error("Failed to record user login:", error);
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  theme: {
    brandColor: "#2563eb",
    buttonText: "#ffffff",
  },
});

export const authBackendStatus = {
  hasConfiguredProvider: providers.length > 0,
  passwordUserCount: configuredPasswordUsers.length,
  registrationEnabled: isRegistrationEnabled(),
};
