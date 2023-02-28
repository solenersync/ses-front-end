import { ISolarArray } from 'types/ISolarArray';

export const getSolarForecast = async (arrayData: ISolarArray) => {

  const res = await fetch("http://localhost:8080/api/v1/pv/daily", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arrayData),
  });
  return res.json();
};
