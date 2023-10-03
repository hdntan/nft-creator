
'use client'
import Link from 'next/link'
import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;


const Sidebar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    
    <aside className=" top-0 left-0 z-40 w-64 h-[1000px] transition-transform -translate-x-full sm:translate-x-0  dark:bg-gray-800">
      <div className='"h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
        <ul className='space-y-2 font-medium'>
        <li>
            <Link href="/profileLayout/userProfile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <span className="ml-3">Profile</span>
            </Link>
         </li>
         <li>
            <Link href="/profileLayout/myNft" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              
               <span className="ml-3">My Nft</span>
            </Link>
         </li>
         <li>
            <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               
               <span className="ml-3">Setting</span>
            </Link>
         </li>
        </ul>

      </div>
    
  </aside>
  )
}

export default Sidebar