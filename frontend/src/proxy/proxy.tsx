import axios from "axios";

export const url = process.env.NEXT_PUBLIC_API_URL;
export const api = axios.create({
  baseURL: `${url}`,
});

export const url_md5 =
  "https://sos-backoffice-api.azurewebsites.net/3tecnos/sosbackoffice/walkietalkie";
export const api_md5 = axios.create({
  baseURL: `${url_md5}`,
});
