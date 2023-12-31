"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import * as React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export interface IMainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Readonly<IMainLayoutProps>) {
  return (
    <Layout>
      <ToastContainer position="top-right" />
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </Layout>
  );
}

export function MarketplaceLayout({ children }: Readonly<IMainLayoutProps>) {
  return (
    <LayoutMarket>
      <ToastContainer position="top-right" />
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </LayoutMarket>
  );
}

const LayoutMarket = styled.div`
  background-image: url("/images/BG-Marketplace.png");
  background-size: cover;
  background-position: center;
`;
const Layout = styled.div`
  background-image: url("/images/background.png");
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;
