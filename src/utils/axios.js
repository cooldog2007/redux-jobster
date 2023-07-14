import axios from "axios";
import { getLocalUser } from "./localStorage";

export const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use((config) => {
  const user = getLocalUser();
  try {
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});
