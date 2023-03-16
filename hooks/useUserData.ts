import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { getUser } from 'api/userApi';

export const useUserData = () => {
  const { status, data: sessionData } = useSession();
  const [userId, setUserId] = useState<string | null>(null);

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
      const userData = await getUser(user.email);
      setUserId(userData.userId);
    }
    fetchData();
  }, [status, sessionData]);

  return userId;
};