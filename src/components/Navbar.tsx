
"use client"
import React, { useEffect, useState } from 'react';

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

const { Header } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;
const Navbar = () => {

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
    
      <Menu mode='horizontal' className='flex items-center justify-center'>
        
        <Menu.Item   className='bg-transparent'>
          <Link className='text-lg font-bold' href={"/uploadNft"}>Upload</Link>
        </Menu.Item>
        <Menu.Item className='text-lg font-bold'>About</Menu.Item>
       
        {/* <SubMenu key={2} className='text-lg font-bold' title="About">
        <Menu.Item   className=''>
          <Link  href={"/profile"}>Home</Link>
        </Menu.Item>
        <Menu.Item className=''>About</Menu.Item>
        </SubMenu> */}
        
       
      </Menu>
      {/* <Input.Search className='w-[500px] ' size='large' placeholder='Search...' loading={false}></Input.Search> */}
      <div className='border-2 w-1/2 flex items-center rounded-xl  mx-3'>
       <div className='mx-3' >
           <SearchOutlined />
         </div>
         <input className='w-full mr-3 p-2 focus:outline-none' type='search' placeholder='search'></input>
        </div>
     

        <div className='flex gap-8 justify-center items-center mr-10'>
        <Button className='flex items-center justify-center' size='large' shape="round" loading ={false}>
         <ShoppingCartOutlined />
        </Button>

        {
        connect ?  <Button className='bg-blue-400 text-white font-bold' size='large' shape="round" loading ={false}>
        Connect Wallet
      </Button> : (
        <div>
 
    <Dropdown menu={{ items }}   placement="bottomRight" arrow>
      <Button className='text-xl font-bold' size='large'>0x123456</Button>
    </Dropdown>
        </div>
      
  
      )
          

      }

        </div> 

    
     
     

        
   
        
    

    </div>
    // <nav className='w-screen flex mt-5 items-center justify-center gap-8'>
    //   <div className='flex justify-center items-center'>
    //     <img className='w-10 h-10 mx-2' src='https://opensea.io/static/images/logos/opensea-logo.svg'/>
       
    //     <div className='text-xl font-bold border-r-2 pr-2'>
    //       OpenSea
    //     </div>
    //   </div>
     
    //   <ul className='flex justify-center items-center gap-8'>
    //     <li>Drops</li>
    //     <li>Stats</li>
    //   </ul>
    //   <div className='border-2 w-1/2 flex items-center rounded-xl  mx-3'>
    //   <div className='mx-3 pb-1' >
    //       <SearchOutlined />
    //     </div>
    //     <input className='w-full mr-3 p-2 focus:outline-none' type='search' placeholder='search'></input>
    //    </div>
    //   <div>
       
     
        
        
    //     <button className='border-2 px-5 py-2 rounded-l-xl'>Connect Wallet </button>
          
       
    //     <button className='border-2 px-4  py-2 rounded-r-xl'>
    //     <ShoppingCartOutlined  />
    //     </button>
    //   </div>
    //   <div>
    //     <button className='border-2 px-5 py-2 rounded-xl'>
    //     <ShoppingCartOutlined  />
    //     </button>
    //   </div>
     
    // </nav>
  
  );
  
}

export default Navbar