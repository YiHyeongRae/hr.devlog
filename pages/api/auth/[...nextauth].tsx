import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "admin",
      type: "credentials",
      name: "admin",
      credentials: {
        username: {
          label: "id",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        // console.log("req::::", req);
        // console.log("credentials : :::: : :::", credentials);

        if (credentials?.userId && credentials?.userPw) {
          const admin = login(credentials?.userId, credentials?.userPw);
          console.log("admin :::: ?");
          return admin;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    maxAge: 6 * 60 * 60, // 6 hours
    updateAge: 1 * 60 * 60, // 1 hours
  },
  jwt: {
    maxAge: 6 * 60 * 60, // 6 hours
    secret: "",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      // console.log("signIn : :::: : :::", user);
      account.lastLogin = user.lastLogin;
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account }: any) {
      if (account) {
        // console.log("account:::", account);
        token.accessToken = account.access_token;
        token.lastLogin = account.lastLogin;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.user.lastLogin = token.lastLogin;

      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

const login: Function = async (
  userId: string | undefined,
  userPw: string | undefined
) => {
  try {
    const res = await axios.post("http://localhost:3000/api/login", {
      id: userId,
      pw: userPw,
    });
    console.log("res가 찍히나 ?", res);
    return res;
  } catch (error: any) {
    console.log("error가 찍히나 ?", error);
    return error;
  }
};

export default NextAuth(authOptions);
