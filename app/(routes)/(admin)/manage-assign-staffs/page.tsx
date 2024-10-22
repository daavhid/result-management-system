
import ManageAssignedStaff from '@/components/staffs/manageDeptCourse'
import ManageStaff from '@/components/staffs/manageStaff'
import { serverRole } from '@/lib/utils'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const role = await serverRole()
    if(role !=='ADMIN') {
        redirect('/dashboard')
    }
  return (
    <div className='py-16'>
        <div className='m-8 mb-1 flex justify-end pt-10'>
           
        </div>
        <ManageAssignedStaff/>
        
    </div>
  )
}

export default page