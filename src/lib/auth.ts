import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Passkey from "next-auth/providers/passkey";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // OAuth 提供商
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Passkey 无密码认证 (WebAuthn)
    Passkey({
      // 默认配置，支持 FIDO2 和 WebAuthn 标准
      // 需要配置数据库以存储 passkey 凭证
    }),
  ],
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
  },
  pages: {
    signIn: "/login",
  },
});
