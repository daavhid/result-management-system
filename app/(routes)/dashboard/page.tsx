
import React from 'react'
import {auth, signOut} from '@/auth'
import useRole from '@/hooks/useRole'
import { logout } from '@/actions/logout'
import Dashboard from '@/components/Dashboard'
import { serverRole } from '@/lib/utils'

const dashboardPage =async () => {
    const onClick = () => {
        logout()
    }
    const role = await serverRole()
  return (
    <div className='py-16'>
        <div className='m-8 mb-1 flex '>
               <Dashboard user={role}/>
        </div>
        
        
    </div>
  )
}

export default dashboardPage