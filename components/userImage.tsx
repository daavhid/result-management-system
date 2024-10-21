import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUser } from '@/hooks/useCurrentUser'


const UserImage = ({user}:{user:any}) => {
    
  return (
    <div>
        <Avatar>
            <AvatarImage src={user?.image as string} />
            <AvatarFallback className='bg-red-800 text-white'>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    </div>
  )
}

export default UserImage