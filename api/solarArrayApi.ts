import { ISolarArray } from 'types/ISolarArray';

export const getArrayData = async (userId: string) => {
  const res = await fetch(`http://localhost:8083/api/v1/solar-arrays/array/user/${userId}`);
  return res.json();
}

export const updateArray = async (arrayData: ISolarArray) => {

  const res = await fetch("http://localhost:8083/api/v1/solar-arrays/update", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arrayData),
  });
  return res.json();
};