"use client";
import { IconBack } from "@/assets/icons";
import ListButton from "@/app/overview/components/ListButtons";
import Select from "@/components/Select";
import MainLayout from "@/layout";
import * as React from "react";
import styled from "styled-components";
import CardAsset from "./components/CardAsset";
import axiosInstance from "@/config/axios.config";
import { useRouter } from "next/navigation";

export interface IOverviewPageProps { }

export default function OverviewPage(props: IOverviewPageProps) {
  const route = useRouter();
  const [listNft, setListNft] = React.useState([]);
  const [type, setType] = React.useState("");
  

  const SelectType = async (e: any) => {
    console.log("type nft", e.target.value)
    if(e.target.value === "--") {
      axiosInstance.get('/collection')
      .then((response) => {
        console.log(response.data);
        setListNft(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else 
    {
      axiosInstance.get(`/collection?type=${e.target.value}`)
      .then((response) => {
        console.log(response.data);
        setListNft(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }
   
  }

  React.useEffect(() => {

    axiosInstance.get('/collection')
      .then((response) => {
        console.log(response.data);
        setListNft(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

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
          
              onChange={(e) => SelectType(e)
              }
              options={OPTIONS}
            />
            <ListButton />
          </FilterBox>
        </TopMenu>
        <ListAsset>
          {listNft.map((nft, index) => (
            <CardAsset nft={nft} key={index} />
          ))}

        </ListAsset>
        
      </SectionOverview>
    </MainLayout>
  );
}

const SectionOverview = styled.section`
  width: 100%;
  padding: 100px 90px;

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



const OPTIONS = [
 
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