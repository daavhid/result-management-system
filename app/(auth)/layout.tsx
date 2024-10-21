import React from 'react'

import {Nunito_Sans} from 'next/font/google'
import { cn } from '@/lib/utils'
import { MdCheck } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import Image from 'next/image';

const nunito = Nunito_Sans({
    subsets:['latin'],
    weight:['700','400','200','300','500']
})

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='bg-school bg-center  bg-cover  h-screen gap-3 relative 
    after:absolute after:-z-10 z-10  after:opacity- after:bg-gradient-to-r after:from-tone7 after:to-tone6/50 after:w-full after:h-full after:top-0 after:left-0'>
        <Image src={'/lautech.png'} alt='logo' width={400} height={400} className='absolute -z-10 bottom-0'/>
        <h1 className={cn('text-white  text-center text-4xl font-semibold z-50 absolute top-10 left-[50%] w-full -translate-x-[50%]',nunito.className)}>RESULT MANAGEMENT SYSTEM</h1>
        <div className='flex md:flex-row flex-col items-center md:justify-around justify-evenly h-full z-30 '>
            <div className={cn('text-black hidden md:block',nunito.className)}>
                {/* <h1 className={cn('text-white  text-3xl font-bold z-50',nunito.className)}>RESULT MANAGEMENT SYSTEM</h1> */}
                <div className='flex gap-3 py-6 items-center'><IoMdCheckboxOutline className='text-4xl font-bold text-tone5'/><span className='text-3xl font-light'>Result Upload</span></div>
                <div className='flex gap-3 py-6 items-center'><IoMdCheckboxOutline className='text-4xl font-bold text-tone5'/><span className='text-3xl font-light'>Result procesing</span></div>
                <div className='flex gap-3 py-6 items-center'><IoMdCheckboxOutline className='text-4xl font-bold text-tone5'/><span className='text-3xl font-light'>Result Download</span></div>
                <div className='flex gap-3 py-6 items-center'><IoMdCheckboxOutline className='text-4xl font-bold text-tone5'/><span className='text-3xl font-light'>CGPA calculation</span></div>

            </div>

            {children}
        </div>
    </div>
  )
}

export default layout