import axiosInstance from "@/config/axios.config";

type IDataSubmit = {
  name: string;
  symbol: string;
  description: string;
  type: number;
  creator: string;
  file: File;
};

const uploadNFTRequest = (data: IDataSubmit) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("symbol", data.symbol);
  formData.append("description", data.description);
  formData.append("type", data.type.toString());
  formData.append("creator", data.creator);
  formData.append("file", data.file, "nft");

  return axiosInstance.post("/collection/create", formData, {
    headers: {
      accept: "application/json",
      "Content-Type": `multipart/form-data`,
    },
  });
};

const getListNFTOverviewRequest = (type: string) => {
  return axiosInstance.get("/collection", { params: { type } });
};

export { uploadNFTRequest, getListNFTOverviewRequest };
