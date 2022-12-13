import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Hash from "../../components/Hash/Hash";

interface userResData {
  user: {
    id: string | undefined;
    nickname: string | undefined;
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
          // 여기에 id조회해서 salt 가져오고 pw 해싱하는 구문 필요 ?
          const hashedPw = await Hash.pwHasing(
            credentials?.userId,
            credentials?.userPw
          ).then((res2: any) => {
            return res2;
          });

          console.log("after pwHasing ======", hashedPw);
          const user = login(credentials.userId, hashedPw).then(
            (res: userResData) => {
              if (res != null) {
                //console.log("userInfo:::", res);
                const userData = {
                  id: res.user.id,
                  name: res.user.nickname,
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
    //   async authorize(credentials: any, req) {
    //     // console.log("req::::", req);
    //     // console.log("credentials : :::: : :::", credentials);

    //     if (credentials?.userId && credentials?.userPw) {
    //       const user = login(credentials?.userId, credentials?.userPw).then(
    //         (res: any) => {
    //           const userData = {
    //             id: res.id,
    //           };
    //           return userData;
    //         }
    //       );
    //     } else {
    //       return null;
    //     }
    //   },

    // }),
  ],
  session: {
    maxAge: 6 * 60 * 60, // 6 hours
    updateAge: 1 * 60 * 60, // 1 hours
  },
  jwt: {
    maxAge: 6 * 60 * 60, // 6 hours
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }: any) {
      //console.log("signIn : :::: : :::", user, account);
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      // console.log("url,baseUrl", url, baseUrl);
      // Allows relative callback URLs
      // if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account }: any) {
      if (account) {
        //console.log("account:::", account, token);
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      //console.log("session,token :: ::::", session, token);
      session.accessToken = token.accessToken;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const login: Function = async (
  userId: string | undefined,
  userPw: string | undefined
) => {
  console.log("login id/pw ======", userId, userPw);

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
