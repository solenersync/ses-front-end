export const authenticate = async (userData: any) => {
  let userDetails = {
    email: userData.email,
    password: userData.password,
  };
  const res = await fetch('http://localhost:8081/api/v1/users/user/authenticate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userDetails),
  });
  return res.json();
};

