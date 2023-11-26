import { technoRaceFont } from '@/font'
import React from 'react'
import styled from 'styled-components'

const NoResultsPage = () => {
  return (
    <Wrapper className={technoRaceFont.className}>No Results Found...</Wrapper>
  )
}

export default NoResultsPage

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