'use client'
import React, { useEffect, useState } from 'react'
import { BookAIcon, ChevronRight, LucideIcon } from 'lucide-react'
import { MdBook, MdExitToApp, MdLibraryBooks, MdPeople, MdPerson3, MdSchool } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { HiHome } from "react-icons/hi2";



import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Colapse } from './collapsible';
import Link from 'next/link';
import { Button } from '../ui/button';
import { logout } from '@/actions/logout';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const AdminData=[
    {
        data:['/add-courses','/manage-courses']
    },
    {
        data:['/add-students','/manage-students']
    },
    {
        data:['/add-staffs','/manage-staffs','/assign-staffs','/manage-assign-staffs']
    },
    {
        data:['/add-sessions','/add-semesters','/manage-sessions','/manage-semesters']
    },
]



const AdminSideBar = ({selected,setSelected}:{selected:string,setSelected:any}) => {
    const [data,setData] = useState<any[]>([])
    const page = usePathname()
    useEffect(()=>{
        if(page==='/dashboard'){
            setSelected(page)
            setData([])
            
        }
        if(page==='/preview-result'){
            setSelected(page)
            setData(['/preview-result'])
            
        }
        for(let sidedata of AdminData){

            if(sidedata.data.includes(page)){
                console.log('this is true ', sidedata.data)
                setData(sidedata.data)
                setSelected(page)
        
            }
        }
    },[page,selected,setSelected])
    // const [selected,setSelected] = useState('dashboard')
    console.log(page,'this is the pathName')
    const click = async () => {
        await logout()
    }
   
  return (
    <div className='mt-8'>

            <div className='flex flex-col space-y-1 pb-6  font-normal  text-white border-b border-b-white'>
                <Link onClick={()=>{
                    setData([])
                    setSelected('/dashboard')

                }} href={`/dashboard`} className={cn('flex   relative   hover:bg-tone7 items-center p-3 rounded-md font-light gap-4 z-30',selected==='/dashboard'?'bg-tone7 after:absolute after:w-3 after:h-full after:-z-10 after:bg-tone7 after:rounded-r-lg after:rounded-l-none  after:-left-6':'bg-transparent')}> 
                <HiHome/>
                    <span>Home</span>
                </Link>
                {data?.map((pathName,index)=>(
                    <Link  key={index} href={`${pathName}`} className={cn('flex relative  hover:bg-tone7  items-center p-3 rounded-md font-light gap-4 z-30',selected===pathName?'bg-tone7  after:absolute after:w-3 after:h-full after:z-[560] after:bg-tone7 after:rounded-r-lg after:rounded-l-none  after:-left-6':'bg-transparent')}> 
                        <IoPersonCircle/>
                        <span className='capitalize'>{pathName.slice(1,).replaceAll('-',' ')}</span>
                    </Link>
                ))}
                <Link href={`/dashboard`} className='flex relative hover:bg-tone7 items-center rounded-md p-3 font-light gap-4  z-30'> 
                <IoPersonCircle/>
                    <span>Profile</span>
                </Link>
                
                <Button onClick={()=>{
                    click()
                }} className='flex hover:bg-tone7 w-full bg-transparent justify-start items-center  font-light py-6 gap-4 mb-4 z-30'> 
                    <MdExitToApp/>
                    <span>Logout</span>
                </Button>
            </div>
        
    </div>
  )
}

export default AdminSideBar
