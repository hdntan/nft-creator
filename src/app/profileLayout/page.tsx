'use client'
import Link from 'next/link'
import React from 'react'
import { useAccount } from 'wagmi'

const profile = () => {
  const { address } = useAccount();

  return (
    <div className='flex flex-col'>profile

        <Link href={'/profileLayout/myNft'}>{address}</Link>
        <Link href={'/profileLayout/userProfile'}>user Profile</Link>

    </div>
  )
}

export default profile