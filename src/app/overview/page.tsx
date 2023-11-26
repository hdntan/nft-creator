"use client";
import ListButton from "@/app/overview/components/ListButtons";
import ButtonBack from "@/components/ButtonBack";
import Select from "@/components/Select";
import { NFT_TYPE } from "@/constants";
import MainLayout from "@/layout";
import { getListNFTOverviewRequest } from "@/services";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import styled from "styled-components";
import CardAsset from "./components/CardAsset";

export interface IOverviewPageProps {}

export default function OverviewPage(props: IOverviewPageProps) {
  const [listNft, setListNft] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const SelectType = async (e: any) => {
    router.push(`/overview?type=${e.target.value}`);
  };

  const fetchCollection = async () => {
    setIsLoading(true);
    try {
      const { data } = await getListNFTOverviewRequest(
        searchParams.get("type") ?? undefined
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
  }, [searchParams.get("type")]);

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
                value={searchParams.get("type")}
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
