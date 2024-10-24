import axios from "axios";
export const url = "http://10.0.0.154:4000";
export const api = axios.create({
  baseURL: `${url}`,
});
