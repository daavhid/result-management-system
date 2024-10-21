'use client'
import React from 'react'

import UserImage from './userImage'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { logout } from '@/actions/logout'
import { FaCaretDown, FaMessage } from "react-icons/fa6";
import { MdNotifications, MdOutlineMail, MdOutlineNotifications,MdOutlineMessage } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";

import { MdExitToApp } from "react-icons/md";

const Nav = ({user}:{user:any}) => {
    
  return (
    
    <div className='flex px-6  w-[1050px] justify-between items-center '>
        {/* <div className='flex gap-1 '>
        <div className='flex flex-col items-center '>
            <span className='font-bold capitalize'>{user?.name}</span>
            <span className='text-sm capitalize text-muted-foreground '>{user?.role.toLowerCase()}</span>
        </div>
        <div className='h'>
                <DropDown/>
            </div>
        </div> */}
        <div className='flex gap-2 items-center'>
            <UserImage user={user} />
            <span className=' capitalize'>welcome, {user?.name}</span>
        </div>

        <div className='flex gap-4'>
            <div className='text-white text-xl w-fit relative after:border-white after:border after:absolute after:right-0.5 after:rounded-full after:bg-[#FF6A55] after:z-20 -z-10 after:h-3 after:w-3 after:-top-0.5 '>
                <BiMessageAltDetail size={30} className='text-white z-10 relative '/>
            </div>
            <div className='text-white text-xl w-fit relative after:border-white after:border after:absolute after:right-0.5 after:rounded-full after:bg-[#FF6A55] after:z-20 -z-10 after:h-3 after:w-3 after:-top-0.5 '>
                <MdOutlineNotifications  size={30} className='text-white z-10 relative text-xl'/>
            </div>
        </div>
        

    </div>
  )
}

const DropDown = ()=>{
    const onClick = () => {
        logout()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='outline-none text-muted-foreground'><FaCaretDown/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onClick} className='flex justify-between'><span>Log out </span><MdExitToApp/></DropdownMenuItem>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Nav