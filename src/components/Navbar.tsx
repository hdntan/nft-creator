"use client";
import React, { useEffect, useState } from "react";

import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";

import { Button, Drawer, Dropdown, Image, Menu, MenuProps } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  // const [connect, setConnet] = useState(false);
  const [fixed, setFixed] = useState("");
  const [injectedProvider, setInjectedProvider] = useState();

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

  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
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
              href={"/profile"}
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
            <button onClick={openConnectModal} className="pr-20 text-xl mx-3">
              Connect
            </button>
          ) : (
            <button onClick={() => disconnect()} className="pr-20 text-xl mx-3">
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
  const [show, setshow] = useState(false);
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();

  const pathname = usePathname();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link className="pr-20 text-lg mx-3" href={"/profile"}>
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
    <div className="shadow-lg ">
      <nav className="2xl:container 2xl:mx-auto sm:py-6 sm:px-7 py-5 px-4">
        {/* For large and Medium-sized Screen */}
        <div className="flex justify-between ">
          <div className="hidden sm:flex flex-row items-center space-x-6">
            <div className="flex justify-center items-center gap-2 ml-10">
              <Image
                className=""
                width={40}
                src="https://opensea.io/static/images/logos/opensea-logo.svg"
              />
              <Link href={"/"} className="text-xl font-bold">
                <h1 className=" font-normal text-2xl leading-6 text-gray-800">
                  MARKETPLACE NFT
                </h1>
              </Link>
            </div>
          </div>
          {/* <div className=" flex space-x-3 items-center">
            
          </div> */}
          <div className="hidden sm:flex flex-row space-x-4">
            <div>
              <ul className="flex items-end justify-between  text-lg ">
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
            </div>
            {!isConnected ? (
              <ConnectButton/>
            //    <button
            //    className="rounded-md flex space-x-2 w-full h-10  text-sm leading-3 text-white bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-600 hover:bg-indigo-600 duration-150 justify-center items-center px-3 font-bold"
            //    onClick={openConnectModal}
            //  >
            //    Connect Wallet
            //  </button>
              
            ) : (
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <UserOutlined className="border-2 px-3 py-2 rounded-full" />
            </Dropdown>
            )}
          </div>
          {/* Burger Icon */}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
