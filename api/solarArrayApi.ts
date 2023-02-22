export const getArrayData = async (userId: string) => {
  const res = await fetch(`http://localhost:8083/api/v1/solar-arrays/array/user/1`);
  return res.json();
}