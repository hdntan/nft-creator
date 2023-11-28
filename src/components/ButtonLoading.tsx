import React from 'react'
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

export interface IButtonProps {
    onClick: () => void;
    loading: any;
    title: any;
    fonSize: any;
    width: any
  }

  interface StyledComponentProps {
    fonSize: string;
    width: string
  }
const ButtonLoading = ({onClick, loading, title, fonSize, width}: IButtonProps ) => {
  return (
    <Button onClick={onClick} disabled={loading} fonSize={fonSize} width={width} >
    <ClipLoader loading={loading} size={20} color="#36d7b7" />
    <p>{title}</p>
  </Button>
  )
}

export default ButtonLoading

const Button = styled.button<StyledComponentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 53px;
  width: ${(props) =>props.width};
  padding: 12px 24px;
  background-color: #fed73b;
  border: none;
  border-radius: 8px;
  font-size: ${(props) =>props.fonSize};
  font-weight: 600;
  color: #000000;
  gap: 12px;
`;