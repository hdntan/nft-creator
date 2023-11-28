import React from 'react'
import styled from 'styled-components'
import DotLoader from "react-spinners/DotLoader";
import { technoRaceFont } from "@/font";

export interface IModalProps {
    isLoading: boolean,
    message: string 
  }
const LoadingModal = ({isLoading, message}: IModalProps) => {
  return isLoading && (
    <Wrapper>
        <ContainerLoading>
        <DotLoader size={200} color="#36d7b7" />
        <Label className={technoRaceFont.className}>{message}</Label>
        </ContainerLoading>
       

    </Wrapper>
  )
}

export default LoadingModal

const Wrapper = styled.div`
    display: flex; 
position: fixed; 
top: 0; 
left: 0; 
gap: 5rem; 
justify-content: center; 
align-items: center; 
width: 100%; 
height: 100%; 
background: rgba(0, 0, 0, 0.5);

transition-property: transform;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-duration: 300ms; 
transition-duration: 300ms; 

z-index: 10;
`

const ContainerLoading = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`
const Label = styled.p`
    font-size: 36px;
    font-weight: 600;
    color: #36d7b7;
    
`