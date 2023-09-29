

import { Card } from 'antd'
import React from 'react'
interface ItemNftProps {
    title: string
    descriptions: string;
    price:number;
    imageUrl:string;
}
// interface CardProductProps {
//   product: ItemNftProps;
// }

const ItemNft: React.FC<ItemNftProps> = (product ) => {
  return (
   
       <Card
            hoverable
            style={{ width: 300 }}
            cover={<img alt={product.title} src={product.imageUrl} />}
          >
            <h3>{product.title}</h3>
            <p>product.description</p>
            <span>$product.price</span>
            
          </Card>
 
   
    // <div className='w-[247px] h-[280px] border-2 rounded-xl shadow-lg'>
    //     <img className='object-fill h-40 rounded-t-lg' src='https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg'/>
    //     <div className='pt-5 flex flex-col justify-center items-center'> 
    //         <strong>NFT#1</strong>
    //         <div className='flex mt-4 '>
    //             <div className='flex flex-col'>
    //                 <label>Floor</label>
    //                 <label>Item 1</label>

    //             </div>
    //             <div className='flex flex-col'>
    //                 <label>Total Value</label>
    //                 <label>Item 1</label>

    //             </div>
    //         </div>
    //     </div>
    // </div>
  )
}

export default ItemNft