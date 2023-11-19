import { MapNFTImg } from "@/assets/images";
import Image from "next/image";
import * as React from "react";
import styled from "styled-components";

export interface ICardNFTSynthesisProps {}

export default function CardNFTSynthesis(props: ICardNFTSynthesisProps) {
  return (
    <WrapperCard>
      <h2>NFT Skins</h2>
      <NextImage src={MapNFTImg} alt="map-nft" width={580} height={326} />
      <BoxStatus>
        <p>Status</p>
        <Status>In voting</Status>
      </BoxStatus>
      <BtnVote>Vote</BtnVote>
    </WrapperCard>
  );
}

const WrapperCard = styled.div`
  display: flex;
  width: 397px;
  max-width: 397px;
  padding: 36px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  border-radius: 24px;
  border: 1px solid #15338f;
  background: linear-gradient(90deg, #0d0c0b -16.29%, #081231 106.35%);
  h2 {
    color: #fff;
    text-align: center;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.48px;
  }
`;

const NextImage = styled(Image)`
  border-radius: 24px;
  border: 1px solid #15338f;
`;

const BoxStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  p {
    color: #fff;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.24px;
  }
`;

const Status = styled.p`
  color: var(--SECONDARY, #fed73b) !important;
  text-align: right;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.28px;
`;

const BtnVote = styled.button`
  border-radius: 4px;
  width: 326px;
  border: 1px solid;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #fed73b;
  color: #000000;
`;
