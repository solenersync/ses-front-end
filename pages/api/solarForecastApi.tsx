// export const getSolarForecast2 = () => {
//   return fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
//   ).then((response) => {
//     if(!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//   .catch((error) => {
//     throw error
//   })
// };

export const getSolarForecast =  async () => {
 // Fetch data from external API

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
const data = await res.json().toString();
}