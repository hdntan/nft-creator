import IConDropdown from "@/assets/icons/IconDropdown";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";

export interface ICardAssetProps {}

export default function CardAsset({ nft }: any) {
  const router = useRouter();
  return (
    <WrapperCard onClick={() => router.push(`/nft-detail/${nft.id}`)}>
      <Image src={"/images/hero1.png"} width={327} height={327} alt="hero1" />
      <BoxTitle>
        <Title>{nft.name}</Title>
        <TypeAsset>Type: {nft.type}</TypeAsset>
      </BoxTitle>
      <ButtonShowDetail>
        <p>See Detail</p>
        <IConDropdown />
      </ButtonShowDetail>
    </WrapperCard>
  );
}

const WrapperCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 463px;
  width: 329px;
  min-width: 329px;
  max-width: 329px;
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

const OPTIONS = [
  {
    value: "",
    label: "",
  },
  {
    value: "--",
    label: "--",
  },
  {
    value: "Skin",
    label: "NFT Skins",
  },
  {
    value: "Weapon",
    label: "Character weapons",
  },
  {
    value: "Map",
    label: "Map",
  },
  {
    value: "World",
    label: "Worlds",
  },
];
