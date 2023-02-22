import { SolarArray } from 'models/SolarArray';

export const getSolarForecast = async (arrayData: SolarArray) => {

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
