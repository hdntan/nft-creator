
'use client'
import { Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Marketplace from '../../../Marketplace.json';
import ItemNft from '@/components/ItemNft';
import Sidebar from '@/components/Sidebar';


interface ItemNftProps {
  price: number,
  tokenId: number,
  seller: string,
  owner: string,
  image: string,
  name: string,
  description: string,
}


const Profile = ({children}) => {
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
         tokenId: i.tokenId.toNumber(),
         seller: i.seller,
         owner: i.owner,
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
    
    
   
 

  // getMyNft();
  // fetch('https://reqres.in/api/users?page=2').then(res => res.json()).then(res => {
  //   setUserData(res.data);
  // })
},[])
  return (



    <div className="layout">
    <Sidebar />
    <main className="content">{children}</main>
  </div>
    
   
     
   
 
    
    
  )
}

export default Profile