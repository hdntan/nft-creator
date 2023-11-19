"use client";
import MainLayout from "@/layout";
import * as React from "react";
import styled from "styled-components";
import CardNFTSynthesis from "./components/CardNFTSynthesis";

export interface INFTSynthesisProps {}

export default function NFTSynthesis(props: INFTSynthesisProps) {
  return (
    <MainLayout>
      <WrapperList>
        <CardNFTSynthesis />
      </WrapperList>
    </MainLayout>
  );
}

const WrapperList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
