// utils/web3.ts
import { ethers } from 'ethers';

export function initEthersProvider() {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
  return new ethers.providers.Web3Provider(window.ethereum);
// return signer;
}

export function getContractInstance(
  address: string,
  abi: any,
  provider: any
) {
  return new ethers.Contract(address, abi, provider);
}