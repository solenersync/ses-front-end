export interface ISolarForecastData {
  time: string;
  month: number;
  peakGlobalOutput: number;
  'G(i)': number;
  'Gb(i)': number;
  'Gd(i)': number;
  'Gcs(i)': number;
  lowCloud: number;
  midCloud: number,
  highCloud: number,
  maxCloudCover: number,
  date: string;
  totalPowerOutput: number,

}