import notifier from "./notifier";

const errorHandler = (error) => {
    console.log(error);
    // notifier.error(error);
};

export default errorHandler;
