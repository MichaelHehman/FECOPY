import axiosInstance from "../utils/axiosInstance";  
import errorHandler from "../utils/errorHandler";  
import notifier from "../utils/notifier";  
  
// Helper functions  
const setLocalStorage = (token, user) => {  
    localStorage.setItem("token", token);  
    localStorage.setItem("user", JSON.stringify(user));  
};  
  
const clearLocalStorage = () => {  
    localStorage.removeItem("token");  
    localStorage.removeItem("user");  
};  
  
const handleAuthResponse = (response) => {  
    if (response?.data?.data) {  
        const { token, user } = response.data.data;  
        setLocalStorage(token, user);  
        notifier.success("Authentication successful!");  
        window.location.assign("/");  
        return { success: true, data: response.data.data };  
    }  
    return { success: false, message: "Invalid response format" };  
};  
  
const handleError = (error) => {  
    const message = error.response?.data?.message || "An error occurred";  
    errorHandler(message);  
    return {  
        success: false,  
        status: error.response?.status,  
        message  
    };  
};  
  
// Auth functions  
export const signup = async (user) => {  
    try {  
        const response = await axiosInstance.post("/users/signup", {  
            name: user.name,  
            email: user.email,  
            password: user.password,  
        });  
        return handleAuthResponse(response);  
    } catch (error) {  
        return handleError(error);  
    }  
};  
  
export const login = async (credentials) => {  
    try {  
        const response = await axiosInstance.post("/users/login", {  
            email: credentials.email,  
            password: credentials.password,  
        });  
        return handleAuthResponse(response);  
    } catch (error) {  
        return handleError(error);  
    }  
};  
  
export const googleLogin = async (credential) => {  
    try {  
        const response = await axiosInstance.post("/users/google-login", {  
            credential  
        });  
        return handleAuthResponse(response);  
    } catch (error) {  
        return handleError(error);  
    }  
};  
  
export const googleSignup = async (credential) => {  
    try {  
        const response = await axiosInstance.post("/users/google-signup", {  
            credential  
        });  
        return handleAuthResponse(response);  
    } catch (error) {  
        return handleError(error);  
    }  
};  
  
export const logOut = async () => {  
    try {  
        clearLocalStorage();  
        notifier.success("Logged out successfully!");  
        return { success: true };  
    } catch (error) {  
        return handleError(error);  
    }  
};  
  
export const updateUser = async (userData) => {  
    try {  
        const userString = localStorage.getItem("user");  
        if (!userString) {  
            throw new Error("No user found");  
        }  
  
        const user = JSON.parse(userString);  
        const response = await axiosInstance.put(`/users/${user._id}`, userData);  
          
        if (response?.data?.data) {  
            localStorage.setItem("user", JSON.stringify(response.data.data));  
            notifier.success("Profile updated successfully!");  
            return { success: true, data: response.data.data };  
        }  
          
        return { success: false, message: "Invalid response format" };  
    } catch (error) {  
        return handleError(error);  
    }  
};  
  
// Get current user helper  
export const getCurrentUser = () => {  
    try {  
        const userString = localStorage.getItem("user");  
        return userString ? JSON.parse(userString) : null;  
    } catch (error) {  
        clearLocalStorage();  
        return null;  
    }  
};  