'use client'
import { useState } from 'react';

import {fetchNFTs} from '../../utils/fetchNft';
import { ethers } from 'ethers';
import NftCard from '@/components/NftCard';

const nftABI = require("../../utils/nft-abi.json");

const Explore = () => {
    const network = "goerli"
    const API_KEY = "F_v3giM_QYUTUdgcsSJxxgSXw-cpf1aN"
const CONTRACT_ADDRESS_MARKET = "0xc99040D7ed043D2b6602670EDDcB435a24115185"



    const [owner, setOwner] = useState("")
    const [contractAddress, setContractAddress] = useState("")
    const [NFTs, setNFTs] = useState("")
const [contractNft, setContractNft] = useState(null);
const [addressNft, setAddressNft] = useState(null);



    
    const connectNftContract = async () => {
        if(!contractAddress) {
            alert('ban chua nhap your contract address nft');
            return;
        }
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
                  const signer = provider.getSigner();
        // const alchemyProvider = new ethers.providers.AlchemyProvider(network, API_KEY);

                  const nft = new ethers.Contract(contractAddress, nftABI, signer);
                  setContractNft(nft);
                  // setGlobalState('connectNftExternal', true);
                  console.log('external nft', nft);
      
        } catch (error) {
          
        }
      }

      const searchNftFromContract = async () => {
        

        if(  !owner || !contractAddress) {
            alert('ban chua nhap wallet address & your nft contract address');
            return
        };
        await fetchNFTs(owner, contractAddress, setNFTs    );
      }

      const setApprovalForAllNft = async() => {
        if(contractNft === null) return;
        try {
          console.log(contractNft)
          const setApprovalForAll =  await contractNft.setApprovalForAll(CONTRACT_ADDRESS_MARKET, true);
          // setGlobalState('setApproveAllNftExternal', true)
        console.log('setApprovalForAll', setApprovalForAll);
        } catch (error) {
          
        }
        
      }
    

    return (
        <div className='bg-[#151c25]'>
            <header className=' py-24   w-full   alchemy '>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                            Alchemy NFT Explorer
                        </h1>
                        <p>An inspector to find NFTs by owner and contract address </p>
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>

               

                        <input className="border rounded-sm focus:outline-none py-2 px-3 w-full " value={owner} onChange={(e) => setOwner(e.target.value)} placeholder='Insert your wallet address' required/>


                   
            
                        <input className="focus:outline-none rounded-sm py-2 px-3 w-full" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder='Insert NFT Contract address (optional)' required/>

                        
                    </div>
                    <div className='w-2/6 flex justify-center mb-5'>
                    <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100' onClick={searchNftFromContract}>Search</button>
                    </div>

                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>
                    {/* <input className="focus:outline-none rounded-sm py-2 px-3 w-full" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder='Insert NFT Contract address (optional)'></input> */}
                        <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100' onClick={connectNftContract}>Connect Nft</button>
                    </div>

                    {
                        contractNft && (
<div className='w-2/6 flex justify-center mb-5'>
                    <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100' onClick={setApprovalForAllNft}>setApprovalForAll</button>
                    </div>
                        )
                    }
                    
                </div>
            </header>

            <section className='flex flex-wrap justify-center'>
                {
                    NFTs ? NFTs.map(NFT => {
                       
                        return (
                            <div>
                                <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                           List NFT 
                        </h1>
                      
                    </div>
                                <NftCard  image={NFT.media[0].gateway} id={NFT.id.tokenId } title={NFT.title} address={NFT.contract.address} description={NFT.description} attributes={NFT.metadata.attributes} />
                            </div>
                           
                        )
                    }) : 
                    <div className='mb-16 text-white text-center'>
                    <h1 className='text-5xl  font-bold font-body mb-2'>
                    No NFTs found
                    </h1>
                  
                </div>
                }
            </section>
        </div>
    )
}


export default Explore