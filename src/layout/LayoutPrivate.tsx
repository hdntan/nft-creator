"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import * as React from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export interface ILayoutPriviteProps {
  children: React.ReactNode;
}

export default function LayoutPrivate({
  children,
}: Readonly<ILayoutPriviteProps>) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  React.useEffect(() => {
    if (!isConnected && openConnectModal) {
      openConnectModal();
    }
  }, [isConnected]);
  return (
    <Layout>
      <ToastContainer position="top-right" />
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </Layout>
  );
}

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
