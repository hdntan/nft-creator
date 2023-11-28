"use client";
import { IconStart } from "@/assets/icons";
import { Avatar, Coin } from "@/assets/images";
import LoadingModal from "@/components/LoadingModal";
import MainLayout from "@/layout";
import { contractNftCreatorFactory } from "@/services";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import ShowRating from "./components/ShowRating";
import LayoutPrivate from "@/layout/LayoutPrivate";

interface StyledTdProps {
  bg: string;
  fontSize: string;
  padding: string;
}

type TopUser = {
  id: string;
  avatar: string;
  users: string;
  sub: string;
  successfulAssets: string;
  totalReward: string;
  iconCoin: string;
  rating: string;
};

type User = {
  users: string;
  rating: string;
};

const LeaderBoard = () => {
  const { isConnected } = useAccount();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getSuccessfulAsset = async (creator: any) => {
    const contract = await contractNftCreatorFactory();
    if (contract) {
      const transaction1 = await contract.getCollectionsLengthByCreator(
        creator
      );
      const assets = transaction1.toNumber();
      return assets;
    }
  };

  const getCreators = async () => {
    setLoading(true);
    const contract = await contractNftCreatorFactory();
    if (contract) {
      const transaction2 = await contract.getAllCreatorsFullInfo();
      const listUsers = [];
      for (var i = 0; i < transaction2.length; i++) {
        const assets = await getSuccessfulAsset(transaction2[i].creator);
        const voteTotalPower = transaction2[i].voteTotalPower.toNumber();
        const voteCount = transaction2[i].voteCount.toNumber();

        const user = {
          rank: i + 1,
          creator: transaction2[i].creator,
          assets: assets,
          totalReward: transaction2[i].totalReward.toNumber(),
          voteTotalPower: voteTotalPower,
          voteCount: voteCount,
          rating:
            voteTotalPower === 0 && voteCount === 0
              ? 0
              : (voteTotalPower / voteCount).toFixed(0),
        };

        listUsers.push(user);
      }
      setUsers(listUsers);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) getCreators();
  }, [isConnected]);

  return (
    <LayoutPrivate>
      {isConnected && <LoadingModal isLoading={loading} message="Loading..." />}

      <Wrapper>
        <Title>Creators Leaderboards</Title>
        <StyledTableWrapper>
          <StyledTable>
            <StyleThead>
              <StyledTr>
                <StyledTh>Top</StyledTh>
                <StyledTh>Users</StyledTh>
                <StyledTh>Successful assets</StyledTh>
                <StyledTh>Total reward</StyledTh>
                <StyledTh>Rating </StyledTh>
              </StyledTr>
            </StyleThead>
            <StyledTbody>
              {users.map((user: any, index: number) => (
                <StyledTr key={index}>
                  <StyledTd
                    fontSize=""
                    bg={index <= 2 ? "TOP" : ""}
                    padding="62px 80px"
                  >
                    {user.rank}
                  </StyledTd>
                  <StyledTd fontSize="36px" padding="" bg="">
                    <ContainerUser>
                      <Image
                        src={Avatar}
                        alt="avatar"
                        height={129}
                        width={129}
                      />
                      <p>
                        {user.creator?.slice(0, 6)}...
                        {user.creator?.slice(user.creator.length - 6)}
                      </p>
                    </ContainerUser>
                  </StyledTd>
                  <StyledTd fontSize="" padding="" bg="">
                    {user.assets}
                  </StyledTd>
                  <StyledTd fontSize="" padding="" bg="">
                    <ContainerReward>
                      <Image src={Coin} alt="avatar" height={65} width={67} />
                      <p> {user.totalReward}</p>
                    </ContainerReward>
                  </StyledTd>
                  <StyledTd fontSize="" bg="" padding="0 60px">
                    <ContainerRating>
                      <ShowRating index={user.rating} />
                    </ContainerRating>
                  </StyledTd>
                </StyledTr>
              ))}
            </StyledTbody>
          </StyledTable>
        </StyledTableWrapper>
      </Wrapper>
    </LayoutPrivate>
  );
};

export default LeaderBoard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 90px 60px;
`;

const Title = styled.div`
  color: #ffff;
  font-size: 48px;
  margin-bottom: 64px;
`;

const StyledTableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const StyledTable = styled.table`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const StyledTr = styled.tr``;

const StyledTh = styled.th`
  font-size: 18px;
  color: #ffffff;
  padding: 28px 60px;
`;

const StyledTd = styled.td<StyledTdProps>`
  background: ${(props) =>
    props.bg === "TOP" &&
    "linear-gradient(90deg, #021491 -16.29%, #1647CF 106.35%)"};
  text-align: center;
  padding: 12px;
  color: #ffff;
  border-top: 1px solid #6c93ff;
  border-bottom: 1px solid #6c93ff;

  padding: ${(props) => props.padding || ""};
  font-size: ${(props) => props.fontSize || "24px"};
`;

const StyledTbody = styled.tbody`
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
`;
const StyleThead = styled.thead`
  background: linear-gradient(
    90deg,
    rgba(2, 20, 145, 0.8) -16.29%,
    rgba(22, 71, 207, 0.8) 106.35%
  );
`;
const ContainerUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 60px;
  gap: 24px;
`;
const ContainerReward = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 12px;
  padding: 0 60px;
`;

const ContainerRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NFTS = [
  {
    id: "1",
    avatar: Avatar,
    users: "apotatosaurus",
    sub: " lorem ipsum loremipsum",
    successfulAssets: " 14727 ",
    totalReward: " 14727 Points",
    iconCoin: Coin,
    rating: "********************",
  },
  {
    id: "2",
    avatar: Avatar,
    users: "apotatosaurus",
    sub: " lorem ipsum loremipsum",
    successfulAssets: " 14727 ",
    totalReward: " 14727 Points",
    iconCoin: Coin,
    rating: "********************",
  },
  {
    id: "3",
    avatar: Avatar,
    users: "apotatosaurus",
    sub: " lorem ipsum loremipsum",
    successfulAssets: " 14727 ",
    totalReward: " 14727 Points",
    iconCoin: Coin,
    rating: "********************",
  },
  {
    id: "4",
    avatar: Avatar,
    users: "apotatosaurus",
    sub: " lorem ipsum loremipsum",
    successfulAssets: " 14727 ",
    totalReward: " 14727 Points",
    iconCoin: Coin,
    rating: "********************",
  },
];
