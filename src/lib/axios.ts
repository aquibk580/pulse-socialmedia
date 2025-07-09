import axios from "axios";
import { store } from "@/redux/store";
import { clearUser } from "@/redux/slices/user";
import { clearAdmin } from "@/redux/slices/admin";

// Enable credentials (cookies) for every request
axios.defaults.withCredentials = true;

// Create a global axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.data?.flag === "NoTokenProvided"
    ) {
      store.dispatch(clearUser());
    }
    if (
      axios.isAxiosError(error) &&
      error.response?.data?.flag === "NoAdminTokenProvided"
    ) {
      store.dispatch(clearAdmin());
    }

    return Promise.reject(error);
  }
);

export default API;
