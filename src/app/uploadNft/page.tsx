"use client";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, InputNumber, Upload } from "antd";
import React, { useRef, useState } from "react";

import Marketplace from "../../../Marketplace.json";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../../pinata";

import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast, showSuccessToast } from "@/utils/openAlert";


const UploadNFT = () => {
  const [formParams, setFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [fileUrl, setFileUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [imageBase64, setImageBase64] = useState("https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg");

  const uploadMetadataToIPFS = async () => {
    const { name, description, price } = formParams;
  
    if(!fileUrl) {
      showErrorToast("Enter fileUrl nft");
      return
    }
    if(!name) {
      showErrorToast("Enter name nft");
      return
    }
    if(!description) {
      showErrorToast("Enter description nft");
      return
    }
    if(!price) {
      showErrorToast("Enter price nft");
      return
    }
    
    const nftJSON = { 
      name,
      description,
      price,
      image: fileUrl,
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success) {
        console.log("UPLOAD JSON to Pinata", response);
        return response.pinataURL;
      }
    } catch (error) {
      console.log("err upload jsonNFT ", error);
    }
  };

  
  

  const onChangFile = async (e:any) => {
    var file = e.target.files[0];
    const reader = new FileReader();
    if(file) reader.readAsDataURL(file);

    reader.onload = (readerEvent:any) => {
        const file = readerEvent.target.result;
        setImageBase64(file);
    }

    try {
      const response = await uploadFileToIPFS(file);
      if (response.success == true) {
        console.log("Upload image to Pinata", response.pinataURL);
        setFileUrl(response.pinataURL);
      }
    } catch (e) {
      console.log("err upload image", e);
    }
  };

  const uploadNft = async (e:any) => {
    e.preventDefault();

    try {
      const metadataURL = await uploadMetadataToIPFS();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setLoading(true)
      setMessage("Please wait...");

      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );
      const price = ethers.utils.parseUnits(formParams.price, "ether");
      // let listingPrice = await contract.getListPrice();
      // listingPrice = listingPrice.toString();
      let transaction = await contract.createToken(metadataURL, price);
      await transaction.wait();
      showSuccessToast("upload success");
      setLoading(false);
      setFormParams({ name: "", description: "", price: "" });
      // window.location.replace("/");
    } catch (error) {
      setLoading(false);
    
      showErrorToast("upload error");
      // setMessage("");

    }
  };

  const inputRef = useRef(null);


const onFinish = (value:any) => {
 console.log('Nft', {value});
}
const notify = () => toast("Wow so easy!");




  return (
    

    <div className="relative container mx-auto">
      
      <ToastContainer position="top-right" />

      <div className="flex justify-center px-6 my-12">
        
        <div className="w-full xl:w-3/4 lg:w-11/12 flex flex-col lg:flex-row">
          
          <div className="w-full bg-gray-400 lg:w-5/12 rounded-lg ">
            <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <img  
            src={imageBase64}
              className=" rounded-xl w-full object-cover lg:h-[330px] h-[200px] "
      />
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                onChange={onChangFile}
                type="file"
                className="invisible p-2"
              />
            </label>
          </div>

          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none ml-10">
            <h3 className="pt-4 text-2xl text-center ">
              Create NFT In Marketplace!
            </h3>
         
            <form  className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Name
                </label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-500 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                  type="text"
                  value={formParams.name}
                  onChange={(e) =>
                    setFormParams({ ...formParams, name: e.target.value })
                  }
                  placeholder="name..."
                  name="name" 
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Description
                </label>
                <textarea
                  cols={40}
                  rows={6}
                  className="w-full border border-gray-300 dark:border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-500 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                  value={formParams.description}
                  onChange={(e) =>
                    setFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
                  placeholder="description..."
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Price
                </label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-500 bg-transparent placeholder-gray-500 text-gray-500 dark:text-gray-400"
                  type="number"
                  value={formParams.price}
                  onChange={(e) =>
                    setFormParams({ ...formParams, price: e.target.value })
                  }
                  placeholder="price..."
                  required
                />
              </div>
              <div className="mb-6 text-center">
               
                <Button className="hover:bg-gray-100 shadow-lg"  onClick={uploadNft} disabled={loading} loading={loading} size="large">Create NFT</Button>
              </div>
              <hr className="mb-6 border-t" />
            </form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UploadNFT;
