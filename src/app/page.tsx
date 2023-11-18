"use client";
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
  align-items: center;
  justify-content: center;
  padding: 0 90px 0 90px;
  margin-top: 70px;
  margin-bottom: 140px;
  gap: 49px;
`;

const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  padding: 0 90px 0 90px;
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
  color: #b9c2f2;
`;
const ITEMS = [
  {
    title: "NFT Skins",
    image: ``,
    href: "#",
  },
  {
    title: "Character Weapons",
    image: ``,
    href: "#",
  },
  {
    title: "New Map On Paw",
    image: ``,
    href: "#",
  },
  {
    title: "New Worlds On Paw",
    image: ``,
    href: "#",
  },
];
