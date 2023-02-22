import 'next-auth/next';

declare module 'next-auth' {
  interface User {
      name: string;
      email: string;
      user_id: string;     
    }; 
  interface Session {
    user: User;
  }
 }
