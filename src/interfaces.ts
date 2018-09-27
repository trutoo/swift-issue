export interface ISize {
  width: number,
  height: number,
}

export interface IIPDetails {
  status: string,
  country: string,
  countryCode: string,
  region: string,
  regionName: string,
  city: string,
  zip: string,
  lat: number,
  lon: number,
  timezone: string,
  isp: string,
  org: string,
  as: string,
  query: string,
}

export interface IClientDetails {
  os: string,
  browser: string,
  userAgent: string,
  externalIP: string,
  country: string,
  region: string,
  city: string,
  timezone: string,
  screenSize: ISize,
  browserSize: ISize,
  documentSize: ISize,
  colorDepth: number,
  orientation: number,
  locale: string,
  url: string,
  logs: string[],
  date: string,
}
