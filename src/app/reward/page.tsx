"use client";
import { Seasion } from "@/assets/images";
import ButtonBack from "@/components/ButtonBack";
import ButtonLoading from "@/components/ButtonLoading";
import MainLayout from "@/layout";
import LayoutPrivate from "@/layout/LayoutPrivate";
import { contractNftCreatorFactory } from "@/services";
import { showErrorToast, showSuccessToast } from "@/utils/helper";
import { BigNumber } from "ethers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
interface StyledLabelProps {
  textColor: string;
}
const RewardPage = () => {
    const { address, isConnected } = useAccount();
    const [infoClaim, setInfoClaim] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const user = address?.toString();
  const router = useRouter();

  const getClaimReward = async () => {
    try {
      setLoading(true);
        const contract = await contractNftCreatorFactory();
    if (contract) {
      const transaction = await contract.claimReward()
      await transaction.wait();
      setLoading(false)
      showSuccessToast("Claim Reward successfully");
      router.push("/");

    }
    } catch (error) {
        console.log("err",error);
      setLoading(false)

        showErrorToast("Claim Reward Failed")
    }
    
  };

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
  const getClaimInfoByWallet = async () => {
    const contract = await contractNftCreatorFactory();
    if (contract) {
        
      const transaction1 = await contract.getClaimInfo(
        user
      );
      const assets = await getSuccessfulAsset(user);
      const info = {
        assets: assets,
        totalReward : transaction1[0].toNumber(),
        claimedAmount : transaction1[1].toNumber(),
        claimableAmount: transaction1[2].toNumber(),
      }
      console.log("transaction", info)
      setInfoClaim(info)
    }
  };
useEffect(()=> {
    if (isConnected)  getClaimInfoByWallet();
},[isConnected])

  return (
    <LayoutPrivate>
      <Wrapper>
        <ButtonBack href="/" />
        <WrapperBoard>
          <ContainerBoard>
            <BoardContent>
              <BoardLeft>
                <Image src={Seasion} alt="seasion" width={390} height={439} />
              </BoardLeft>
              <BoardRight>
                <Content>
                  <Label textColor="">Season Pass:</Label>
                  <Label textColor="yellow">The Christmas Eve</Label>
                </Content>
                <Content>
                  <Label textColor="">Number of assets:</Label>
                  <Label textColor="yellow">{infoClaim.assets ||"0"}</Label>
                </Content>
                <Content>
                  <Label textColor="">Quantity sold:</Label>
                  <Label textColor="yellow">{infoClaim.totalReward ||"0"}</Label>
                </Content>
                <Content>
                  <Label textColor="">Total profit:</Label>
                  <Label textColor="yellow">{infoClaim.claimedAmount ||"0"}</Label>
                </Content>
                <Content>
                  <Label textColor="">Profit for creators:</Label>
                  <Label textColor="yellow">{infoClaim.claimableAmount ||"0"}</Label>
                </Content>
              </BoardRight>
            </BoardContent>
            <ContainerButton>
              <ButtonLoading title="Claim your reward" fonSize="19" width="383.621px" loading={loading} onClick={getClaimReward}/>
            </ContainerButton>
          </ContainerBoard>
        </WrapperBoard>
      </Wrapper>
    </LayoutPrivate>
  );
};

export default RewardPage;

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  /* justify-content: space-around; */
  width: 100%;
  padding: 76px 53px;
  max-width: 1847px;
  margin: 0 auto;
`;

const WrapperBoard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 1144px;
  padding: 32px;
  align-items: flex-start;
  gap: 48px;
  border-radius: 14.164px;
  border: 1.18px solid #021491;
  background: radial-gradient(
      510.97% 76.01% at -2.97% 106.23%,
      #a6b1ff 0%,
      rgba(89, 100, 177, 0) 100%
    ),
    linear-gradient(
      155deg,
      rgba(0, 6, 43, 0.7) -16.1%,
      rgba(25, 44, 175, 0.7) 106.19%
    );
  box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12.5px);
`;

const BoardContent = styled.div`
  display: flex;
  gap: 48px;
`;

const BoardLeft = styled.div`
  background-size: cover;
  background-position: center;
  width: 390px;
  height: 439px;
  img {
    width: 100%;
    height: 100%;
  }
  flex-shrink: 0;

  background-color: lightgray 50% / cover no-repeat,
    linear-gradient(136deg, #000 22.56%, rgba(0, 0, 0, 0) 107.49%);
  background-blend-mode: screen, normal;
`;
const BoardRight = styled.div`
  gap: 12px;
`;

const Content = styled.div`
  width: 642px;
  height: 64px;
  display: flex;
  padding: 20px 24px;
  align-items: center;
  justify-content: space-between;
  /* gap: 12px; */
  align-self: stretch;
  border-radius: 14.164px;
  background: linear-gradient(
    155deg,
    rgba(0, 6, 43, 0.7) -16.1%,
    rgba(11, 16, 50, 0.7) 106.19%
  );
  margin-bottom: 24px;
  box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12.5px);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Label = styled.label<StyledLabelProps>`
  font-size: 18px;
  color: ${(props) => (props.textColor !== "yellow" ? "#FFFFFF" : "#FED73B")};
`;

const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
const ButtonClaim = styled.button`
  display: flex;
  width: 383.621px;
  padding: 14.164px 18.886px;
  justify-content: center;
  align-items: center;
  gap: 11.804px;
  border-radius: 4.721px;
  background: var(--SECONDARY, #fed73b);
`;
