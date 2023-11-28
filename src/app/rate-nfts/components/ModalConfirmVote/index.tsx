import { NFT_TYPE } from "@/constants";
import useModal from "@/hooks/useModal";
import { contractNftCreatorFactory } from "@/services";
import { INFTDetail } from "@/types";
import { imageNameToUrl, showSuccessToast } from "@/utils/helper";
import Image from "next/image";
import * as React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Rating from "../Rating";
import { Label } from "@/components/Label";
import { TextArea } from "@/components/TexArea";
import { ClipLoader } from "react-spinners";
import { IconStarBlack } from "@/assets/icons";
import { useAccount } from "wagmi";

export interface IModalConfirmVoteProps {
  isShowing: boolean;
  toggle: () => void;
  data: INFTDetail;
}

const customStyles = {
  overlay: {
    backgroundColor: "rgb(0 0 0 / 50%)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    border: "none",
  },
};

export default function ModalConfirmVote({
  isShowing,
  toggle,
  data,
}: Readonly<IModalConfirmVoteProps>) {
  const [rating, setRating] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const { address } = useAccount();
  const user = address?.toString();

  const getRating = async () => {
    try {
      const contract = await contractNftCreatorFactory();
      if (contract) {
        const transaction = await contract.voteHistory(user, data.id);
        const rate = transaction.toNumber();
        console.log("rate", rate)
       return rate
       
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleVote = async () => {
    
    const rate = await getRating();
    if(rate > 0) {
      showSuccessToast("You Have Rated It")
      return
    }
    try {
      setIsLoading(true);
      const contract = await contractNftCreatorFactory();
      if (contract) {
        const addressNFT = await contract.recordIdCollection(data.id);
        const transaction = await contract.voteCollection(addressNFT, rating);
        await transaction.wait();
        setIsLoading(false);
        showSuccessToast("Rate Successfully!");
        toggle();
      }
    } catch (error) {
      setIsLoading(false);
      showSuccessToast("Rate Failed!");
    }
  };

  return (
    <Modal
      isOpen={isShowing}
      onRequestClose={toggle}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <ModalCard>
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
            Type:{" "}
            {NFT_TYPE.find((item) => item.value == data.type)?.label ?? ""}
          </TypeAsset>
        </BoxTitle>
        <BoxRate>
          <p>Rate:</p>
          <Rating id={data.id} onChange={(rate) => setRating(rate)} />
        </BoxRate>

        <Note>
          Your asset win the voting competition and will be used in battle pass
          seasion 3 (from xx/xx - to xx/xx)
        </Note>
        <ButtonVote onClick={handleVote} disabled={isLoading}>
          <ClipLoader loading={isLoading} size={20} color="#36d7b7" />

          <p>Confirm rating</p>
          <IconStarBlack />
        </ButtonVote>
      </ModalCard>
    </Modal>
  );
}

const BoxFeedback = styled.div`
  width: 100%;
`;

const Note = styled.p`
  color: var(--white-100, #fff);
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.25px;
  margin-bottom: 10px;
`;

const BoxRate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  p {
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
  }
`;

const ModalCard = styled.div`
  display: flex;
  width: 450px;
  height: 703px;
  padding: 32px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  border-radius: 14.164px;
  border: 1.18px solid #021491;
  background: linear-gradient(
    155deg,
    rgba(0, 6, 43, 0.7) -16.1%,
    rgba(25, 44, 175, 0.7) 106.19%
  );

  box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12.5px);
  h1 {
    color: #fff;
    text-align: center;
    font-family: Techno Race;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: 40px;
  }
  gap: 10px;
`;
const BoxImage = styled.div`
  background-image: url("/images/bg_card.png");
  background-size: cover;

  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--PRIMARY, #3e6fff);
  overflow: hidden;
  height: 609px;
  border-radius: 8px;
  border: 1px solid var(--PRIMARY, #3e6fff);
  img {
    width: 100%;
    height: 100%;
    background-size: cover;
    object-fit: contain;
    background-position: center;
  }
`;

const ButtonVote = styled.button`
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
    font-family: Montserrat;
    font-size: 18.886px;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
  }
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
