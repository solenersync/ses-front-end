import { User } from 'next-auth';

export const getUser = async (email: string) => {  
  const res = await fetch(`http://localhost:8081/api/v1/users/user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email }),
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data;
}

export const createUser = async (userData: any) => {
  let user = {
    email: userData.email,
    name: userData.name,
    password: userData.password,
  };
  const res = await fetch('http://localhost:8081/api/v1/users/user/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return res;
};

export const updateUser = async (user: User) => { 
  const res = await fetch(`http://localhost:8081/api/v1/users/user/update`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data;
}