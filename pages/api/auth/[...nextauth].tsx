import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Hash from "../../../lib/Hash";
import { getToken } from "next-auth/jwt";

interface userResData {
  user: {
    id: string | undefined;
    nickname: string | undefined;
    authority: string | undefined;
  };
}

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
        // Add logic here to look up the user from the credentials supplied
        if (credentials?.userId && credentials?.userPw) {
          const hashedPw = await Hash.pwHashing(
            credentials?.userId,
            credentials?.userPw
          ).then((res2: any) => {
            return res2;
          });

          //console.log("after pwHasing ======", hashedPw);
          const user = login(credentials.userId, hashedPw).then(
            (res: userResData) => {
              if (res != null) {
                // console.log("userLogin :::", res);
                const userData = {
                  id: res.user.id,
                  name: res.user.nickname,
                  authority: res.user.authority,
                  email: "user@test.com",
                  image: "userImage.jpeg",
                };
                //console.log("userData", userData);
                return userData;
              } else {
                return null;
              }
              // Any object returned will be saved in `user` property of the JWT
            }
          );
          return user;
          // Any object returned will be saved in `user` property of the JWT
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
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
    secret: process.env.VERCEL_NEXTAUTH_JWT_SECRET,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      console.log("signIn : :::: : :::", user, account);
      // credential provider에서 return 해준 user 찍힘
      // user{
      //  id: 'admin',
      //  name: '이형래',
      //  authority: 'all',
      //  email: 'user@test.com',
      //  picture: 'user.jpeg'
      //  image:'userImage.jpeg'
      // }
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      console.log("url,baseUrl", url, baseUrl);
      // Allows relative callback URLs
      //if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      //else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account, user }: any) {
      if (account) {
        console.log("account, token user :::", account, token, user);

        // token 반환값
        // token{
        //  name: '이형래',
        //  email: 'user@test.com',
        //  picture: 'userImage.jpeg',
        //  sub: 'admin'
        // }

        // 필요시 토큰 수정 가능
        // token.mobile = "010-1234-5678";
        // token.test = "this is test";
        // token.email = "token@test.com";
        // token.picture = "token.jpeg";
        // token.authority = user.authority;
        // token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      console.log("session,token :: ::::", session, token);
      session.token = token;
      // session 에서 기본적으로 user 반환 {email,image,name 최소 정보만 제공하도록 default}
      // 독스에서는 user 객체 수정은 session 콜백에서 하라고 되있네요

      // 필요시 user 객체 수정 가능
      // session.user.authority = token.authority;
      // session.user.mobile = token.mobile";
      // session.user.test = token.test;

      // session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.VERCEL_NEXTAUTH_SECRET,
};

const login: Function = async (
  userId: string | undefined,
  userPw: string | undefined
) => {
  //console.log("login id/pw ======", userId, userPw);

  const res = await axios.post("http://localhost:3000/api/user/login", {
    loginData: {
      id: userId,
      pw: userPw,
    },
  });
  if (res.data.loginState === true) {
    // console.log("res가 찍히나 ?", res.data);
    return res.data;
  } else {
    return res.data.error;
  }
};

export default NextAuth(authOptions);
