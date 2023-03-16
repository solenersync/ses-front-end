import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { getUser } from 'api/userApi';
import { User } from 'next-auth';

export const useUserData = () => {
  const { status, data: sessionData } = useSession();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }
    if (!sessionData) {
      Router.replace('/login');
      return;
    }
    const { user } = sessionData;
    async function fetchData() {
      const userResp = await getUser(user.email);
      setUserData(userResp);
    }
    fetchData();
  }, [status, sessionData]);

  return userData;
};