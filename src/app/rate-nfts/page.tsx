"use client";
import { IconBack } from "@/assets/icons";
import Select from "@/components/Select";
import { NFT_TYPE } from "@/constants";
import LayoutPrivate from "@/layout/LayoutPrivate";
import { contractNftCreatorFactory, getNftDetail } from "@/services";
import { INFTDetail } from "@/types";
import { BigNumber } from "ethers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CardNFTVote from "./components/CardNFTVote";
import { useAccount } from "wagmi";
import NoResultsPage from "@/components/NoResultsPage";
import ButtonBack from "@/components/ButtonBack";

export interface IRaterNFTPageProps {}

export default function RaterNFTPage(props: IRaterNFTPageProps) {
  const [listData, setListData] = useState<INFTDetail[]>([]);
  const [listDataFilter, setListDataFilter] = useState<INFTDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isConnected } = useAccount();

  const SelectType = async (e: any) => {
    router.push(`/rate-nfts?type=${e.target.value}`);
    setListDataFilter([]);
  };

  const getListAddress = async () => {
    setIsLoading(true);
    try {
      const contract = await contractNftCreatorFactory();
      if (contract) {
        const transaction: any = await contract.getCollectionListBought();
        if (transaction) {
          const collectionInfo = transaction.map((address: string) => {
            return contract.collectionInfo(address);
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

  useEffect(() => {
    if (isConnected) getListAddress();
  }, [isConnected]);

  useEffect(() => {
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
              <ButtonBack href="/overview" />
              <h2>Rating the best art</h2>
            </TitleBox>
            <FilterBox>
              <Select
                name="typeNft"
                onChange={SelectType}
                options={NFT_TYPE}
                value={searchParams.get("type")}
              />
            </FilterBox>
          </TopMenu>

          {listDataFilter.length !== 0 ? (
            <ListAsset>
              {listDataFilter.map((nft) => (
                <CardNFTVote data={nft} key={nft.id} />
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
  padding: 76px 90px;
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
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  justify-items: center;
  gap: 24px;
  width: 100%;
  margin-top: 60px;
`;
