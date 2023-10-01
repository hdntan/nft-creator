
'use client'
import { Carousel } from 'antd';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Marketplace from '../../../Marketplace.json';
import ItemNft from '@/components/ItemNft';
interface ItemNftProps {
  price: number,
  tokenId: number,
  seller: string,
  owner: string,
  image: string,
  name: string,
  description: string,
}


const Profile = () => {
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
    
    
   
 

  getMyNft();
  // fetch('https://reqres.in/api/users?page=2').then(res => res.json()).then(res => {
  //   setUserData(res.data);
  // })
},[])
  return (
    <div className='   flex flex-col justify-center items-center w-100%'>
      {/* <div className='border-2  mx-20 h-[150px] shadow-xl'> */}
      
      <div className=' w-full'>
        <img className='w-full h-[300px] object-cover' src="https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg" alt="Banner 1" />
      </div>
   
        {/* <div className='w-28 h-28 rounded-full border-2 mt-20 bg-blue-500'></div>
      </div> */}
      <div className='mt-10 flex flex-col items-center justify-center'>
      <strong>MY LIST NFT</strong>
      <div className='flex gap-8 my-10'>
     {listItem.map((product, index) => (
         <div key={index} className=''>
         <ItemNft seller={product.seller} owner={product.owner} name={product.name} tokenId={product.tokenId} description={product.description} price={product.price} image={product.image}/>
        </div>
      ))}
     </div>
    </div>
    </div>
    
  )
}

export default Profile