import { ISolarArray } from 'types/ISolarArray';

export const getArrayData = async (userId: string) => {
  const res = await fetch(`http://localhost:8083/api/v1/solar-arrays/array/user/${userId}`);
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data;
}

export const createArray = async (arrayData: ISolarArray) => {

  const res = await fetch("http://localhost:8083/api/v1/solar-arrays/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arrayData),
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data;
};

export const updateArray = async (arrayData: ISolarArray) => {

  const res = await fetch("http://localhost:8083/api/v1/solar-arrays/update", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arrayData),
  });
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return data;
};

export const solarArrayApi =  {
  getArrayData,
  createArray,
  updateArray,
}