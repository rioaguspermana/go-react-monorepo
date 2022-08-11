import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/api/assist/auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          await axios.post("/api/assist/auth/refresh_token", {});
          return instance(originalConfig);
        } catch (error) {
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(err);
    }
  }
);

export default instance;
