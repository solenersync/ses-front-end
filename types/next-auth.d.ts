import 'next-auth/next';

declare module 'next-auth' {
  interface User {
      name: string;
      email: string;
      userId: string;     
    }; 
  interface Session {
    user: User;
  }
 }
