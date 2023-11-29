'use client'
import { technoRaceFont } from '@/font'
import MainLayout from '@/layout'
import React from 'react'
import styled from 'styled-components'
 
const DownloadUGCTool = () => {
  return (
    <MainLayout>

       <Wrapper className={technoRaceFont.className}>
        Upcoming...
       </Wrapper>
    </MainLayout>
  )
}

export default DownloadUGCTool

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    color: #FFFF;
    margin-top: 150px;
    font-size: 48px;
`