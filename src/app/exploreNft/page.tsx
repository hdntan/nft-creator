"use client";
import { useState } from "react";

import { fetchNFTs } from "../../utils/fetchNft";
import { ethers } from "ethers";
import NftCard from "@/components/NftCard";

import NftExternal from "../../../nft.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../context/store";
import { showErrorToast, showSuccessToast } from "@/utils/openAlert";
import { Button } from "antd";

interface Window {
  ethereum: any;
}
const Explore = () => {
  const network = "goerli";
  const API_KEY = "F_v3giM_QYUTUdgcsSJxxgSXw-cpf1aN";
  const CONTRACT_ADDRESS_MARKET = "0xe93941940d7CFF0aC761265def80ddafad0aF76B";

  const { connectNft, setConnectNft, setApprovalForAll } = useGlobalContext();

  const [loading, setLoading] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState(false);

  const [owner, setOwner] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [NFTs, setNFTs] = useState<any>("");
  const [contractNft, setContractNft] = useState<any>(null);
  const [addressNft, setAddressNft] = useState(null);

  const connectNftContract = async () => {
    if (!contractAddress) {
      // alert('ban chua nhap your contract address nft');
      showErrorToast("ban chua nhap your contract address nft");

      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();
      const nft = new ethers.Contract(contractAddress, NftExternal.abi, signer);
      setContractNft(nft);
      setConnectNft(true);
      showSuccessToast("You successfully connect NFT");

      console.log("external nft", nft);
    } catch (error) {
      showErrorToast("Error connect Nft address");
    }
  };

  const searchNftFromContract = async () => {
    setLoading(true);

    if (!owner || !contractAddress) {
      showErrorToast(
        "ban chua nhap wallet address & your nft contract address"
      );
      setLoading(false);

      return;
    }
    await fetchNFTs(owner, contractAddress, setNFTs);
    showSuccessToast("search...");
    setLoading(false);
  };

  const setApprovalForAllNft = async () => {
    setLoadingApprove(true);
    if (contractNft === null) {
      setLoadingApprove(false);

      return;
    }
    try {
      console.log(contractNft);
      const setApprovalForAll = await contractNft.setApprovalForAll(
        CONTRACT_ADDRESS_MARKET,
        true
      );
      setApprovalForAll(true);
      showSuccessToast("You successfully setApprovalForAll NFT");
      setLoadingApprove(false);

      console.log("setApprovalForAll", setApprovalForAll);
    } catch (error) {
      showErrorToast("Error setApprovalForAll Nft");
      setLoadingApprove(false);
    }
  };

  return (
    <div className="bg-[#151c25]">
      <ToastContainer position="top-right" />

      <header className=" py-10   w-full   alchemy ">
        <div className="flex-grow flex justify-end mr-12 mb-12"></div>
        <div className="flex flex-col items-center ">
          <div className="mb-16 text-white text-center">
            <h1 className="text-5xl  font-bold font-body mb-2">
              Alchemy NFT Explorer
            </h1>
            <p>An inspector to find NFTs by owner and contract address </p>
          </div>
          <div className="flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 ">
            <input
              className="border rounded-sm focus:outline-none py-2 px-3 w-full "
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Insert your wallet address"
              required
            />

            <input
              className="focus:outline-none rounded-sm py-2 px-3 w-full"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Insert NFT Contract address (optional)"
              required
            />
          </div>
          <div className="w-2/6 flex justify-center mb-5">
            <Button
              loading={loading}
              size="large"
              className=" bg-white rounded-sm w-full hover:bg-slate-100"
              onClick={searchNftFromContract}
            >
              Search
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 ">
            {/* <input className="focus:outline-none rounded-sm py-2 px-3 w-full" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder='Insert NFT Contract address (optional)'></input> */}
            <Button
              size="large"
              className=" bg-white rounded-sm w-full hover:bg-slate-100"
              onClick={connectNftContract}
            >
              Connect Nft
            </Button>
          </div>

          {contractNft && (
            <div className="w-2/6 flex justify-center mb-5">
              <Button
                size="large"
                loading={loadingApprove}
                className=" bg-white rounded-sm w-full hover:bg-slate-100"
                onClick={setApprovalForAllNft}
              >
                setApprovalForAll
              </Button>
            </div>
          )}
        </div>
      </header>

      <section className="flex flex-wrap justify-center">
        {NFTs ? (
          NFTs.map((NFT: any) => {
            return (
              <div key={NFT.id.tokenId} className="w-full">
                <NftCard
                  image={NFT.media[0].gateway}
                  id={NFT.id.tokenId}
                  title={NFT.title}
                  address={NFT.contract.address}
                  description={NFT.description}
                />
              </div>
            );
          })
        ) : (
          <div className="mb-16 text-white text-center">
            <h1 className="text-5xl  font-bold font-body mb-2">
              No NFTs found
            </h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default Explore;
