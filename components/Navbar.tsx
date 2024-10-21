

import { cn, CurrentUser } from '@/lib/utils'
import { Aleo, Duru_Sans, Fira_Sans, Inter, Kumbh_Sans, Nunito, Nunito_Sans, Open_Sans, Outfit, Sancreek, Sansita } from 'next/font/google'
import Image from 'next/image'
import React, { useEffect } from 'react'



import { FaCaretDown, FaMessage } from "react-icons/fa6";
import { MdNotifications, MdOutlineMail, MdOutlineNotifications,MdOutlineMessage } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";


import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'

import { useNavigation } from 'react-day-picker'
import Nav from './nav';




const outlook = Outfit({
    subsets:['latin']
})

const aleo = Fira_Sans({
    subsets:["latin"],
    weight:['400','700','900']
})


const Navbar = async () => {
    
    const user = await CurrentUser()
  return (
    <div className={cn('shadow-xl py-3 bg-[#CAAD71] px-2 z-[50]  left-[300px] w-full  fixed  items-center text-white',aleo.className)}>
        <Nav user={user}/>
    </div>
  )
}

export default Navbar