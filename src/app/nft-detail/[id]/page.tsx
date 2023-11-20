
'use client'
import { IconBack } from '@/assets/icons'
import { Hero } from '@/assets/images'
import MainLayout from '@/layout'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'
interface StyledLabelProps {
    textColor: string
}

const NFTDetail = () => {
const route = useRouter()

  return (
    <MainLayout>
        <Wrapper>
            <ContainerBack >
                <Button onClick={() => route.push('/overview')}><IconBack /></Button>
            
            </ContainerBack>
            
        <WrapperDetail>
            
        <ContainerImage>
            <Image src={Hero} alt='hero' width={567} height={518}></Image>
        </ContainerImage>
        <ContainerContent>
            {
                NFTS.map((nft, index) => 
                <Content key={index}>
                    <Label textColor=''>{nft.title}</Label>
                    <Label textColor='yellow'>{nft.content}</Label>
                </Content> )
            }
           
        </ContainerContent>
        </WrapperDetail>
        </Wrapper>
       
        </MainLayout>
  )
}

export default NFTDetail

const Wrapper = styled.div`
display: flex;
   width: 100%;
  padding: 78px 90px;
  max-width: 1847px;
  margin: auto;


`
const ContainerBack = styled.div`
    margin-right: 242px;
`
const Button = styled.button`
   
`

const WrapperDetail = styled.div`
    display: flex;
    flex-direction: row;
    width: 1144px;
    height: 673px;
    border-radius: 14px;
    padding: 32px;
    background: linear-gradient(154.81deg, rgba(0, 6, 43, 0.7) -16.1%, rgba(25, 44, 175, 0.7) 106.19%),
linear-gradient(3.99deg, #021491 -7.62%, #6C93FF 102.95%),
radial-gradient(263.36% 437.87% at -2.97% 106.23%, #A6B1FF 0%, rgba(89, 100, 177, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
gap: 100px;
`
const ContainerImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 607px;
    height: 609px;
    border-radius: 8px;
    padding-left: 16px;
    border: 1px solid #6C93FF;
    background-image: url('/images/BG-NFT.png');
`

const ContainerContent = styled.div`
    

`
const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 373px;
    height: 72px;
    padding: 24px;
    margin-bottom: 36px;
    border-radius: 14px;
    background: linear-gradient(154.81deg, rgba(0, 6, 43, 0.7) -16.1%, rgba(11, 16, 50, 0.7) 106.19%);
    

`
const Label = styled.label<StyledLabelProps>`
  font-size: 18px;
  color: ${(props) => (props.textColor !== "yellow" ? "#FFFFFF" : "#FED73B")};
`;

const NFTS = [
    {
        title: "Owner",
        content: "Lorem Ipsum"
    },
    {
        title: "Owner",
        content: "Lorem Ipsum"
    },
    {
        title: "Owner",
        content: "Lorem Ipsum"
    },
    {
        title: "Owner",
        content: "Lorem Ipsum"
    }
]