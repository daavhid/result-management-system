'use server'

import { db } from "@/lib/db"
import { resultSchema } from "@/schemas"
import * as z from 'zod'
import { getSem } from "./general"

interface Iresult{
    courseCode:string,
    semesterCode:string
}

export const result = async(courseCode:string,semesterCode:string)=>{
    console.log(courseCode,'in the server')
    const courses = await db.departmentcourses.findFirst({
        where:{
            courseCode:courseCode
        }
    })
    const results = await db.results.updateMany({
        where:{
            studentCourseReg:{
                departmentCourseId:courses?.id,
                semesters:{
                    semesterCode:semesterCode
                }
            }
        },data:{
            pending:0
        }
    })
    console.log(courses,'from the server')
    await db.departmentcourses.update({
        where:{
            id:courses?.id,
            
        },data:{
            resultsAvailable:1
        }
    })
    
    if(!results){
        return {error:'An error occured'}
    }

    return {message:'Sent successfully'}

}

export const fetchResultStatus = async(semId:number)=>{
    const departmentCourses = await db.departmentcourses.findMany({
        where:{
            semesters:{
                id:semId
            }
        }
    });
    return {data:departmentCourses}
    
}

export const fetchResult = async(courseCode:string,semId:number|undefined)=>{
    const courses = await db.departmentcourses.findFirst({
        where:{
            AND:[
                {
                    courseCode:courseCode

                },
                
            ]
        }
    })
    const data = await db.results.findMany({
        where:{
            AND:[
                {

                    studentCourseReg:{
                        departmentCourseId:courses?.id
                    },
                },
                {
                    studentCourseReg:{
                        semesterId:semId
                        
                    }
                }
            ]
        
            },select:{
                id:true,
                courseRegId:true,
                exam:true,
                ca:true,
                studentCourseReg:{
                    select:{
                        matric_number:true
                    }
                }
        }
    })
    if(!data){
        return []
    }
    return data
}

export const sendResultToStudents = async(semesterId:number)=>{
    await db.results.updateMany({
        where:{
            studentCourseReg:{
                semesterId
            }
        },
        data:{
            isPushed:1
        }
    })
    
    return {message:'successfully sent to students'}
}

export const semesterGpa = async(semesterCode:string)=>{
    const students = await db.students.findMany({
        include:{
            studentCourseReg:{
                include:{
                    results:true
                }
            },

        }
    })
    let totalCredit = 0
    const data = await db.departmentcourses.groupBy({
        by:['semesterCode'],
        _sum:{
            credit:true
        }
    })
    for (let i of data){
        if(i.semesterCode===semesterCode){
            totalCredit = i._sum.credit!!
        }
    }
    const semId = await getSem(semesterCode)

    for(let student of students){
        let totalGradePoint = 0
        for (let result of student.studentCourseReg){
            totalGradePoint+= result.results?.gradePoint!!
        }
        const GPA = await db.gpas.create({
            data:{
                matric_number:student.matric_number,
                totalUnit:totalCredit,
                totalGradePoint:totalGradePoint,
                semesterId:semId?.id,
            }
        })
        console.log("this i the gpa", GPA)
    }

}

// semesterGpa('harmattan-2024/2025')