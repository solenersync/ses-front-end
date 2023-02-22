import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions } from "next-auth"
import { authenticate } from "../../../api/authApi";

const authOptions: NextAuthOptions = {
  // session: {
  //   strategy: "jwt"
  // },
  providers: [
    CredentialsProvider({
      type: "credentials",    
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
           email: string, 
           password: string,
        };
        const user = await authenticate({email, password});
        if (user) {
          return user;
        } else {
          throw new Error(`Authentication error for user with email: ${email}`)
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  }
}

export default NextAuth(authOptions);