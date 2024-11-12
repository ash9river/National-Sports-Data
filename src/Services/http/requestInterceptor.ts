/* import { sessionTokenKeyName } from "@/stores/auth/useAuthTokenStore";
import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(sessionTokenKeyName);
    if (token !== "") {
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Bearer ${token}`;
      return newConfig;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
 */
