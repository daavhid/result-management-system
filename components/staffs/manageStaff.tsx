'use client'
import React, { useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn } from '@/lib/utils'
import { getStaffs } from '@/actions/general'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from '../ui/button'


const ManageStaff = () => {
    const [results,setResults] = useState<any[]>([])
    useEffect(()=>{
        const fetch = async()=>{

            const staffs = await getStaffs()
            setResults(staffs)
        }
        fetch()
    },[])
  return (
    <div className='border border-tone6 m-8 mt-0 bg-white rounded-xl'>
        <p className='px-8 py-4 border-b text-xl text-gray-600 font-semibold'>Staffs</p>
        <ScrollArea className='max-h-[20rem]'>
            <Table className=' mx-auto relative uppercase z-20 '>
                <TableHeader >
                    <TableRow className=''>
                        <TableHead className="w-[90px] font-medium uppercase text-center text-xs">S/N</TableHead>
                        <TableHead className=" uppercase text-sm">Title</TableHead>
                        <TableHead className='uppercase  text-sm'>First Name</TableHead>
                        <TableHead className=' uppercase text-left text-sm'>Last Name</TableHead>
                        <TableHead className=' uppercase  text-sm'>Email</TableHead>
                        <TableHead className=' uppercase  text-sm'>Department</TableHead>
                        <TableHead className=' uppercase  text-sm'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results?.map((data:any, index:number) => (
                        <TableRow className={cn(index%2===1&&'bg-blue-50  hover:bg-blue-50')} key={index}>

                            <TableCell className='text-center'>{index+1}</TableCell>
                            <TableCell className='uppercase font-medium'>{data?.title}</TableCell>
                            <TableCell className='uppercase font-medium'>{data?.firstName}</TableCell>
                            <TableCell className='uppercase font-medium'>{data?.lastName}</TableCell>
                            <TableCell className=' font-medium'>{data?.email}</TableCell>
                            <TableCell className='uppercase font-medium'>{data?.departments?.name}</TableCell>
                            <TableCell className='uppercase font-medium'>
                                <Button className='bg-tone5 hover:bg-tone5 uppercase'>update</Button>
                            </TableCell>
                            {/* <TableCell className='capitalize'>{data?.exam}</TableCell> */}
                        
                        </TableRow>
                    ))}
                    {/* <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
            <ScrollBar orientation='horizontal'/>
        </ScrollArea>
    </div>
  )
}

export default ManageStaff