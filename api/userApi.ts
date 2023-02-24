import { User } from 'next-auth';

export const getUser = async (email: string) => {  
  const res = await fetch(`http://localhost:8081/api/v1/users/user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  return res.json();
}

export const updateUser = async (user: User) => { 
  const res = await fetch(`http://localhost:8081/api/v1/users/user/update`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  console.log(user)
  return res.json();
}