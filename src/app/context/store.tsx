'use client'

import { getContractInstance, initEthersProvider } from "@/web3";
import { ethers } from "ethers";
import { createContext, useContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import Marketplace from '../../../Marketplace.json';



// type DataType = {
//     firstName: string;
// }

// interface ContextProps {
//     userId: string,
//     setUserId: Dispatch<SetStateAction<string>>,
//     data: DataType[],
//     setData: Dispatch<SetStateAction<DataType[]>>
// }

// const GlobalContext = createContext<ContextProps>({
//     userId:'',
//     setUserId: ():string =>'',
//     data:[],
//     setData:():DataType[] =>[] 
// })
interface ContextProps {
  userId: string,
  setUserId: Dispatch<SetStateAction<string>>,
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
}

const GlobalContext = createContext<ContextProps>({
  userId: '',
  setUserId: ():string =>'',
  provider: null,
  signer: null,
  contract: null,
});
// const Web3Context = createContext<{
//     provider:  null;
//     contract:  null;
//   }>({
//     provider: null,
//     contract: null,
//   });

export const GlobalContextProvider = ({children}) =>{
    const [userId, setUserId] = useState('');
    // const [data, setData] = useState<[] | DataType[]>([]);
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {

    const fetchContract = async() => {
      try {
        // const ethersProvider = initEthersProvider();
        // const signer: any = ethersProvider.getSigner();
        // const contractInstance = getContractInstance(
        //     Marketplace.address, // Replace with your contract's ABI
        //     Marketplace.abi, // Replace with your contract's address
        //     signer
        // );

        const provider =  new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
        // console.log('contract', contract1);
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        console.log('smart contract', contract);
        
      } catch (error: any) {
        console.error(error.message);
      }
    }
    
    fetchContract();
     
   
  },[] );

    return (
        <GlobalContext.Provider value={{userId, setUserId,provider, signer, contract}}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);