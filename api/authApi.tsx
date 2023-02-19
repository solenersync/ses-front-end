export const createUser = async (userData: any) => {
  let user = {
    email: userData.email,
    name: userData.name,
    password: userData.password,
  };
  const res = await fetch("http://localhost:8080/api/v1/users/user/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res;
};

export const authenticate = async (userData: any) => {
  let user = {
    email: userData.email,
    password: userData.password,
  };
  const res = await fetch("http://localhost:8080/api/v1/users/user/authenticate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return res.json();
};

