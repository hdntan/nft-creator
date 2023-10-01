
"use client"
import React, { useEffect, useState } from 'react';
import {ConnectButton} from '@rainbow-me/rainbowkit'

import {  Button, Dropdown, Image, Input, Layout, Menu, MenuProps, Space, Typography } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SearchOutlined,
  MailOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;
const Navbar = () => {

  const pathname = usePathname()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link  className='pr-20 text-lg mx-3'  href={"/profile"}>Profile</Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link  className='pr-20 text-lg mx-3 bg-transparent'  href={"/profile"}>Home</Link>
      ),
    },
    {
      key: '3',
      label: (
       
        <Link  className='pr-20 text-lg mx-3' href={"/profile"}>Log Out</Link>

       
      ),
    },
  ];
  const handleSearch = (value: any) => {
    // Implement your search logic here
    console.log('Search:', value);
  };

  const [connect, setConnet] = useState(false);
  const [fixed, setFixed] = useState("");
  const [injectedProvider, setInjectedProvider] = useState();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 200) { // Adjust the threshold value as needed
      console.log('User scrolled past 200 pixels');
      setFixed("fixed top-0 z-50")
      // Add your custom logic here
    }
  }
    
  return (
    <div className='w-full border-b-2 flex justify-between p-5 gap-8 shadow-lg'>
      
      <div className='flex justify-center items-center gap-2 ml-10'>
      <Image className='' width={40} src='https://opensea.io/static/images/logos/opensea-logo.svg'/>
      <Link href={"/"} className='text-xl font-bold'>OpenSea</Link>
      </div>
    
    <ul className='flex items-end justify-between font-bold mr-10 text-lg '>
    {
                            pathname ==="/uploadNft" ? 
                            
                            
                            <li className='border-b-2  p-2'>
                                <Link href="/uploadNft">Create</Link>
                            </li>

                            :
                            <li className='hover:border-b-2  p-2'>
                                <Link href="/uploadNft"> Create</Link>
                            </li>
                        }
    </ul>
      {/* <Input.Search className='w-[500px] ' size='large' placeholder='Search...' loading={false}></Input.Search> */}
      <div className='border-2 w-[500px] flex items-center rounded-xl  mx-3'>
       <div className='mx-3' >
           <SearchOutlined />
         </div>
         <input className='w-full mr-3 p-1 focus:outline-none' type='search' placeholder='search'></input>
        </div>
     

        <div className='flex gap-8 justify-center items-center mr-10'>
        

     
        <ConnectButton label='Connect Wallet'/>

     
        <div>
 
    <Dropdown menu={{ items }}   placement="bottomRight" arrow>
    <Button className='flex items-center justify-center' size='large' shape="round" loading ={false}>
         <UserOutlined />
        </Button>
    </Dropdown>
        </div>
      
  
  

        </div> 

    
     
     

        
   
        
    

    </div>
    
  
  );
  
}

export default Navbar