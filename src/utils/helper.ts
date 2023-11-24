import { ethers } from "ethers";

const imageNameToUrl = (name: string) =>
  `${process.env.NEXT_PUBLIC_API_HOST}/${name}`;

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
   const showErrorToast = (message:any) => {
      toast.error(message)
    }
    
   const showSuccessToast = (message:any) => {
      toast.success(message)
    }



export function toWei(amount:any, decimal = 6) {
    const toWei = ethers.utils.parseUnits(amount,decimal);
    return toWei.toString();
}

export function toEth(amount:any, decimal = 6) {
    const toEth = ethers.utils.formatUnits(amount, decimal);
    return toEth.toString();
}


export { imageNameToUrl, showErrorToast, showSuccessToast };
