"use client";
import ListButton from "@/app/overview/components/ListButtons";
import { IconBack } from "@/assets/icons";
import Select from "@/components/Select";
import { NFT_TYPE } from "@/constants";
import MainLayout from "@/layout";
import { getListNFTOverviewRequest } from "@/services";
import * as React from "react";
import styled from "styled-components";
import CardAsset from "./components/CardAsset";
import ButtonBack from "@/components/ButtonBack";

export interface IOverviewPageProps {}

export default function OverviewPage(props: IOverviewPageProps) {
  const [listNft, setListNft] = React.useState([]);
  const [type, setType] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const SelectType = async (e: any) => {
    setType(e.target.value);
  };

  const fetchCollection = async () => {
    setIsLoading(true);
    try {
      const { data } = await getListNFTOverviewRequest(
        type == "--" ? undefined : type
      );
      setListNft(data?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCollection();
  }, [type]);

  return (
    <MainLayout>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SectionOverview>
          <TopMenu>
            <TitleBox>
            <ButtonBack href="/" />
              <h2>Overview</h2>
            </TitleBox>
            <FilterBox>
              <Select
                onChange={(e) => SelectType(e)}
                options={NFT_TYPE}
                name="typeNFT"
              />
              <ListButton />
            </FilterBox>
          </TopMenu>
          <ListAsset>
            {listNft?.map((nft, index) => (
              <CardAsset nft={nft} key={index} />
            ))}
          </ListAsset>
        </SectionOverview>
      )}
    </MainLayout>
  );
}

const SectionOverview = styled.section`
  width: 100%;
  padding: 53px;
  max-width: 1847px;
  margin: auto;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(329px, 1fr));
  justify-items: center;
  gap: 24px;
  width: 100%;
  margin-top: 60px;
`;
