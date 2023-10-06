
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const showErrorToast = (message:any) => {
    toast.error(message)
  }
  
export const showSuccessToast = (message:any) => {
    toast.success(message)
  }
  