
"use client"
import ItemNft from '@/components/ItemNft';
import Navbar from '@/components/Navbar';

import Image from 'next/image';
import { Carousel, Card } from 'antd';

import { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useGlobalContext } from './context/store';
import {useAccount} from "wagmi";
import { ethers } from 'ethers';
import axios from 'axios';


import Marketplace from '../../Marketplace.json';
const CONTRACT_ADDRESS_MARKET = "0xc99040D7ed043D2b6602670EDDcB435a24115185"
const CONTRACT_ADDRESS_NFT = "0xD5125c091a7c2f04132b66C20D5afA12E481E90F"
const marketplaceABI = require("../utils/market-abi.json");
const nftABI = require("../utils/nft-abi.json");


interface ItemNftProps {
  price: number,
  tokenId: number,
  seller: string,
  owner: string,
  image: string,
  name: string,
  description: string,
}


export default function Home() {
  const {address} = useAccount();

  const {userId, setUserId, provider, signer, contract} = useGlobalContext();
  const [userData, setUserData] = useState({});
  const [listItem, setListItem] = useState<ItemNftProps[]>([]);

  const getAllItem = async() => {
    try {
      const provider =  new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
      console.log('contract detail', contract);
      let transaction = await contract.getAllNFTs();
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
    
    
   
    // const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider1.getSigner();
    // let contract1 = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
    setUserId('1')
    // console.log('SMART CONTRACT',provider, signer, contract);
    // console.log('IDDD',userId);

    getAllItem();
    // fetch('https://reqres.in/api/users?page=2').then(res => res.json()).then(res => {
    //   setUserData(res.data);
    // })
  },[])
  // console.log('sm',contract);

  const items = [
    {
      tokenId:1,
      title: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    },
    {
      tokenId:2,
      title: 'Product 2',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    },
    {
      tokenId:3,
      title: 'Product 3',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    }, {
      tokenId:4,
      title: 'Product 4',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    }, {
      tokenId:5,
      title: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    }, {
      tokenId:6,
      title: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    },
    // Add more products here
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide < items.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  
  return (
 <div className='mx-20  mt-10 h-[1000px]'>

{/* 
  <div className=''>
  <strong className='text-xl'>Top Collector Buys Today {userId} </strong>
    <Carousel 
     dots={true}
     arrows
     
    className='h-[350px] rounded-xl mt-5  bg-blue-300' slidesToShow={4}  >
      {items.map((product, index) => (
        <div key={index} className='ml-5 mt-5 flex justify-center items-center'>
          <Card
          className='shadow-xl'
            hoverable
            style={{ width: 300 }}
            cover={<img alt={product.title} src={product.imageUrl} />}
          >
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span>${product.price}</span>
            
          </Card>
        </div>
      ))}
    </Carousel>

     
  </div> */}

  
  <div className='py-10'>
  <strong className='text-xl '>All NFT  </strong>
   
     <div className=' grid  grid-cols-1 lg:grid-cols-4 gap-4 py-5'>
     {listItem.map((product, index) => (
         <div key={index} className=' '>
         <ItemNft seller={product.seller} owner={product.owner} name={product.name} tokenId={product.tokenId} description={product.description} price={product.price} image={product.image}/>
        </div>
      ))}
     </div>
   
     
   

     
  </div>
 
  {/* <div className="relative w-full mt-5 bg-slate-400">
      <div className="relative overflow-hidden ">
        <Carousel
        slidesToShow={4}
          afterChange={(current) => setCurrentSlide(current)}
          dots={false}
          draggable
          infinite
          initialSlide={currentSlide}
        >
          {listItem.map((product, index) => (
             <div key={index} className=''>
            <ItemNft seller={product.seller} owner={product.owner} name={product.name} tokenId={product.tokenId} description={product.description} price={product.price} image={product.image}/>
           </div>
          ))}
        </Carousel>
      </div>
      <div className= 'w-100% absolute top-1/2 left-0 flex justify-around'>
              <button className='text-white  border-2 p-5 bg-blue-600'  onClick={prevSlide}>haha</button>
             
             
      </div>
      <div className= 'w-100% absolute top-1/2 right-0 flex justify-around'>
              <button className='text-white  border-2 p-5 bg-blue-600' onClick={nextSlide}>haha</button>
              

             
      </div>
      
    </div> */}

     
  </div>


  )
}
