import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { NextAuthOptions, User } from 'next-auth'
import { authenticate } from '../../../api/userApi';

console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  
  providers: [
    CredentialsProvider({
      type: 'credentials',    
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
           email: string, 
           password: string,
        };
        const resp = await authenticate({email, password});
        if (resp.status === 200) {
          return resp.data;
        } else {
          throw new Error(`Authentication error for user with email: ${email}`)
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  // callbacks: {
  //   async session({ session, user }) {
  //     session.user = user As;
  //     return session;
  //   }
  // }
}

export default NextAuth(authOptions);
