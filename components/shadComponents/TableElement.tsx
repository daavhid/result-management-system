'use client'
import React, { useEffect, useRef, useState } from 'react'
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

  import { Checkbox } from "@/components/ui/checkbox"
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getCurrentSemester, getSem } from '@/actions/general'
import { useReactToPrint } from 'react-to-print'
import Image from 'next/image'
import { checkCourseRegisterStatus } from '@/actions/student'


  interface Itable{
    datas:any,
    student:any,
    semesterId:any

  }

const TableElement = ({datas,student,semesterId}:Itable) => {
    const PrintRef = useRef(null)
    const [checkedCourse,setCheckedCourse] = useState<number[]>([])
    const [totalUnit,setTotalUnit]  = useState(0)
    const [registered,setRegistered] = useState(false)
    const [sem,setSem] = useState<any>()
    console.log(checkedCourse,'thi iid the ciur ')

    useEffect(()=>{
        const fetch= async () => {
            if(semesterId){
                // setRegistered(false)
                // setTotalUnit(0)
                const data = await checkCourseRegisterStatus(student?.matric_number,semesterId)
                // const data = await axios.get(`/api/studentCourseReg?matric_number=${student?.matric_number}&semesterId=${semesterId}`)
                const semester = await getSem(semesterId)
                setSem(semester)
                if(data===true){
                    setRegistered(true)
                    setTotalUnit(0)
                    datas?.map((data:any)=>{
                        return setTotalUnit(prev=> prev+data?.credit)
                    })
                }else{
                    setRegistered(false)
                    setTotalUnit(0)
                }
            }
        }
        fetch()
    },[semesterId,student,datas])

    const handlePrint = useReactToPrint({
        contentRef:PrintRef
    })

    const handleSubmit = async()=>{
        const sem =await getSem(semesterId)
        const values = {
            matric_number:student?.matric_number,
            semesterId:sem?.id,
            departmentCourses:checkedCourse
        }
        console.log(values,'this is the val in tabelm')
        if(checkedCourse){
            try {
                const result = await axios.post('/api/studentCourseReg',values)
                console.log(result)
                if(result.status === 201){
                    setRegistered(true)
                    toast.success(`${result.data?.message}`)
                }
            } catch (error:any) {
                console.log(error)
                toast.error(`${error?.response?.data?.error}`)
            }
        }
    }
  return (
    <div>

        <div ref={PrintRef} className='relative  print:overflow-hidden print:h-screen'>
            <div className='absolute top-28 left-1/2 -translate-x-[50%] opacity-10 hidden print:block '>
                <Image src={'/lautech.png'} width={300} height={300} alt='logo'/>
            </div>
            <div className='w-5/6 uppercase mx-auto flex  justify-between my-8'>
                <div>

                    <p>name :{student?.firstName}{' '} {student?.lastName}</p>
                    <p>matric number : {student?.matric_number}</p>
                </div>
                <div>
                    <p> {sem?.name} semester</p>
                    <p>{sem?.sessionCode} session</p>
                </div>
            </div>
            <h1 className='text-center text-xl underline my-3'>Course Form</h1>

            <Table className='w-5/6 mx-auto'>
                <TableCaption >{!registered?'click checkbox to register course':'print course form'}</TableCaption>
                <TableHeader >
                    <TableRow>
                        <TableHead className="w-[90px]"></TableHead>
                        <TableHead className="w-[180px]">Course code</TableHead>
                        <TableHead>Course Title</TableHead>
                        <TableHead className='w-[180px] text-center'>Unit</TableHead>
                    
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {datas?.map((data:any, index:number) => (
                        <TableRow className={cn(index%2===0&&'bg-blue-100 hover:bg-blue-100')} key={index}>

                            <TableCell>
                                {!registered&&<Checkbox disabled={registered} value={data?.id} onCheckedChange={(checked)=>{
                                if(checked){
                                    setCheckedCourse(prev=>[...prev,data.id]) 
                                    setTotalUnit(prev=>prev+data.credit)
                                }else{
                                    setCheckedCourse(checkedCourse.filter((value)=>value !== data.id))
                                    setTotalUnit(prev=>prev-data.credit)
                                }
                                
                            }}/>}
                            </TableCell>
                            <TableCell>{data?.courses?.courseCode.replace('-',' ').toUpperCase()}</TableCell>
                            <TableCell className='capitalize'>{data?.courses?.title}</TableCell>
                            <TableCell className='pl-4 text-center'>{data?.credit}</TableCell>
                        </TableRow>
                    ))}
                    {/* <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                    </TableRow> */}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TableCell colSpan={3} className="font-bold uppercase text-center">Total Unit</TableCell>
                    <TableCell className="font-bold uppercase text-center">{totalUnit}</TableCell>
                </TableRow>
            </TableFooter>
            
            </Table>

        </div>
            {registered?<Button type='submit' onClick={()=>handlePrint()} variant={'auth'} className={cn(datas.length<1&&'hidden',' ml-[6rem] mr-auto rounded-md mt-6   bg-purple-600 z-40 text-white' )}>Print</Button>:<Button type='submit' variant={'auth'} className={cn(datas.length<1&&'hidden',' ml-[6rem] mr-auto rounded-md mt-6 py-2  bg-sky-600 z-40 text-white text-xl')} onClick={handleSubmit}>Register</Button>}
    </div>
  )
}

export default TableElement