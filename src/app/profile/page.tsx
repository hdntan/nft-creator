'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { fetchBalance } from '@wagmi/core'
import {watchAccount} from "wagmi/actions"

const profile = () => {
  const { address } = useAccount();
 const [balanceOf, setBalanceOf] = useState(0);

    
//     })
const getEllipsisTxt = (str, n = 6) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

async function getBalance() {

      const promise =await   fetchBalance({
    address: address,
    formatUnits: 'ether',
  }).then(res =>{
   setBalanceOf(res.formatted);
    })

   


}



  useEffect(()=> {
    // getBalance();
//   watchAccount(() => getBalance());

  },[])

  return (
    <div className="flex " >
        <div className="xl:w-10/12 w-full px-8">
            
            <div className="xl:px-24">
          
                <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
                    <div className="w-80">
                        <div className="flex items-center">
                            <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">Personal Information</h1>
                        </div>
                        <p className="mt-4 text-sm leading-5 text-gray-600">Information about the section could go here and a brief description of how this might be used.</p>
                    </div>
                    <div>
                        <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                            <div className="md:w-64">
                                <label className="text-sm leading-none text-gray-800" id="firstName" >Address</label>
                                
                                
                      
                                <input type="name" className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="firstName" placeholder={getEllipsisTxt(address)} />
                            </div>
                            <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                                <label className="text-sm leading-none text-gray-800" id="lastName">Balance</label>
                                <input type="name"  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="lastName" placeholder='' />
                            </div>
                        </div>
                        <div className="md:flex items-center lg:ml-24 mt-8">
                            <div className="md:w-64">
                                <label className="text-sm leading-none text-gray-800" id="emailAddress">Email address</label>
                                <input type="email"  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="emailAddress" placeholder="youremail@example.com" />
                            </div>
                            <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                                <label className="text-sm leading-none text-gray-800" id="phone" >Phone number</label>
                                <input type="name"  className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800" aria-labelledby="phone" placeholder="123-1234567" />
                            </div>
                        </div>
                    </div>
                </div>
             
            </div>
        </div>
    </div>
  )
}

export default profile