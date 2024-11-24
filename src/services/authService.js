import axiosInstance from "../utils/axiosInstance";
import errorHandler from "../utils/errorHandler";
import notifier from "../utils/notifier";

const signup = async (user) => {
    try {
        return await axiosInstance
            .post("/users/signup", {
                name: user.name,
                email: user.email,
                password: user.password,
            })
            .then(function (res) {
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.data.user),
                );
                window.location.assign("/");
            })
    } catch (err) {
        errorHandler(err.response?.data?.message);
        return { status: err.response?.status, message: err.response?.data?.message };
    }
};

const login = async (credentials) => {
    try {
        return await axiosInstance
            .post("/users/login", {
                email: credentials.email,
                password: credentials.password,
            })
            .then(function (res) {
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.data.user),
                );
                window.location.assign("/");
                notifier.success("Login successful!");
            });
    } catch (err) {
        errorHandler(err.response?.data?.message);
        return { status: err.response?.status, message: err.response?.data?.message };
    }
};

const logOut = async () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
};

const updateUser = async () => {
    try {
        const userString = localStorage.getItem("user");
        let user = null;

        if (userString) {
            user = JSON.parse(userString);
        } else {
            errorHandler("No such user");
        }

        if (user) {
            const id = user._id;

            const res = await axiosInstance
                .get(`/api/v1/users/${id}`)
                .then((res) => {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.data.user),
                    );
                    // console.log(res);
                });

            return res;
        }
    } catch (err) {
        errorHandler(err.message);
    }
};

export { signup, login, logOut, updateUser };