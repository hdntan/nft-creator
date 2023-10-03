"use client";
import ItemNft from "@/components/ItemNft";
import Navbar from "@/components/Navbar";

import Image from "next/image";
import { Carousel, Card, Layout } from "antd";

import { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useGlobalContext } from "./context/store";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import axios from "axios";

import Marketplace from "../../Marketplace.json";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
const CONTRACT_ADDRESS_MARKET = "0xc99040D7ed043D2b6602670EDDcB435a24115185";
const CONTRACT_ADDRESS_NFT = "0xD5125c091a7c2f04132b66C20D5afA12E481E90F";
const marketplaceABI = require("../utils/market-abi.json");
const nftABI = require("../utils/nft-abi.json");
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

  const { userId, setUserId, provider, signer, contract } = useGlobalContext();
  const [userData, setUserData] = useState({});
  const [listItem, setListItem] = useState<ItemNftProps[]>([]);

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
      let transaction = await contract.getAllNFTs();
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
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    // const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider1.getSigner();
    // let contract1 = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
    setUserId("1");
    // console.log('SMART CONTRACT',provider, signer, contract);
    // console.log('IDDD',userId);

    getAllItem();
    // fetch('https://reqres.in/api/users?page=2').then(res => res.json()).then(res => {
    //   setUserData(res.data);
    // })
  }, []);
  // console.log('sm',contract);

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
    <Layout className="2xl:container 2xl:mx-auto">
      
      <Content style={{ padding: '0 50px' }}>
        <div className="hidden lg:block">
        <Banner />
        </div>
        <div className="text-center lg:py-10 md:py-8 py-6">
                <p className=" w-10/12 mx-auto md:w-full  font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-center text-gray-800">NFT NEWS</p>
            </div>
            <hr className=" w-full bg-gray-200 my-6" />
        <div className=" flex justify-between items-center ">
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
    // <div className="  mt-10 h-[1000px]">
    //   <div className="mx-10 ">
    //     <Banner />
    //     <div className="py-10">
    //       <strong className="text-xl ">All NFT </strong>

    //       <div className=" grid  grid-cols-1 lg:grid-cols-4 gap-4 py-5">
    //         {listItem.map((product, index) => (
    //           <div key={index} className=" ">
    //             <ItemNft
    //               seller={product.seller}
    //               owner={product.owner}
    //               name={product.name}
    //               tokenId={product.tokenId}
    //               description={product.description}
    //               price={product.price}
    //               image={product.image}
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>

    //   <Footer />
   
    // </div>
  );
}
