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
  fontWeight: string;
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
        <ButtonBack href="/" />
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
                      <Label textColor="" fontSize="48px" fontWeight="600">
                        {tab.title}
                      </Label>
                      <Label textColor="" fontSize="20px" fontWeight="">
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
  max-width: 1847px;
  margin: 0 auto;
`;
const WrapperTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ContainerTab = styled.div`
  color: white;
`;

const Label = styled.label<StyledLabelProps>`
  font-size: ${(props) => props.fontSize || "14px"};
  font-weight: ${(props) => props.fontWeight || "400"};

  color: ${(props) => (props.textColor !== "yellow" ? "#FFFFFF" : "#FED73B")};
`;

const TabHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  background: linear-gradient(0deg, #00062b, #00062b),
    linear-gradient(90deg, #021491 -16.29%, #1647cf 106.35%);
`;
const TabContent = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.8;

  background: linear-gradient(
      154.81deg,
      rgba(4, 9, 41, 0.9) -16.1%,
      rgba(19, 33, 135, 0.9) 106.19%
    ),
    linear-gradient(
      265.26deg,
      rgba(60, 91, 205, 0) 0.41%,
      #6c93ff 54.83%,
      rgba(60, 89, 205, 0) 103.86%
    ),
    linear-gradient(0deg, rgba(62, 111, 255, 0.4), rgba(62, 111, 255, 0.4)),
    radial-gradient(
      758.86% 657.24% at 107.77% 190.85%,
      rgba(166, 177, 255, 0.5) 0%,
      rgba(89, 100, 177, 0) 100%
    );

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

const ButtonTab = styled.button<StyledTabProps>`
  width: 300px;
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
  height: 84px;
  padding: 24px 36px;
  border-radius: 240px;
  gap: 10px;
  background-color: #fed73b;
  color: #000000;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 32px;
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
    title: "No Character weapons ",
    content:
      "You have no Character weapons yet. Create a new Character weapons, and build Pawcific Rim world together!",
  },
  {
    id: "3",
    tabTitle: "Map",
    title: "No Map",
    content:
      "You have no Map yet. Create a new Map, and build Pawcific Rim world together!",
  },
  {
    id: "4",
    tabTitle: "Worlds",
    title: "No Worlds",
    content:
      "You have no Worlds yet. Create a new Worlds, and build Pawcific Rim world together!",
  },
];
