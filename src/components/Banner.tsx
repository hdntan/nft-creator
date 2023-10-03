import { ArrowRightOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const Banner = () => {
  return (
    <div className="rounded-xl lg:max-w-[1440px] relative inset-0 md:max-w-[744px] max-w-[375px] mx-auto bg-white  ">
    <div className="relative rounded-xl">
      <img
        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/image%20158.png"
        className=" rounded-xl w-full object-cover lg:h-[330px] lg:block md:hidden hidden"
      />
      
      <div className="absolute lg:bottom-8 md:bottom-3 bottom-0 lg:px-7 md:px-10 px-4 py-4">
        <p className="lg:text-4xl md:text-2xl text-2xl font-semibold leading-9 text-white">
          Mother’s Day Special
        </p>
        <Link href={"/uploadNft"} className='w-[180px] flex text-white font-bold text-xl px-3 py-2 border-2 rounded-lg hover:bg-slate-900 shadow-lg mt-5'>
        
          <div className='mr-2'>Minting now</div>
          <ArrowRightOutlined />
        
        </Link>
       
    
      </div>
    </div>
  </div>
  )
}

export default Banner