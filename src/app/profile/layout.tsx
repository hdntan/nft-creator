import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import React from 'react'

export default function layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className='flex flex-col'>
      <div className='flex flex-row h-[1000px] '>
      <Sidebar />
      {children}
      </div>
               
                <Footer/>
        </section>
  }