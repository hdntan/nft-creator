"use client";
import { Buy, ItemBattlePass, Seasion } from "@/assets/images";
import { GamingToken, NFTCreatorFactory } from "@/contracts";
import MainLayout, { MarketplaceLayout } from "@/layout";
import { contractGamingToken, contractNftCreatorFactory } from "@/services";
import { showErrorToast, showSuccessToast, toEth, toWei } from "@/utils/helper";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";

const Marketplace = () => {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const user = address?.toString();

  const getRandomCollection = async () => {
    try {
      const contract = await contractNftCreatorFactory();
      if (contract) {
        const transaction = await contract.getAllCollections();
        const listRandom = [];
        for (let i = 0; i < 4; i++) {
          const randomIndex = Math.floor(Math.random() * transaction.length);
          const selectedRandomItem = await transaction[randomIndex];
  
          listRandom.push(selectedRandomItem);
        }
        return listRandom;
      }
    } catch (error) {
      console.log("err", error)
    }
   
  };

  const getTokenContract = async () => {
    try {
      const contract = await contractGamingToken();
      if (contract) {
        const transaction = await contract.balanceOf(user);
        const balance = await transaction.toString();
        console.log("token", toEth(balance));
      }
    } catch (error) {
      console.log("err", error)
    }
   
  };

  const approveToken = async () => {
    try {
      const contract = await contractGamingToken();
      if (contract) {
        const transaction = await contract.approve(
          GamingToken.address,
          5 * 10 ** 6
        );
        await transaction.wait();
        console.log("approve successful");
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const buyBattlePass = async () => {
    try {
      await approveToken();
      const listCollection = await getRandomCollection();
      console.log("all", listCollection);

      const contract = await contractNftCreatorFactory();
      if (contract) {
        const transaction = await contract.buyNFT(listCollection);
        await transaction.wait();
        console.log("buy successful");
        showSuccessToast("Buy successful");
      }
    } catch (error) {
      showErrorToast("Buy err");

      console.log("err", error)
    }
  };

  useEffect(() => {
    getTokenContract();
  }, []);

  return (
    <MarketplaceLayout>
      <Wrapper>
        <ContainerBuyBattle>
          <Image src={Seasion} alt="seasion" />
          <ButtonBuy onClick={isConnected ? buyBattlePass : openConnectModal}>
            <Image src={Buy} alt="buy" />
          </ButtonBuy>
        </ContainerBuyBattle>
        <ContainerNFT>
          <Image src={ItemBattlePass} alt="ibp" />
        </ContainerNFT>
      </Wrapper>
    </MarketplaceLayout>
  );
};

export default Marketplace;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 65px 90px;
  gap: 58px;
`;

const ContainerBuyBattle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 58px;
`;

const ButtonBuy = styled.button`
  position: absolute;
  bottom: 0;
  margin-bottom: 30px;
`;

const ContainerNFT = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
