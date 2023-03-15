export interface ISolarArray {
  solarArrayId: number;
  lon: number;
  lat: number;
  peakPower: number;
  systemLoss: number;
  angle: number;
  aspect: number;
  mounting: string;
  userId: string;
}
