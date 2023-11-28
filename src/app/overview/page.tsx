"use client";
import ListButton from "@/app/overview/components/ListButtons";
import ButtonBack from "@/components/ButtonBack";
import Select from "@/components/Select";
import { NFT_TYPE } from "@/constants";
import {
  contractNftCreatorFactory,
  getNftDetail,
} from "@/services";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import styled from "styled-components";
import CardAsset from "./components/CardAsset";

import NoResultsPage from "@/components/NoResultsPage";
import { useAccount } from "wagmi";
import { BigNumber } from "ethers";
import LayoutPrivate from "@/layout/LayoutPrivate";

export interface IOverviewPageProps {}

export default function OverviewPage(props: IOverviewPageProps) {
  const { address, isConnected } = useAccount();
  const user = address?.toString();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [listData, setListData] = React.useState<any[]>([]);

  const [listDataFilter, setListDataFilter] = React.useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const SelectType = async (e: any) => {
    router.push(`/overview?type=${e.target.value}`);
    setListDataFilter([]);
  };

  const fetchCollectionByWallet = async () => {
    setIsLoading(true);
    try {
      const contract = await contractNftCreatorFactory();
      if (contract) {
        const transaction: any = await contract.getCollectionsFullInfoByCreator(
          user
        );
        if (transaction) {
          const collectionInfo = transaction.map((collection: any) => {
            return collection;
          });
          Promise.all(collectionInfo).then((collections) => {
            const conllectionIds = collections.map((infor: any) => {
              const bigNumber = BigNumber.from(infor.recordId);
              const id = bigNumber.toNumber();
              return getNftDetail(id);
            });
            Promise.all(conllectionIds)
              .then((values) => {
                const listNFT = values.map((item) => item.data?.data);
                setListData(listNFT);
                setIsLoading(false);
              })
              .catch((error) => {
                setListData([]);
                setIsLoading(false);
              });
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isConnected) fetchCollectionByWallet();
  }, [isConnected]);

  React.useEffect(() => {
    if (searchParams.get("type")) {
      const dataFilter = listData.filter(
        (item) => item.type.toString() === searchParams.get("type")
      );
      setListDataFilter(dataFilter);
    } else {
      setListDataFilter(listData);
    }
  }, [searchParams.get("type"), listData]);
  return (
    <LayoutPrivate>
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
                onChange={SelectType}
                options={NFT_TYPE}
                name="typeNFT"
                value={searchParams.get("type")}
              />
              <ListButton />
            </FilterBox>
          </TopMenu>

          {listDataFilter.length !== 0 ? (
            <ListAsset>
              {listDataFilter?.map((nft, index) => (
                <>
                  <CardAsset nft={nft} key={index} />
                </>
              ))}
            </ListAsset>
          ) : (
            <NoResultsPage />
          )}
        </SectionOverview>
      )}
    </LayoutPrivate>
  );
}

const SectionOverview = styled.section`
  width: 100%;
  padding: 76px 53px;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(329px, 1fr));
  justify-items: center;
  gap: 24px;
  width: 100%;
  margin-top: 66px;
`;
