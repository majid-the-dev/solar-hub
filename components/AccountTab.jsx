"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AccountTab = () => {

    const path = usePathname();

  return (
    <div className='bg-white'>
        <div className='mx-auto w-full max-w-7xl flex items-center gap-10 px-5 md:px-10'>
            <Link href={'/account'} className={`${path === "/account" ? "text-darkGreen font-semibold border-b-2 border-darkGreen" : "text-gray-500 font-normal"} text-xs hover:text-darkGreen hover:font-semibold hover:border-b-2 hover:border-darkGreen py-5`}>Profile</Link>
            <Link href={'/account/orders'} className={`${path === "/account/orders" ? "text-darkGreen font-semibold border-b-2 border-darkGreen" : "text-gray-500 font-normal"} text-xs hover:text-darkGreen hover:font-semibold hover:border-b-2 hover:border-darkGreen py-5`}>Orders</Link>
            <Link href={'/account/change-password'} className={`${path === "/account/change-password" ? "text-darkGreen font-semibold border-b-2 border-darkGreen" : "text-gray-500 font-normal"} text-xs hover:text-darkGreen hover:font-semibold hover:border-b-2 hover:border-darkGreen py-5`}>Settings</Link>
        </div>
    </div>
  )
}

export default AccountTab