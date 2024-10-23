import axios from "axios";
export const url = "http://localhost:4000";
export const api = axios.create({
  baseURL: `${url}`,
});
