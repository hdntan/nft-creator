

import { Carousel } from 'antd'
import React from 'react'

const Profile = () => {
  return (
    <div className='mt-10 flex justify-center items-center w-100%'>
      {/* <div className='border-2  mx-20 h-[150px] shadow-xl'> */}
      <Carousel style={{ width: '100%' }} autoplay>
      <div className='object-cover h-[200px] w-max'>
        <img src="https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg" alt="Banner 1" />
      </div>
     
    </Carousel>
        {/* <div className='w-28 h-28 rounded-full border-2 mt-20 bg-blue-500'></div>
      </div> */}
    </div>
  )
}

export default Profile