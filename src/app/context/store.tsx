'use client'

import { getContractInstance, initEthersProvider } from "@/web3";
import { ethers } from "ethers";
import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode} from "react";
import Marketplace from '../../../Marketplace.json';


type Props = { children: ReactNode }
interface ContextProps {
 
  connectNft: boolean,
  setConnectNft: Dispatch<SetStateAction<boolean>>,
  ApprovalForAll: boolean,
  setApprovalForAll: Dispatch<SetStateAction<boolean>>,

 
  
}

const GlobalContext = createContext<ContextProps>({
 
  connectNft : false,
  setConnectNft:() => {},
  ApprovalForAll: false,
  setApprovalForAll:() =>{},
  
});

export const GlobalContextProvider :React.FC<Props>= ({children}) =>{
   
    const [connectNft, setConnectNft] = useState(false);
    const [ApprovalForAll, setApprovalForAll] = useState(false);
    

   

    return (
        <GlobalContext.Provider value={{connectNft, setConnectNft , ApprovalForAll, setApprovalForAll}}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);