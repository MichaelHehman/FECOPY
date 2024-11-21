import axios from "axios";
// import errorHandler from "./errorHandler";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// axiosInstance.interceptors.response.use(null, errorHandler);

export default axiosInstance;