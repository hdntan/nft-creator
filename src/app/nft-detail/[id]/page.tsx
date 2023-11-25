"use client";
import { IconBack } from "@/assets/icons";
import { Hero } from "@/assets/images";
import ButtonBack from "@/components/ButtonBack";
import axiosInstance from "@/config/axios.config";
import MainLayout from "@/layout";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";
interface StyledLabelProps {
  textColor: string;
}

const NFTDetail = () => {
  const { id } = useParams();

  const [nft, setNft] = React.useState<any>();

  React.useEffect(() => {
    axiosInstance
      .get(`/collection/${id}`)
      .then((response) => {
        setNft(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <MainLayout>
      <Wrapper>
        <ButtonBack href="/overview" />

        <WrapperDetail>
          <ContainerDetail>
            <ContainerImage>
              <Image src={Hero} alt="hero" width={567} height={518}></Image>
            </ContainerImage>
            <ContainerContent>
              <Content>
                <Label textColor="">Owner:</Label>
                <Label textColor="yellow">{nft?.creator}</Label>
              </Content>
            </ContainerContent>
          </ContainerDetail>
        </WrapperDetail>
      </Wrapper>
    </MainLayout>
  );
};

export default NFTDetail;

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
  padding: 78px 90px;
`;
const WrapperDetail = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerDetail = styled.div`
  display: flex;
  flex-direction: row;
  width: 1144px;
  height: 673px;
  border-radius: 14px;
  padding: 32px;
  background: linear-gradient(
      154.81deg,
      rgba(0, 6, 43, 0.7) -16.1%,
      rgba(25, 44, 175, 0.7) 106.19%
    ),
    linear-gradient(3.99deg, #021491 -7.62%, #6c93ff 102.95%),
    radial-gradient(
        263.36% 437.87% at -2.97% 106.23%,
        #a6b1ff 0%,
        rgba(89, 100, 177, 0) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  gap: 100px;
`;
const ContainerImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 607px;
  height: 609px;
  border-radius: 8px;
  padding-left: 16px;
  border: 1px solid #6c93ff;
  background-image: url("/images/BG-NFT.png");
`;

const ContainerContent = styled.div``;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 373px;
  height: 72px;
  padding: 24px;
  margin-bottom: 36px;
  border-radius: 14px;
  background: linear-gradient(
    154.81deg,
    rgba(0, 6, 43, 0.7) -16.1%,
    rgba(11, 16, 50, 0.7) 106.19%
  );
`;
const Label = styled.label<StyledLabelProps>`
  font-size: 18px;
  color: ${(props) => (props.textColor !== "yellow" ? "#FFFFFF" : "#FED73B")};
`;

const NFTS = [
  {
    title: "Owner",
    content: "Lorem Ipsum",
  },
  {
    title: "Owner",
    content: "Lorem Ipsum",
  },
  {
    title: "Owner",
    content: "Lorem Ipsum",
  },
  {
    title: "Owner",
    content: "Lorem Ipsum",
  },
];
