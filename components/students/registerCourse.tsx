'use client'

import {useReactToPrint} from 'react-to-print'

import React, { useEffect, useState,useRef } from 'react'
import TableElement from '../shadComponents/TableElement'
import axios from 'axios'
import { Button } from '../ui/button'
import { getStudent, registerCourses } from '@/actions/student'
import { getSemester } from '@/actions/general'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    
  } from "@/components/ui/select"
import DropDown from '../shadComponents/DropDown'


const RegisterCourse = ({user}:{user:any}) => {
    const printRef = useRef<any>(null)
    const [department,setDepartment] = useState('')
    const [student,setStudent] = useState<any>(null)
    const [semester,setSemester] = useState<any[]>([])
    const [semesterCode,setSemesterCode] = useState('')
    const [courses,setCourses] = useState<any[]>([])

    const handlePrint = useReactToPrint({
        contentRef:printRef
    })
    useEffect(()=> {
        const fetch = async()=>{
            const semesters = await getSemester()
            if(semesters){
                setSemester(semesters)
            }
            if(user){

                const data = await registerCourses(user?.email,semesterCode)
                const student = await getStudent(user?.email)
                setCourses(data)
                setStudent(student)
            }
            // const data = await axios.get(`/api/students?email=${user?.email}`)
            // setStudent(data.data.student)
            // setDepartment(data.data?.student?.departments?.departmentCode)
            // setLevel(data.data?.student?.level)
            // if(department && level){
                
            //     const coursesdata = await axios.get(`/api/departmentCourses?department=${department}`)
            //     setCourses(prev=>coursesdata.data?.departmentalCourses)
            //     setSemester(coursesdata.data?.departmentalCourses[0]?.semesters?.id)
                
            // }
            
        }
        fetch()
        
    },[user,semesterCode])
    
    console.log(semester,'new objet')
  return (
    <div>
        <Select onValueChange={(e)=>setSemesterCode(e)}>
                                       
            <SelectTrigger className='mr-20 w-52 ring-0 border-t-0 border-x-0 border-b-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-b-gray-300 ml-auto'> 
                <SelectValue onClick={(e)=>{console.log(e)}} placeholder="select semester" />
            </SelectTrigger>
        
            <DropDown properties={semester}  />
        </Select>
        {<TableElement datas={courses} student={student} semesterId={semesterCode}/>}
        {/* <Button onClick={handlePrint}>print</Button> */}
        
    </div>
  )
}

export default RegisterCourse