export interface ISolarArray {
  solarArrayId: number;
  lon: number;
  lat: number;
  peakPower: number;
  loss: number;
  angle: number;
  aspect: number;
  mounting: string;
  userId: number;
}
