import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import logo from "../assets/PawcificLogo.png";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { usePathname } from "next/navigation";

interface StyledComponentProps {
  currentActive: string;
}

const LINKS = [
  {
    label: "Reward",
    href: "/reward",
  },
  {
    label: "Leaderboard",
    href: "/leader-board",
  },
  {
    label: "BattlePass",
    href: "/marketplace",
  },
  {
    label: "Download UGC Tool",
    href: "/download-ugc-tool",
  },
];
const Header = () => {
  const { address, isConnected } = useAccount();
  const { openAccountModal } = useAccountModal();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const currentPath = usePathname();
  return (
    <Wrapper>
      <Link href={"/"}>
      <HeaderLogo>
        <Image src={logo} alt="logo" width={130} height={73} />
      </HeaderLogo>
      </Link>
      
      <Nav>
        <Link href={"#"}>
          <DropdownWrapper>
            <NavItem currentActive={currentPath === "/" || currentPath === "/overview" || currentPath ===  "/upload-asset" || currentPath ===  "/upload-asset/upload" ? "active" : "default"}>
              Creators
            </NavItem>
            <DropMenuContent>
              <Link href={"/overview"}>
                <SubMenu>Overview</SubMenu>
              </Link>
              <Link href={"/upload-asset"}>
                <SubMenu>Upload</SubMenu>
              </Link>
            </DropMenuContent>
          </DropdownWrapper>
        </Link>

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

      {!isConnected ? (
        <ButtonConnect onClick={openConnectModal}>Connect Wallet</ButtonConnect>
      ) : (
        <ButtonConnect onClick={openAccountModal}>
          {address?.slice(0, 6)}...{address?.slice(address.length - 6)}
        </ButtonConnect>
      )}
    </Wrapper>
  );
};

export default Header;

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
  padding: 12px 24px;
  font-size: 16px;
  color: ${(props) => (props.currentActive === "active" ? "#FED73B" : " #FFF")};
  &:hover {
    background-color: #fed73b;
    color: #000000;
  }
`;

const ButtonConnect = styled.div`
  background-color: #fed73b;
  border-radius: 0.5rem;
  padding: 6px 24px;
  cursor: pointer;
  font-size: 16px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropMenuContent = styled.div`
  display: none;

  position: absolute;
  z-index: 1;
  ${DropdownWrapper}:hover & {
    display: block;
  }
`;

const SubMenu = styled.div`
  padding: 12px 24px;
  width: 126px;
  font-size: 16px;
  background: linear-gradient(0deg, #00062b, #00062b),
    linear-gradient(0deg, #383838, #383838);
  color: #ffffff;
  &:hover {
    background: #fed73b;
    color: #000000;
  }
`;
