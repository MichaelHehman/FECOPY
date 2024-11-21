import { toast } from 'react-toastify';

const notifier = {
  success: (message) => {
    toast.success(message, {
      position: "top-center",
    });
  },
  error: (message) => {
    toast.error(message, {
      position: "top-right",
    });
  },
  warning: (message) => {
    toast.warning(message, {
      position: "top-right",
    });
  },
  info: (message) => {
    toast.info(message, {
      position: "top-right",
    });
  }
};

export default notifier;