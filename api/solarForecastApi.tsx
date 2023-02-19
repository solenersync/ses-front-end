export const getSolarForecast =  async () => {

 let userData = {
  "user_id": 1,
  "lat": 52.12121,
  "lon": 8.121,
  "peakpower": 6,
  "loss": 0.1,
  "angle": 35,
  "aspect": 0,
  "mounting": "FREE",
  "month": 4
}

const res = await fetch(
  'http://localhost:8080/api/v1/pv/daily',
  {
    method: 'POST',
    headers: {},
    body: JSON.stringify(userData),
  }
);
return res;
}