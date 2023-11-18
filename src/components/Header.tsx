import React from 'react'
import styled from "styled-components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from '../assets/PawcificLogo.png'
import Image from 'next/image';

import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";


interface StyledComponentProps {
    currentActive: string;
  }
  
  const Wrapper = styled.div`
    width: 100%;
  
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 97px;
    background-color: rgba(0, 3, 26, 0.5);
    padding: 0 90px 0 90px;
  `;
  
  const HeaderLogo = styled.div``;
  const Nav = styled.div`
    display: flex;
    flex-direction: row;
  `;

  const NavItem = styled.div<StyledComponentProps>`
    height: 97px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 12px;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 12px;
    color: ${(props) => (props.currentActive === "active" ? "#FED73B" : " #FFF")};
  `;
  
  const ButtonConnect = styled.div`
    background-color: yellow;
    border-radius: 0.5rem;
    padding: 6px 24px 6px 24px;
    cursor: pointer;
  `;
  
  const LINKS = [
    {
      label: "Creators",
      href: "/",
    },
    {
      label: "Reward",
      href: "/reward",
    },
    {
      label: "Download UGC Tool",
      href: "/download",
    },
    {
      label: "Leaderboard",
      href: "/leader",
    },
  ];
const Header = () => {
    const { address, isConnected } = useAccount();
    const { openAccountModal } = useAccountModal();
    const { disconnect } = useDisconnect();
    const { openConnectModal } = useConnectModal();
    const currentPath = usePathname();
    console.log(currentPath);
  return (
    <Wrapper>
    <HeaderLogo>
      <Image src={logo} alt="logo" width={130} height={73} />
    </HeaderLogo>
    <Nav>
      {LINKS.map((link) => (
        <Link href={link.href} key={link.href}>
          <NavItem
            currentActive={link.href === currentPath ? "active" : "default"}
          >
            {link.label}
          </NavItem>
        </Link>
      ))}
    </Nav>

        {
             !isConnected ? <ButtonConnect onClick={openConnectModal}>
             Connect Wallet
           </ButtonConnect> :
           <ButtonConnect onClick={openAccountModal} >
        
          {address?.slice(0, 6)}...${address?.slice(address.length - 6)}
         </ButtonConnect>
        }
    
  </Wrapper>
  )
}

export default Header