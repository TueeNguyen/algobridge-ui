import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const nextauth = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "openid",
          ].join(" "),
          response: "code",
        },
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth?.user;
    },
    jwt({ token }) {
      return token;
    },
  },
});

export const { handlers, signIn, signOut, auth } = nextauth;
