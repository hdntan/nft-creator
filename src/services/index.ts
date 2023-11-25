import axiosInstance from "@/config/axios.config";
import { GamingToken, NFTCreatorFactory } from "@/contracts";
import { ethers } from "ethers";

type IDataSubmit = {
  name: string;
  symbol: string;
  description: string;
  type: number;
  creator: string;
  file: File;
};

type IDataContract = {
  abi: any[];
  address: string;
};

const uploadNFTRequest = (data: IDataSubmit) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("symbol", data.symbol);
  formData.append("description", data.description);
  formData.append("type", data.type.toString());
  formData.append("creator", data.creator);
  formData.append("file", data.file);

  return axiosInstance.post("/collection/create", formData, {
    headers: {
      accept: "application/json",
      "Content-Type": `multipart/form-data`,
    },
  });
};

const getListNFTOverviewRequest = (type?: string) => {
  return axiosInstance.get("/collection", { params: { type } });
};

const getNftDetail = (id: number) => {
  return axiosInstance.get(`/collection/${id}`);
};

const getContract = async (data: IDataContract) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(data.address, data.abi, signer);
    return contractReader;
  }
};

const contractNftCreatorFactory = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(
      NFTCreatorFactory.address,
      NFTCreatorFactory.abi,
      signer
    );
    return contractReader;
  }
};
const contractGamingToken = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(
      GamingToken.address,
      GamingToken.abi,
      signer
    );
    return contractReader;
  }
};

export {
  uploadNFTRequest,
  getListNFTOverviewRequest,
  getNftDetail,
  getContract,
  contractNftCreatorFactory,
  contractGamingToken,
};
