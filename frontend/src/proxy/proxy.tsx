import axios from "axios";
export const url = "http://192.168.1.9:4000";
export const api = axios.create({
  baseURL: `${url}`,
});
