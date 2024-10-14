import { ToastContainer, toast } from "react-toastify";

function createNotification(type, message, redirect) {
  toast[type](message, {
    toastId: message,
    pauseOnFocusLoss: false,
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    onClick: ()=> {
      if (redirect) return window.location.href = redirect
      else return null
    }
  });

}

export { createNotification, ToastContainer, toast };