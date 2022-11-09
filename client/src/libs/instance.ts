import axios from "axios";
import { TOKEN } from "@/constants/common";

const token = localStorage.getItem(TOKEN);

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
});

instance.interceptors.request.use(
  function (config) {
    config.headers = config.headers ?? {};

    if (!!token) {
      config.headers["Authorization"] = token;
    }

    config.headers["Content-Type"] = "application/json; charset=utf-8";

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
