export interface ISolarForecastRequest {
  lon: number;
  lat: number;
  peakPower: number;
  loss: number;
  angle: number;
  aspect: number;
  mounting: string;
  userId: string;
  month: number;
}
