"use client";
import { IconBack } from "@/assets/icons";
import Select from "@/components/Select";
import MainLayout from "@/layout";
import styled from "styled-components";
import CardNFTVote from "./components/CardNFTVote";

export interface IRaterNFTPageProps {}

export default function RaterNFTPage(props: IRaterNFTPageProps) {
  return (
    <MainLayout>
      <SectionOverview>
        <TopMenu>
          <TitleBox>
            <IconBack />
            <h2>Overview</h2>
          </TitleBox>
          <FilterBox>
            <Select
              name="typeNft"
              onChange={(e) => console.log(e)}
              options={[{ value: "nft", label: "NFT" }]}
            />
          </FilterBox>
        </TopMenu>
        <ListAsset>
          <CardNFTVote />
          <CardNFTVote />
          <CardNFTVote />
          <CardNFTVote />
          <CardNFTVote />
          <CardNFTVote />
          <CardNFTVote />
        </ListAsset>
      </SectionOverview>
    </MainLayout>
  );
}

const SectionOverview = styled.section`
  width: 100%;
  padding: 100px 53px;
  max-width: 1847px;
  margin: 0 auto;
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  h2 {
    color: #fff;
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
  }
  svg {
    cursor: pointer;
  }
`;

const FilterBox = styled.div`
  display: flex;
  gap: 24px;
`;

const ListAsset = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
  margin-top: 60px;
`;
