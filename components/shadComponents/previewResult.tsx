'use client'
import React, { useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    
  } from "@/components/ui/select"
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
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import { fetchResultStatus, semesterGpa, sendResultToStudents } from '@/actions/sendResult'
import { Button } from '../ui/button'
import ViewResult from '../staffs/viewResults'
import { toast } from 'react-toastify'
import { getCurrentSemester, getSem, getSemester  } from '@/actions/general'
const PreviewResultTable = () => {
    const [results,setResults] = useState<any[]>([])
    const [course,setCourse] = useState('')
    const [availableResult,setAvailableResult] = useState(0)
    const [pendingResult,setPendingResult] = useState(0)
    const [semester,setSemester] = useState<any[]>([])
    const [semId,setSemId] = useState(0)

    useEffect(() => {
        const fetch = async()=>{

            const semesters = await getSemester()
            if(semesters){
                setSemester(semesters)
            }
            const coursesdata = await fetchResultStatus(semId)
            
            setResults(coursesdata?.data)
            setAvailableResult(0)
            setPendingResult(0)
            for(let i of coursesdata?.data) {
                console.log(i,'in the effe')
                if(i.resultsAvailable){
                    setAvailableResult(prev=>prev+1)

                }else{
                    setPendingResult(prev=>prev+1)
                }

            }
        }
        fetch()
    },[semId])

    const sendResult = async()=>{
        try {
            const sem = await getCurrentSemester(semId)
            await semesterGpa(sem?.semesterCode!!)
            // const semester = await getCurrentSemester()
            console.log(semester,'this is the sem')
            const resultData = await sendResultToStudents(semId)
            
            console.log(resultData,'this is from the client')
            if(resultData.message){
                toast.success(`${resultData?.message}`)
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }
  return (
    <div className='grid grid-cols-2 w-5/6 mx-auto pt-6  space-x-4'>
        <div className='w-full '>
            <div className=' bg-white border-2 border-tone6 flex justify-between gap-2 text-black p-4 mb-4 rounded-lg shadow-md'>
                <div className=''>

                    <p className='font-medium text-tone4'>Total Courses  {results.length}</p>
                    <p className='font-medium text-tone4'>Available Results  {availableResult} </p>
                    <p className='font-medium text-tone4'>Pending Resullts  {pendingResult}</p>
                    {results.length!==0&&results.every(result=>{
                        if(result.resultsAvailable){
                            return true
                        }
                    })&&<Button className='mt-1 bg-tone7 text-sm cursor-pointer' onClick={()=>{sendResult()}}>push to students</Button>}
                </div>
                <Select onValueChange={(e)=>{
                    setSemId(eval(e))
                }} >
                                
                    <SelectTrigger className='w-[13rem]'>
                        <SelectValue onClick={(e)=>{console.log(e)}} placeholder="select semester" />
                    </SelectTrigger>
                    
                    <SelectContent >
                        {semester?.map((sem,index) => (
                            <div key={index}>
                                <SelectItem   value={sem.id}>{sem.semesterCode.replace('-',' ')}</SelectItem>
                            </div>
                        ))}
                        
                    </SelectContent>
                </Select>

            </div>
            <ScrollArea className=' border-2 border-tone6  h-[380px]   rounded-xl shadow-lg'> 
                <Table className=' bg-white'>
                <TableCaption >Preview results</TableCaption>
                <TableHeader >
                    <TableRow>
                        <TableHead className="w-[40px] text-sm text-center uppercase">S/N</TableHead>
                        <TableHead className=" text-sm text-center uppercase">course code</TableHead>
                        <TableHead className="text-sm text-center uppercase">course title</TableHead>
                        <TableHead className='uppercase text-sm text-center'>status </TableHead>
                        {/* <TableHead className='w-[90px]'>Exam</TableHead> */}
                    
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results?.map((data:any, index:number) => (
                        <TableRow className={cn(index%2===1&&'bg-blue-50 hover:bg-blue-50','p-2 text-sm cursor-pointer')} key={index} onClick={()=>{
                            setCourse(data.courseCode)
                        }}>

                            <TableCell className='text-sm font-medium text-center'>{index+1}</TableCell>
                            <TableCell className='text-center font-medium  text-sm'>{data?.courseCode.replace('-',' ').toUpperCase()}</TableCell>
                            <TableCell className='capitalize text-sm font-medium'>{data?.courses?.title}</TableCell>
                            <TableCell >
                                <Button type='submit' className={cn(data?.resultsAvailable?'bg-tone5 text-sm hover:bg-tone5':'bg-red-800 hover:bg-red-800','text-white text-sm p-2 font-semibold capitalize w-fit  ')}>
                                    {data?.resultsAvailable?'RECEIVED':'PENDING'}
                                </Button>
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
                <TableFooter>
                    <TableRow >
                    
                    </TableRow>
                </TableFooter>
            
            </Table>
                {/* <ScrollBar color='red' className='w-[20px] text-tone2'/> */}
                    
                </ScrollArea>
        </div>
                <ViewResult className={'h-full border-2 border-tone6 w-fit'} course={course} semId={semId}/>
    </div>
        
  )
}

export default PreviewResultTable