
'use client'
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import axios from 'axios';
import Marketplace from '../../../../Marketplace.json';
import ItemNft from '@/components/ItemNft';

interface ItemNftProps {
  price: number;
  itemId: number;
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
}
const myNftTab = () => {

  const [listItem, setListItem] = useState<ItemNftProps[]>([]);

  const getMyNft = async() => {
    try {
      const provider =  new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
      console.log('contract detail', contract);
      let transaction = await contract.getMyNFTs();
      const items = await Promise.all(transaction.map(async (i: any) => {
       const tokenURI = await contract.tokenURI(i.tokenId);
       let metadata = await axios.get(tokenURI);
       console.log('metadata', metadata, i.tokenId);
   
       let price = ethers.utils.formatUnits(i.price.toString(),'ether');
       let item = {
        price,
        itemId: i.itemId.toNumber(),
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        status: i.status,
        image: metadata.data.image,
        name: metadata.data.name,
        description: metadata.data.description,
       };
       console.log('item', item);
       return item;
      }));
      // setDataFetched(true);
      setListItem(items);
    } catch (error) {
      
    console.log('err', error);
  }
}

useEffect(() => {
  getMyNft();
},[])
  return (
    <div className=" 2xl:container 2xl:mx-auto">
            <div className=" bg-gray-50 text-center lg:py-10 md:py-8 py-6">
                <p className=" w-10/12 mx-auto md:w-full  font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800">MY NFT IN MARKETPLACE</p>
            </div>
            <div className="  lg:px-20 md:px-6 px-4">
                
                <hr className=" w-full bg-gray-200 my-6" />

                <div className=" flex justify-between items-center">
                    <div className=" flex space-x-3 justify-center items-center">
                        <svg className=" cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.75 7.5H20.25" stroke="#1F2937" strokeMiterlimit="10" strokeLinecap="round" />
                            <path d="M3.75 12H20.25" stroke="#1F2937" strokeMiterlimit="10" strokeLinecap="round" />
                            <path d="M3.75 16.5H20.25" stroke="#1F2937" strokeMiterlimit="10" strokeLinecap="round" />
                        </svg>
                        <p className=" font-normal text-base leading-4 text-gray-800">Filter</p>
                    </div>
                    <p className=" cursor-pointer hover:underline duration-100 font-normal text-base leading-4 text-gray-600">Showing 18 products</p>
                </div>

                <div className=" grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10">
                  
                {listItem.map((product, index) => (
               <div key={index} className=" ">
                 <ItemNft
                 itemId={product.itemId}
                   seller={product.seller}
                   owner={product.owner}
                   name={product.name}
                   tokenId={product.tokenId}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              </div>
             ))}
        
                   
                   
                    
             
                </div>

                {/* <div className=" flex justify-center items-center">
                    <button className=" hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 py-5 md:px-16 md:w-auto w-full lg:mt-28 md:mt-12 mt-10 text-white font-medium text-base leading-4">Load More</button>
                </div> */}
            </div>
        </div>
  )
}

export default myNftTab