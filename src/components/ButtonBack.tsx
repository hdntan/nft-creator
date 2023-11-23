import { IconBack } from '@/assets/icons';
import { useRouter } from 'next/navigation';
import React from 'react'
import styled from 'styled-components';

const ButtonBack = ({href}: any) => {

    const route = useRouter();
  return (
    
          <Button onClick={() => route.push(href)}>
            <IconBack />
          </Button>
       
  )
}

export default ButtonBack
const Button = styled.button``;