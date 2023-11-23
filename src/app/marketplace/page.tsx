"use client";
import { Buy, ItemBattlePass, Seasion } from "@/assets/images";
import MainLayout, { MarketplaceLayout } from "@/layout";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Marketplace = () => {
  return (
    <MarketplaceLayout>
      <Wrapper>
        <ContainerBuyBattle>
          <Image src={Seasion} alt="seasion"  />
          <ButtonBuy>
            <Image src={Buy} alt="buy"  />
          </ButtonBuy>
        </ContainerBuyBattle>
        <ContainerNFT>
          <Image src={ItemBattlePass} alt="ibp"  />
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
