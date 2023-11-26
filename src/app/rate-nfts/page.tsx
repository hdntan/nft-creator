"use client";
import { IconBack } from "@/assets/icons";
import Select from "@/components/Select";
import { NFT_TYPE } from "@/constants";
import MainLayout from "@/layout";
import { contractNftCreatorFactory, getNftDetail } from "@/services";
import { INFTDetail } from "@/types";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CardNFTVote from "./components/CardNFTVote";
import { useRouter, useSearchParams } from "next/navigation";

export interface IRaterNFTPageProps {}

export default function RaterNFTPage(props: IRaterNFTPageProps) {
  const [listData, setListData] = useState<INFTDetail[]>([]);
  console.log("🚀 ~ file: page.tsx:18 ~ RaterNFTPage ~ listData:", listData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const SelectType = async (e: any) => {
    router.push(`/overview?type=${e.target.value}`);
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
    getListAddress();
  }, []);

  // useEffect(() => {
  //   setListData(prev => {
  //     prev.filter()
  //   })
  // }, [searchParams.get("type")]);

  return (
    <MainLayout>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <SectionOverview>
          <TopMenu>
            <TitleBox>
              <IconBack />
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
          <ListAsset>
            {listData.map((nft) => (
              <CardNFTVote data={nft} key={nft.id} />
            ))}
          </ListAsset>
        </SectionOverview>
      )}
    </MainLayout>
  );
}

const SectionOverview = styled.section`
  width: 100%;
  padding-top: 76px;
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
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  justify-items: center;
  gap: 24px;
  width: 100%;
  margin-top: 60px;
`;
