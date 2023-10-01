
"use client"
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Upload } from 'antd';
import React, { useRef, useState } from 'react';

// const ipfsClient = require('ipfs-http-client');
// import {ipfs} from '../../utils/ipfs';
import Marketplace from "../../../Marketplace.json";
import { uploadFileToIPFS, uploadJSONToIPFS } from '../../../pinata';
import { Buffer } from 'buffer';
import { ethers } from 'ethers';

// const projectId = '2OdM18NSh1dijfz4i42B7zat4wq';
// const projectSecret = 'b1d224681d5e870b09f87a28a22355a0';
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

// const ethers = require("ethers");

// const client = ipfsClient({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   // apiPath: '/api/v0',
//   headers: {
//     authorization: auth,
//   }
// })


const UploadNFT = () => {
  const [formParams, setFormParams] = useState({name: '', description: '', price: ''});
  const [fileUrl, setFileUrl] = useState(null);
  const [message, setMessage] = useState('');

 
const uploadMetadataToIPFS = async () => {
    const {name, description, price} = formParams;
    if(!name || !description || ! price|| !fileUrl) {
        return;
    }
    const nftJSON = {
        name, description, price, image: fileUrl
    };

    try {

      const  response = await uploadJSONToIPFS(nftJSON);
      if(response.success) {
          console.log("UPLOAD JSON to Pinata", response);
          return response.pinataURL;
      }
      
  } catch (error) {
      console.log("err upload jsonNFT ", error);
  }
}

// const createItem = async (e) => {
//   e.preventDefault();
//   const {name, description, price} = formParams;
//   if (!fileUrl || !price || !name || !description) return
  
//   const imageResult = await ipfs.add(fileUrl)
  
//   try{
//       // setLoadingMsg('approve transaction...');
//       // const metaUri = {
//       //   fileUrl: fileUrl,
//       //   price: price,
//       //   title: title,
//       //   description: description
//       // }

//     const result = await ipfs.add(JSON.stringify({image: `https://ipfs.io/ipfs/${imageResult.path}`, price, name, description}));
//     console.log(result);
//     uploadNft(result);
    

     
//   } catch(error) {
//     console.log("ipfs uri upload error: ", error);

  

   
//   }
// }


// const uploadNft = async (result) => {
   
//     try {
//         // const metadataURL = await uploadMetadataToIPFS();
//         const uri = `https://ipfs.io/ipfs/${result.path}`;
//         console.log('uri',uri);
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();

//         setMessage("Please wait...");

//         let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
//         const price = ethers.utils.parseUnits(formParams.price,'ether');
//         let listingPrice = await contract.getListPrice();
//         listingPrice = listingPrice.toString();
//         let transaction = await contract.createToken(uri, price, {value: listingPrice });
//         await transaction.wait();

//         alert("upload success");
//         setMessage("");
//         setFormParams({name:'', description:'', price:''});
//         window.location.replace("/");

//     } catch (error) {
//         alert("upload error: " + error);
//     }
   
// }

 const onChangFile = async(e) => {
        var file = e.target.files[0];
        // const reader = new FileReader();
        // if(file) reader.readAsDataURL(file);

        // reader.onload = (readerEvent) => {
        //     const file = readerEvent.target.result;
        //     setImageBase64(file);
        // }

        try {
            const response = await uploadFileToIPFS(file);
            if(response.success == true) {
                console.log("Upload image to Pinata", response.pinataURL);
                setFileUrl(response.pinataURL);
            } 
        }
        catch(e) {
            console.log('err upload image', e);
        }
    }

    const uploadNft = async (e) => {
      e.preventDefault();

      try {
          const metadataURL = await uploadMetadataToIPFS();
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          setMessage("Please wait...");
  
          let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer);
          const price = ethers.utils.parseUnits(formParams.price,'ether');
          let listingPrice = await contract.getListPrice();
          listingPrice = listingPrice.toString();
          let transaction = await contract.createToken(metadataURL, price, {value: listingPrice });
          await transaction.wait();

          alert("upload success");
          setMessage("");
          setFormParams({name:'', description:'', price:''});
          window.location.replace("/");

      } catch (error) {
          alert("upload error: " + error);
      }
     
  }

  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };



    const onFinish = (values: any) => {
        console.log(values);
      };
      const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
  return (
    <div className='flex flex-col justify-center items-center mt-20'>
       <div className='text-xl font-bold'>Create New Item</div>
 <div className='w-full flex flex-col lg:flex-row items-center  justify-center mx-auto mt-10 gap-8 '>
        
        <Form >

        <div className="flex items-center justify-center w-full">
    <label  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input  accept='image/png, image/gif, image/jpeg, image/jpg, image/webp'  onChange={onChangFile} type="file" className='invisible p-2' />
        
    </label>
</div> 

   
        </Form>

    <form className='w-1/2'>
  <div className="mb-6">
    <label  className="block mb-2 text-sm font-medium ">Name *</label>
    
      <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formParams.name} onChange={e => setFormParams({...formParams,name: e.target.value})} required></input>
  </div>
  <div className="mb-6">
    <label  className="block mb-2 text-sm font-medium ">Description *</label>
    <textarea cols={40} rows={4} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
     value={formParams.description} onChange={e =>setFormParams({...formParams, description: e.target.value})}
    required></textarea>
  </div>
  <div className="mb-6">
    <label  className="block mb-2 text-sm font-medium ">Price *</label>
    
      <input type='number' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formParams.price} onChange={e => setFormParams({...formParams,price: e.target.value})} required></input>
  </div>
 
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={uploadNft}>Submit</button>
</form>

    </div>
    </div>
   
    
  )
}

export default UploadNFT

