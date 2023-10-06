"use client";
import ItemNft from "@/components/ItemNft";


import Image from "next/image";
import { Carousel, Card, Layout } from "antd";

import { useEffect, useState } from "react";

import { useGlobalContext } from "./context/store";
import { useAccount } from "wagmi";
import {watchAccount} from "wagmi/actions"
import { ethers } from "ethers";
import axios from "axios";

import Marketplace from "../../Marketplace.json";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

const { Content } = Layout;

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

export default function Home() {
  const { address } = useAccount();


  const [userData, setUserData] = useState({});
  const [listItem, setListItem] = useState<ItemNftProps[]>([]);
  const [itemCount, setItemCount] = useState(0);

  const getAllItem = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );
      console.log("contract detail", contract);
      const transaction = await contract.gettAllNftOnSale();
    
    
      const items = await Promise.all(
        transaction.map(async (i: any) => {
          const tokenURI = await contract.tokenURI(i.tokenId);
          let metadata = await axios.get(tokenURI);
          console.log("metadata", metadata, i.tokenId);

          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
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
          console.log("item", item);
          return item;
        })
      );
      // setDataFetched(true);
      setListItem(items);
      // setItemCount(totalItem);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    
    
  
    getAllItem();
   
  }, []);


  const items = [
    {
      tokenId: 1,
      title: "Product 1",
      description: "Description of Product 1",
      price: 19.99,
      imageUrl:
        "https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg",
    },
    {
      tokenId: 2,
      title: "Product 2",
      description: "Description of Product 1",
      price: 19.99,
      imageUrl:
        "https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg",
    },
    {
      tokenId: 3,
      title: "Product 3",
      description: "Description of Product 1",
      price: 19.99,
      imageUrl:
        "https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg",
    },
    {
      tokenId: 4,
      title: "Product 4",
      description: "Description of Product 1",
      price: 19.99,
      imageUrl:
        "https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg",
    },
    {
      tokenId: 5,
      title: "Product 1",
      description: "Description of Product 1",
      price: 19.99,
      imageUrl:
        "https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg",
    },
    {
      tokenId: 6,
      title: "Product 1",
      description: "Description of Product 1",
      price: 19.99,
      imageUrl:
        "https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg",
    },
    // Add more products here
  ];

 

  return (
    <Layout className="2xl:container 2xl:mx-auto">
      
      <Content style={{ padding: '0 50px' }}>
        <div className="hidden lg:block">
        <Banner />
        </div>
        <div className="text-center lg:py-10 md:py-8 py-6">
                <p className=" w-10/12 mx-auto md:w-full  font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800">NFT NEWS</p>
            </div>
            <hr className=" w-full bg-gray-200 my-6" />
        <div className=" hidden sm:flex  justify-between items-center ">
                    <div className=" flex space-x-3 justify-center items-center">
                        <svg className=" cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.75 7.5H20.25" stroke="#1F2937" strokeMiterlimit="10" strokeLinecap="round" />
                            <path d="M3.75 12H20.25" stroke="#1F2937" strokeMiterlimit="10" strokeLinecap="round" />
                            <path d="M3.75 16.5H20.25" stroke="#1F2937" strokeMiterlimit="10" strokeLinecap="round" />
                        </svg>
                        <p className=" font-normal text-base leading-4 text-gray-800">Filter</p>
                    </div>
                    <p className=" cursor-pointer hover:underline duration-100 font-normal text-base leading-4 text-gray-600">Showing {itemCount} products</p>
                </div>
      
    
        <div className="ml-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-y-12 lg:gap-x-8 sm:gap-y-10 sm:gap-x-6 gap-y-6 lg:mt-12 mt-10 mb-52">
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
        
                    


      
      </Content>
      <Footer />
    </Layout>
   
  );
}
