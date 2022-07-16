import axios from "axios";
import { getItem } from "utils/storeData";
import { BACKEND_URL } from "../../config";

const axiosClient = axios.create({
  baseURL: BACKEND_URL,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    //If local storage has toke, then attach it into request
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);
    config.headers.common.Authorization = `Bearer ${accessToken}`;

    //Using the form-data
    if (config.data instanceof FormData) {
      Object.assign(config.headers, config.data.getHeaders());
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    console.log(response);
    if (response.status === 200 || response.status === 201) {
    }
    return response.data;
  },
  async (err) => {
    const originalConfig = err.config;

    const accessToken = getItem("token");
    if (accessToken && originalConfig.url !== "/auth/signin" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await axiosClient.post("/auth/refresh-token", {
            refreshToken: localStorage.getItem("refreshToken"),
          });

          const { success, accessToken } = rs.data;
          if (!success) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
          } else localStorage.setItem("token", accessToken);

          return axiosClient(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosClient;
