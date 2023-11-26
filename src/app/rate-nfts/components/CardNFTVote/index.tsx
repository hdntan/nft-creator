import { IconStarBlack } from "@/assets/icons";
import { Hero } from "@/assets/images";
import useModal from "@/hooks/useModal";
import Image from "next/image";
import styled from "styled-components";
import ModalConfirmVote from "../ModalConfirmVote";
import { INFTDetail } from "@/types";
import { imageNameToUrl } from "@/utils/helper";
import { NFT_TYPE } from "@/constants";

export interface ICardNFTVoteProps {
  data: INFTDetail;
}

export default function CardNFTVote({ data }: ICardNFTVoteProps) {
  const { isShowing, toggle } = useModal();
  return (
    <WrapperCard>
      <BoxImage>
        <Image
          src={imageNameToUrl(data.fileName)}
          width={327}
          height={327}
          alt="hero1"
        />
      </BoxImage>

      <BoxTitle>
        <Title>{data.name}</Title>
        <TypeAsset>
          Type: {NFT_TYPE.find((item) => item.value == data.type)?.label ?? ""}
        </TypeAsset>
      </BoxTitle>
      <ButtonShowDetail onClick={() => toggle()}>
        <p>Rating</p>
        <IconStarBlack />
      </ButtonShowDetail>
      <ModalConfirmVote isShowing={isShowing} toggle={toggle} data={data} />
    </WrapperCard>
  );
}

const BoxImage = styled.div`
display: flex;
align-items: center;
justify-content: center;
  background-image: url("/images/bg_card.png");
  background-size: cover;
  width: 100%;
  /* height: 671px; */
  height: 400px;
  border-radius: 24px;
  border: 1px solid var(--PRIMARY, #3e6fff);
  overflow: hidden;
  img {
    width: 327px;
    height: 100%;
    background-size: cover; 
    object-fit: contain;
    background-position: center; 
  };
`;

const WrapperCard = styled.div`
  display: flex;
  height: 550px;
  width: 400px;

  padding: 24px;
  flex-direction: column;
  align-items: center;
  gap: 27px;
  flex: 1 0 0;
  border-radius: 24px;
  background: linear-gradient(
    90deg,
    rgba(2, 20, 145, 0.4) -16.29%,
    rgba(22, 71, 207, 0.4) 106.35%
  );
  backdrop-filter: blur(15px);
  margin-bottom: 30px;

`;

const BoxTitle = styled.div``;

const Title = styled.h1`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
`;
const TypeAsset = styled.p`
  margin: 0;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const ButtonShowDetail = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  border-radius: 4px;
  border: 1px solid var(--SECONDARY, #fed73b);
  background: var(--SECONDARY, #fed73b);
  cursor: pointer;
  gap: 10px;
  p {
    color: #000;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: capitalize;
  }
`;
