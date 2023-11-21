import IConDropdown from "@/assets/icons/IconDropdown";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import styled from "styled-components";

export interface ICardAssetProps {}

export default function CardAsset(props: ICardAssetProps) {
  const newTo = {
    path: "/nft-detail/" + 1,
  };
  return (
    <Link href={newTo.path}>
      <WrapperCard>
        <Image src={"/images/hero1.png"} width={327} height={327} alt="hero1" />
        <BoxTitle>
          <Title>Asset No.1</Title>
          <TypeAsset>Type: NFT Skin</TypeAsset>
        </BoxTitle>
        <ButtonShowDetail>
          <p>See Detail</p>
          <IConDropdown />
        </ButtonShowDetail>
      </WrapperCard>
    </Link>
  );
}

const WrapperCard = styled.div`
  display: flex;
  height: 463px;
  width: 329px;
  min-width: 329px;
  max-width: 329px;
  flex-direction: column;
  align-items: center;
  gap: 27px;
  flex: 1 0 0;
  border-radius: 24px 24px 36px 36px;
  background: var(
    --New-Gradient-1,
    linear-gradient(90deg, #021491 -16.29%, #1647cf 106.35%)
  );
`;

const BoxTitle = styled.div``;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
`;
const TypeAsset = styled.p`
  margin: 0;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const ButtonShowDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    color: var(--SECONDARY, #fed73b);
    text-align: center;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }
`;
