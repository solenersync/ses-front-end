import 'next-auth/next';

declare module 'next-auth' {
  interface User {
      name: string;
      email: string;
      userId: number;     
    }; 
  interface Session {
    user: User;
  }
 }
