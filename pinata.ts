// import axios from 'axios';

//require('dotenv').config();
const key = "4a8192f50cf8215983c7";
const secret =
  "822880008599a8a5bce01dcf8295ff5990742fd0f760ec46d030b8f40b39b8ed";
const axios = require("axios");
const FormData = require("form-data");

export const uploadJSONToIPFS = async (JSONBody: any) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response: any) {
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error: any) {
      return {
        success: false,
        message: error.message,
      };
    });
};

export const uploadFileToIPFS = async (file: any) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //making axios POST request to Pinata ⬇️

  let data = new FormData();
  data.append("file", file);

  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMetadata", metadata);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: "FRA1",
          desiredReplicationCount: 1,
        },
        {
          id: "NYC1",
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append("pinataOptions", pinataOptions);

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response: any) {
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error: any) {
      return {
        success: false,
        message: error.message,
      };
    });
};

// const FormData = require('form-data');

// export const pinataUploadJSONToIPFS = async (jsonData) => {
//     try {
//       const response = await axios.post(
//         'https://api.pinata.cloud/pinning/pinJSONToIPFS',
//         jsonData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'pinata_api_key': apiKey,
//             'pinata_secret_api_key': apiSecret,
//           },
//         }
//       );

//       return response.data.IpfsHash;
//     } catch (error) {
//       console.error('Error uploading JSON to Pinata:', error);
//       throw error;
//     }
//   };
// export const pinataUploadFileToIPFS = async (file) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await axios.post(
//         'https://api.pinata.cloud/pinning/pinFileToIPFS',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'pinata_api_key': apiKey,
//             'pinata_secret_api_key': apiSecret,
//           },
//         }
//       );

//       return response.data.IpfsHash;
//     } catch (error) {
//       console.error('Error uploading to Pinata:', error);
//       throw error;
//     }
//   };
