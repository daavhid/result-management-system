'use client'
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { toast } from 'react-toastify'

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
import axios from 'axios'
import { ScrollArea } from '../ui/scroll-area'
import { fetchResult } from '@/actions/sendResult'
import { Button } from '../ui/button'


const ViewResult = ({className,course,semId,refresh}:{className?:string,course:string,semId?:number,refresh?:boolean})=>{
    
    
    const [results,setResults] = useState<any[]>([])
    console.log(course,semId,'this is the couse and sem in view result')
    
    useEffect(()=>{
        const fetch = async()=>{
            if(course!==''){

                const result = await fetchResult(course,semId)
                setResults(result)
            }
            console.log(course,'this is inside the useEffe')
            
            
        }
        fetch()
    },[course,refresh,semId])
    console.log(results,'thi in the if block of view result')
    

    
    return(
        <div className={cn(className,' relative  bg-white rounded-xl shadow-xl ')}>
                <ScrollArea className={cn('w-fit relative bg-white rounded-xl ')}> 
                    <p className='text-center font-semibold uppercase  py-6'>{course?.replace('-',' ')}</p>
                    <Table className=' mx-auto'>
                        <TableCaption >{results.length} results</TableCaption>
                        <TableHeader >
                            <TableRow>
                                <TableHead className="w-[90px] font-medium uppercase text-center text-xs">S/N</TableHead>
                                <TableHead className=" uppercase text-xs">Matric number</TableHead>
                                <TableHead className=' w-[90px] text-center text-sm'>C.A</TableHead>
                                <TableHead className='w-[90px] uppercase  text-sm'>Exam</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results && results?.map((data:any, index:number) => (
                                <TableRow className={cn(index%2===1&&'bg-blue-50 hover:bg-blue-50')} key={index}>

                                    <TableCell className='text-center'>{index+1}</TableCell>
                                    <TableCell className='text-center'>{data?.studentCourseReg?.matric_number}</TableCell>
                                    <TableCell className='text-center'>{data.ca}</TableCell>
                                    <TableCell className='capitalize text-center'>{data?.exam}</TableCell>
                                
                                </TableRow>
                            ))}
                            {/* <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                            </TableRow> */}
                        </TableBody>
                        <TableFooter>
                            <TableRow >
                        
                            </TableRow>
                        </TableFooter>
                
                </Table>
            </ScrollArea>
            {/* <Button type='submit' variant={'auth'} className='   rounded-md    bg-purple-600 z-40 text-white absolute bottom-2 left-2' >Print</Button>    */}
        </div>
        
    )
}

export default ViewResult