'use client'
import React, { useState } from 'react'
import AdminSideBar from './sidebars/admin'
import StaffSideBar from './sidebars/staff'
import StudentSideBar from './sidebars/student'
import Image from 'next/image'
import {Outfit} from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'



const SideBar = ({user}:{user:string}) => {
    const [selected,setSelected] = useState('/dashboard')
  return (
    <div className='px-8 relative'>
        
        {user === 'SUPERADMIN'&&<AdminSideBar selected={selected} setSelected={setSelected}/>}
        {user === 'ADMIN'&&<AdminSideBar selected={selected} setSelected={setSelected}/>}
        {user === 'STAFF'&&<StaffSideBar selected={selected} setSelected={setSelected}/>}
        {user === 'STUDENT'&&<StudentSideBar selected={selected} setSelected={setSelected}/>}
        <div>
        <Button  className='flex  w-full bg-transparent hover:bg-transparent text-white border mt-4 border-white z-30 text-xl font-light py-6 '>  
            {user}
        </Button>
        </div>
    </div>
  )
}

export default SideBar