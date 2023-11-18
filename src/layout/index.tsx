"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import * as React from "react";
import styled from "styled-components";

export interface IMainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Readonly<IMainLayoutProps>) {
  return (
    <Layout>
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </Layout>
  );
}

const Layout = styled.div`
  background-image: url("/images/background.png");
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;
