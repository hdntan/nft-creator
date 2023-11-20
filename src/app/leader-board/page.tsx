'use client'
import { Avatar, Coin } from '@/assets/images'
import MainLayout from '@/layout'
import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const LeaderBoard = () => {
  return (
    <MainLayout>
        <Wrapper>
            <Title>Creators Leaderboards</Title>
            <StyledTableWrapper>
               
                <StyledTable>
          <StyleThead>
            <tr>
               
              <StyledTh >Top</StyledTh>
              <StyledTh>Users</StyledTh>
              <StyledTh>Successful assets</StyledTh>
              <StyledTh>Total reward</StyledTh>
              <StyledTh>Rating  </StyledTh>


            </tr>
          </StyleThead>
          {/* <ContainerTr> */}
          <StyledTbody >
           
          

           {
               NFTS.map((nft, index) => 
               <tr key={index}>
                     <StyledTd bg={index <= 2 ? "TOP" :""} padding="62px 80px">{nft.id}</StyledTd>
         <StyledTd fontSize="36px">
            <ContainerUser>
                <Image src={nft.avatar} alt='avatar' height={129} width={129}/>
                <p>{nft.users}</p>
            </ContainerUser>
            </StyledTd>
         <StyledTd fontSize="24px">{nft.successfulAssets} </StyledTd>
         <StyledTd fontSize="24px"> 
         <ContainerReward>
                <Image src={nft.iconCoin} alt='avatar' height={65} width={67}/>
                <p> {nft.totalReward}</p>
            </ContainerReward>
        </StyledTd>
         <StyledTd padding ="0 60px">{nft.rating}</StyledTd>
               </tr>
               )
           }
      
        
      
     </StyledTbody>
          {/* </ContainerTr> */}
          
        </StyledTable>
                
      
      </StyledTableWrapper>
        </Wrapper>
    </MainLayout>
  )
}

export default LeaderBoard

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:94px 90px 163px 90px;

`

const Title = styled.div`
    color: #FFFF;
    font-size: 48px;
   margin-bottom: 64px;
`

const StyledTableWrapper = styled.div`
  overflow-x: auto;
 
    /* Apply border-radius to the top corners of the thead element */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  

`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  /* border-left: 1px solid #6C93FF;
  border-right: 1px solid #6C93FF; */
 
`;

const ContainerTr = styled.div`
border-left: 1px solid #6C93FF;
  border-right: 1px solid #6C93FF;
     /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
`

const StyledTh = styled.th`
  
    font-size: 18px;
    color: #FFFFFF;
;
 
  padding: 28px 60px;
`;

const StyledTd = styled.td`
/* background: linear-gradient(90deg, #021491 -16.29%, #1647CF 106.35%); */

background:  ${props => props.bg === "TOP" && "linear-gradient(90deg, #021491 -16.29%, #1647CF 106.35%)" };


text-align: center;
  /* border: 1px solid #ddd; */
  padding: 12px;
  color: #FFFF;
  border-top: 1px solid #6C93FF;
  border-bottom: 1px solid #6C93FF;

  padding: ${props => props.padding || ''};
    font-size: ${props => props.fontSize};



`;

const StyledTbody = styled.tbody`
background: linear-gradient(154.81deg, rgba(4, 9, 41, 0.9) -16.1%, rgba(19, 33, 135, 0.9) 106.19%),
linear-gradient(265.26deg, rgba(60, 91, 205, 0) 0.41%, #6C93FF 54.83%, rgba(60, 89, 205, 0) 103.86%),
linear-gradient(0deg, rgba(62, 111, 255, 0.4), rgba(62, 111, 255, 0.4)),
radial-gradient(758.86% 657.24% at 107.77% 190.85%, rgba(166, 177, 255, 0.5) 0%, rgba(89, 100, 177, 0) 100%);

    /* border-right: 1px solid #6C93FF; */
`
const StyleThead = styled.thead`
/* background: linear-gradient(90deg, #021491 -16.29%, #1647CF 106.35%); */
    background: linear-gradient(90deg, rgba(2, 20, 145, 0.8) -16.29%, rgba(22, 71, 207, 0.8) 106.35%);

`
const ContainerUser = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 60px;
    gap: 24px;
`
const ContainerReward = styled.div`
 display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0 60px;
    
    `
    

const NFTS = [
    {
        id: "1",
        avatar: Avatar,
        users:"apotatosaurus",
        sub:" lorem ipsum loremipsum",
        successfulAssets:" 14727 ",
        totalReward:" 14727 Points",
        iconCoin: Coin,
        rating:"********************"

    },
    {
        id: "2",
        avatar: Avatar,
        users:"apotatosaurus",
        sub:" lorem ipsum loremipsum",
        successfulAssets:" 14727 ",
        totalReward:" 14727 Points",
        iconCoin: Coin,
        rating:"********************"

    },
    {
        id: "3",
        avatar: Avatar,
        users:"apotatosaurus",
        sub:" lorem ipsum loremipsum",
        successfulAssets:" 14727 ",
        totalReward:" 14727 Points",
        iconCoin: Coin,
        rating:"********************"

    },
    {
        id: "4",
        avatar: Avatar,
        users:"apotatosaurus",
        sub:" lorem ipsum loremipsum",
        successfulAssets:" 14727 ",
        totalReward:" 14727 Points",
        iconCoin: Coin,
        rating:"********************"

    }

]