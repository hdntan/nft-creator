
"use client"
import ItemNft from '@/components/ItemNft';
import Navbar from '@/components/Navbar';

import Image from 'next/image';
import { Carousel, Card } from 'antd';

import { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useGlobalContext } from './context/store';


interface ItemNftProps {
  title: string
  descriptions: string;
  price:number;
  imageUrl:string;
}


export default function Home() {

  const {userId, setUserId, data, setData} = useGlobalContext();

  useEffect(() => {
    setUserId('ID1');
  })
  const items = [
    {
      title: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    },
    {
      title: 'Product 2',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    },
    {
      title: 'Product 3',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    }, {
      title: 'Product 4',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    }, {
      title: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    }, {
      title: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
      imageUrl: 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg',
    },
    // Add more products here
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const nextSlide = () => {
    if (currentSlide < items.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  
  return (
 <div className='  mt-10 h-[1000px]'>


  <div className='bg-blue-300'>
  <strong className='text-xl mx-24 '>Top Collector Buys Today {userId}</strong>
    <Carousel 
     dots={true}
     arrows
     
    className='h-[350px] mx-20' slidesToShow={4}  >
      {items.map((product, index) => (
        <div key={index} className=''>
          <Card
          className='m-4'
            hoverable
            style={{ width: 300 }}
            cover={<img alt={product.title} src={product.imageUrl} />}
          >
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span>${product.price}</span>
            
          </Card>
        </div>
      ))}
    </Carousel>

     
  </div>
 
  <div className="relative w-full mt-5 bg-slate-400">
      <div className="relative overflow-hidden ">
        <Carousel
        slidesToShow={4}
          afterChange={(current) => setCurrentSlide(current)}
          dots={false}
          draggable
          infinite
          initialSlide={currentSlide}
        >
          {items.map((product, index) => (
             <div key={index} className=''>
            <ItemNft title={product.title} descriptions={product.description} price={product.price} imageUrl={product.imageUrl}/>
           </div>
          ))}
        </Carousel>
      </div>
      <div className= 'w-100% absolute top-1/2 left-0 flex justify-around'>
              <button className='text-white  border-2 p-5 bg-blue-600'  onClick={prevSlide}>haha</button>
             
             
      </div>
      <div className= 'w-100% absolute top-1/2 right-0 flex justify-around'>
              <button className='text-white  border-2 p-5 bg-blue-600' onClick={nextSlide}>haha</button>
              

             
      </div>
      
    </div>

     
  </div>


  )
}
