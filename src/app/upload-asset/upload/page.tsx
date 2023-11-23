"use client";
import MainLayout from "@/layout";
import React, { useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IconBack } from "@/assets/icons";
import UploadForm from "./components/UploadForm";
import ButtonBack from "@/components/ButtonBack";

const UploadAsset = () => {
  

  return (
    <MainLayout>
      <Wrapper>
        <ButtonBack href ="/upload-asset" />
        <ContainerUpload>
          <UploadForm />
        </ContainerUpload>
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
const ContainerUpload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;


