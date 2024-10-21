import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import SideBar from '@/components/sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, serverRole } from '@/lib/utils'
import { Fira_Sans } from 'next/font/google'
import Image from 'next/image'
import React from 'react'


const aleo = Fira_Sans({
    subsets:["latin"],
    weight:['400','700','900']
})


const layout = async({children}:{children:React.ReactNode}) => {
    const role = await serverRole()
  return (
    <div className=' '>
        <div className={cn('flex min-h-screen    ',aleo.className)}>
            <div className='bg-tone6  pb-8 z-[100] fixed left-0 text-white w-[300px] h-screen '>
                <ScrollArea>
                    
                    <div className='flex items-center font-semibold gap-2 py-4 px-7'>
                        <Image src={'/lautech.png'} alt='logo' width={50} height={50}/>
                        <p className={cn(' text-tone7')}>RESULT MANAGEMENT SYSTEM</p>
                    </div>
                    <div className='z-[100] '>
                        <SideBar user={role as string}/>
                    </div>
                </ScrollArea>
        

            </div>
            <div className='flex-1 w-[1000px] min-h-screen ml-[300px] bg-white'>
                <Navbar/>
                {children}
            </div>
        </div>
    </div>
  )
}

export default layout