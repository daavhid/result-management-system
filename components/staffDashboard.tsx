'use client'
import React from 'react'
import { PiNotepadFill ,PiStudentBold,PiBuildings } from "react-icons/pi";
import { MdOutlineManageSearch } from "react-icons/md";

import { TbBuildingCommunity } from "react-icons/tb";
import { FaPeopleLine } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";



import { Card, CardFooter, CardHeader } from './ui/card';
import Link from 'next/link';

const data = [
    {
        icon:FaCirclePlus,
        text:'Add Result',
        path:'add-results'
    },
    {
        icon:MdOutlineManageSearch,
        text:'View Results',
        path:'view-results'
    },
]

const StaffDashboard = () => {
  return (
    <div className='grid grid-cols-3 w-[850px] mx-auto ml-20 gap-4 text-white '>
        {data.map((item, index)=>{
            return(
                <Card key={index} className=''>
                    <CardHeader>
                        <item.icon size={40} className='text-tone6 mx-auto text-center'/>
                    </CardHeader>
                    <CardFooter className='bg-tone6 text-white text-center p-0'>
                        <Link href={`/${item.path}`} className='mx-auto text-xl w-full p-4'>{item.text}</Link>
                    </CardFooter>
                </Card>
                
            )
        })}
    </div>
  )
}

export default StaffDashboard