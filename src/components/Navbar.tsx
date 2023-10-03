"use client";
import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  Button,
  Drawer,
  Dropdown,
  Image,
  Input,
  Layout,
  Menu,
  MenuProps,
  Space,
  Typography,
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SearchOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Profile } from "./connectWallet";

const { Header } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const handleSearch = (value: any) => {
    // Implement your search logic here
    console.log("Search:", value);
  };

  // const [connect, setConnet] = useState(false);
  const [fixed, setFixed] = useState("");
  const [injectedProvider, setInjectedProvider] = useState();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      // Adjust the threshold value as needed
      console.log("User scrolled past 200 pixels");
      setFixed("fixed top-0 z-50");
      // Add your custom logic here
    }
  }

  return (
    <div>
      <div className="h-[60px] pl-12 pt-5 lg:hidden ">
        <MenuOutlined
          style={{ fontSize: 30 }}
          onClick={() => {
            setOpenMenu(true);
          }}
        />
      </div>
      <div className="hidden lg:block">
        <MainMenu />
      </div>

      <Drawer
        placement="left"
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
        closable={false}
      >
        <AppMenu isInline />
      </Drawer>
    </div>
  );
};

function AppMenu({ isInline = false }) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  return (
    <Menu
      mode={isInline ? "inline" : "horizontal"}
      style={{ fontSize: 24, border: "none" }}
      items={[
        {
          label: (
            <Link className="pr-20 text-xl mx-3 bg-transparent" href={"/"}>
              Home
            </Link>
          ),
          key: "home",
        },

        {
          label: (
            <Link
              className="pr-20 text-xl mx-3 bg-transparent"
              href={"/profileLayout"}
            >
              Profile
            </Link>
          ),
          key: "profile",
        },
        {
          label: (
            <Link
              className="pr-20 text-xl mx-3 bg-transparent"
              href={"/uploadNft"}
            >
              Create
            </Link>
          ),
          key: "create",
        },
        {
          label: !isConnected ? (
            <ConnectButton />
          ) : (
            <button onClick={() => disconnect()} className="pr-20 text-lg mx-3">
              Log Out
            </button>
          ),
          key: "login",
        },
      ]}
    ></Menu>
  );
}

function MainMenu() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const pathname = usePathname();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link className="pr-20 text-lg mx-3" href={"/profileLayout"}>
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link className="pr-20 text-lg mx-3 bg-transparent" href={"/"}>
          Home
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <button onClick={() => disconnect()} className="pr-20 text-lg mx-3">
          Log Out
        </button>
      ),
    },
  ];

  return (
    <div className="w-full border-b-2 flex justify-between p-5 gap-8 shadow-lg">
      <div className="flex justify-center items-center gap-2 ml-10">
        <Image
          className=""
          width={40}
          src="https://opensea.io/static/images/logos/opensea-logo.svg"
        />
        <Link href={"/"} className="text-xl font-bold">
          OpenSea
        </Link>
      </div>

      <ul className="flex items-end justify-between  mr-10 text-lg ">
        {pathname === "/uploadNft" ? (
          <li className="border-b-2 mx-3  p-2">
            <Link href="/uploadNft">Create</Link>
          </li>
        ) : (
          <li className="hover:border-b-2 mx-3  p-2">
            <Link href="/uploadNft"> Create</Link>
          </li>
        )}

        {pathname === "/exploreNft" ? (
          <li className="border-b-2 mx-3 p-2">
            <Link href={"/exploreNft"}>Explore</Link>
          </li>
        ) : (
          <li className="hover:border-b-2 mx-3  p-2">
            <Link href={"/exploreNft"}> Explore</Link>
          </li>
        )}
      </ul>
      {/* <Input.Search className='w-[500px] ' size='large' placeholder='Search...' loading={false}></Input.Search> */}
      <div className="border-2 w-[500px] flex items-center rounded-xl  mx-3">
        <div className="mx-3">
          <SearchOutlined />
        </div>
        <input
          className="w-full mr-3 p-1 focus:outline-none"
          type="search"
          placeholder="search"
        ></input>
      </div>

      <div className="flex gap-8 justify-center items-center mr-10">
        {/* <Profile/> */}
        {/*  */}
        {/* <ConnectButton/> */}
        {!isConnected ? (
          <ConnectButton />
        ) : (
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Button
              className="flex items-center justify-center"
              size="large"
              shape="round"
              loading={false}
            >
              <UserOutlined />
            </Button>
          </Dropdown>
        )}

        <div></div>
      </div>
    </div>
  );
}

export default Navbar;
