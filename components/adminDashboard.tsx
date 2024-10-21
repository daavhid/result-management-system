'use client'
import React from 'react'
import { PiNotepadFill ,PiStudentBold,PiBuildings } from "react-icons/pi";
import { MdOutlineManageSearch } from "react-icons/md";

import { TbBuildingCommunity } from "react-icons/tb";
import { FaPeopleLine } from "react-icons/fa6";


import { Card, CardFooter, CardHeader } from './ui/card';
import Link from 'next/link';

const data = [
    {
        icon:PiNotepadFill,
        text:'Courses',
        path:'add-courses'
    },
    {
        icon:PiStudentBold,
        text:'Students',
        path:'add-students'
    },
    {
        icon:PiBuildings ,
        text:'Departments',
        path:'add-departments'
    },
    {
        icon:TbBuildingCommunity,
        text:'Faculty',
        path:'add-faculties'
    },
    {
        icon:FaPeopleLine,
        text:'Staffs',
        path:'add-staffs'
    },
    {
        icon:PiNotepadFill,
        text:'Semesters/Session',
        path:'add-semesters'
    },
    {
        icon:MdOutlineManageSearch,
        text:'Results',
        path:'preview-results'
    },
    {
        icon:PiNotepadFill,
        text:'Assign Staff',
        path:'add-department-courses'
    },
]

const AdminDashboard = () => {
  return (
    <div className='grid grid-cols-3 w-[850px] mx-auto ml-20 gap-4 text-white '>
        {data.map((item, index)=>{
            return(
                <Card className=''>
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

export default AdminDashboard