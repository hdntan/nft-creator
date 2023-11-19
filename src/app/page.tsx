"use client";
import { Character, NewMap, NewWorld, NftSkin } from "@/assets/images";
import CreatorItem from "@/components/CreatorItem";
import MainLayout from "@/layout";
import styled from "styled-components";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <MainLayout>
      <ContainerTitle>
        <Title>Create your own world on</Title>
        <SubTitle>PAWCIFIC RIM</SubTitle>
      </ContainerTitle>
      <ContainerItemCreator>
        {ITEMS.map((item, index) => (
          <CreatorItem item={item} key={index} />
        ))}
      </ContainerItemCreator>
    </MainLayout>
  );
}

const ContainerItemCreator = styled.div`
  display: flex;
  flex-direction: row;
  margin: 61px 0 120px 0;
  gap: 49px;
  padding: 0 90px 0 90px;
  justify-content: space-between;
`;

const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
`;

const Title = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;

  color: #b9c2f2;
`;

const SubTitle = styled(Title)`
  font-family: "Techno Race";
  font-size: 60px;
  line-height: 72px;
  color: #FFFFFF;
`;
const ITEMS = [
  {
    title: "NFT Skins",
    image: NftSkin,
    href: "#",
  },
  {
    title: "Character Weapons",
    image: Character,
    href: "#",
  },
  {
    title: "New Map On Paw",
    image: NewMap,
    href: "#",
  },
  {
    title: "New Worlds On Paw",
    image: NewWorld,
    href: "#",
  },
];
