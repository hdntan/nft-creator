"use client";
import { IconAddCircle, IconBack } from "@/assets/icons";
import ButtonBack from "@/components/ButtonBack";
import MainLayout from "@/layout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";
interface StyledLabelProps {
  fontSize: string;
  textColor: string;
}

interface StyledTabProps {
  currentActive: string;
}

const UploadAsset = () => {
  const [currentTab, setCurrentTab] = useState("1");

  const handleTabClick = (e: any) => {
    setCurrentTab(e.target.id);
  };

  return (
    <MainLayout>
      <Wrapper>
        <ButtonBack href="/"/>
        <WrapperTab>
          <ContainerTab>
            <TabHeader className="tabs">
              {tabs.map((tab, i) => (
                <ButtonTab
                  currentActive={
                    currentTab === `${tab.id}` ? "active" : "default"
                  }
                  key={i}
                  id={tab.id}
                  disabled={currentTab === `${tab.id}`}
                  onClick={handleTabClick}
                >
                  {" "}
                  {tab.tabTitle}
                </ButtonTab>
              ))}
            </TabHeader>
            <TabContent>
              {tabs.map((tab, i) => (
                <div key={i}>
                  {currentTab === `${tab.id}` && (
                    <Content>
                      <Label textColor="" fontSize="48px">
                        {tab.title}
                      </Label>
                      <Label textColor="" fontSize="20px">
                        {tab.content}
                      </Label>
                    </Content>
                  )}
                </div>
              ))}

              <Link href={"/upload-asset/upload"}>
                <UploadButton>
                  Upload Asset <IconAddCircle />
                </UploadButton>
              </Link>
            </TabContent>
          </ContainerTab>
        </WrapperTab>
      </Wrapper>
    </MainLayout>
  );
};

export default UploadAsset;

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
  padding: 81px 90px;
`;
const WrapperTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ContainerTab = styled.div`
  color: white;
  width: 1437px;
  border: 1px solid #1647cf;
  border-radius: 8px;
  background: linear-gradient(0deg, #00062b, #00062b),
    linear-gradient(90deg, #021491 -16.29%, #1647cf 106.35%);
`;

const Label = styled.label<StyledLabelProps>`
  font-size: ${(props) => props.fontSize || "14px"};
  color: ${(props) => (props.textColor !== "yellow" ? "#FFFFFF" : "#FED73B")};
`;

const TabHeader = styled.div`
  width: 100%;
  width: 1437px;
`;
const TabContent = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonTab = styled.button<StyledTabProps>`
  width: 359px;
  height: 101px;
  padding: 36px 0;
  border-bottom: 4px solid;
  border-bottom-color: ${(props) =>
    props.currentActive === "active" ? "#FED73B" : " #0000"};

  color: ${(props) =>
    props.currentActive === "active" ? "#FED73B" : " #FFFF"};
  font-size: 24px;
`;
const UploadButton = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  width: 282px;
  height: 84px;
  margin-top: 32px;
  padding: 24px 36px;
  border-radius: 240px;
  gap: 10px;
  background-color: #fed73b;
  color: #000000;
  font-size: 24px;
`;

const tabs = [
  {
    id: "1",
    tabTitle: "NFT Skins",
    title: "No NFT Skin",
    content:
      "You have no NFT skins yet. Create a new NFT skins, and build Pawcific Rim world together!",
  },
  {
    id: "2",
    tabTitle: "Character weapons  ",
    title: "Title 2",
    content: "Contenido de tab 2.",
  },
  {
    id: "3",
    tabTitle: "Map",
    title: "Title 3",
    content: "Contenido de tab 3.",
  },
  {
    id: "4",
    tabTitle: "Worlds",
    title: "Title 4",
    content: "Contenido de tab 4.",
  },
];
