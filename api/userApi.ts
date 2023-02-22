export const getUser = async (email: string) => {  
  const res = await fetch(`http://localhost:8081/api/v1/users/user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  return res.json();
}