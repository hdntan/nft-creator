import Image from "next/image";
import React from "react";
import styled from "styled-components";
import logo from "../assets/PawcificLogo.png";

import Link from "next/link";
import { IconDiscord, IconTelegram, IconTwitter, IconYoutube } from "@/assets/icons";


const LINKS = [
  {
    label: "Home",
    href: "#",
  },
  {
    label: "Privacy Policy",
    href: "#",
  },
  {
    label: "Terms of Use",
    href: "#",
  },
  {
    label: "Code of Ethics",
    href: "#",
  },
];

const ICONS = [
  {
    icon: <IconTwitter />,
    href: "#"
  },
  {
    icon: <IconTelegram />,
    href: "#"

  },
  {
    icon: <IconYoutube />,
    href: "#"

  },
  {
    icon: <IconDiscord />,
    href: "#"

  },
];

const Footer = () => {
  return (
    <Wrapper>
      <FooterLeft>
        <FooterLeftLogo>
          <Image src={logo} alt="logo" width={95} height={50} />
        </FooterLeftLogo>
        <Copyright>Copyright © 2023 UI LLC. All rights reserved</Copyright>
      </FooterLeft>
      <FooterRight>
        <FooterRightLogo>
          {ICONS.map((icon, index) => (
            <Link href={icon.href} key={index} >
             <ContainerIcon >{icon.icon}</ContainerIcon>
            </Link>
           
          ))}
        </FooterRightLogo>
        <FooterRightMenu>
          {LINKS.map((link, index) => (
            <Link href={link.href} key={index}>
              <MenuLink>{link.label}</MenuLink>
            </Link>
          ))}
        </FooterRightMenu>
      </FooterRight>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 90px;
`;

const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
`;
const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  gap: 12px;
`;
const FooterLeftLogo = styled.div``;
const FooterRightLogo = styled.div`
  display: flex;
  gap: 12px;
`;
const Copyright = styled.div`
font-size: 14px;
color: #FFFFFF;
`
const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fed73b;
  width: 25px;
  height: 25px;
  border-radius: 100%;
`;
const FooterRightMenu = styled.div`
  display: flex;
  gap: 48px;
`;
const MenuLink = styled.div`
  font-size: 14px;
  color: #FFFFFF;
`;


