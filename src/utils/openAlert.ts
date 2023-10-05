
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const showErrorToast = (message) => {
    toast.error(message)
  }
  
export const showSuccessToast = (message) => {
    toast.success(message)
  }
  