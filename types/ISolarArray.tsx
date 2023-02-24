export interface ISolarArray {
  solar_array_id: number;
  lon: number;
  lat: number;
  peak_power: number;
  systemLoss: number;
  angle: number;
  aspect: number;
  mounting: string;
}