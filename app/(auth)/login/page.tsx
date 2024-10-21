'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { roboto } from '../register/page'
import { signInSchema } from '@/schemas'
import * as z from 'zod'
import axios from 'axios'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/actions/login'
import Link from 'next/link'
import { MdEmail, MdOutlineArrowOutward } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { IoKeyOutline } from "react-icons/io5";



const page = () => {

    const router = useRouter()
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    useEffect(()=>{
        setTimeout(()=>{
         setError('')
         setSuccess("")
         
        },3000) 
     },[error,success])

    const form = useForm<z.infer<typeof signInSchema>>({
        defaultValues: {
            email:"",
            password:""
        },
        resolver:zodResolver(signInSchema)
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit =async (values:z.infer<typeof signInSchema>)=>{
       
        try {
            const data = await login(values)
            if(data?.error){
                setError(data.error)
            }
            if(data?.success){
                setSuccess(data.success)
                router.push('dash')
            }
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }finally{
            
        }
        //

    }
    return (
        <div >

                {success &&<p className='bg-green-600 my-5 text-white w-full text-center py-4 px-2'>{success}</p>}
                {error&&<p className='w-full text-center my-6 bg-red-600 py-4 px-2 text-white font-semibold'>{error}</p>}
            <div className=' p-12 w-[350px] z-30 px-8 bg-[#656565]/50 rounded-md'>
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} 
        
                    className='flex flex-col gap-4' >
                        <FormField
                        control={form.control}
                        name='email'
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                <div className='bg-white/50 flex items-center relative '>
                                    <MdEmail className=' w-10 h-10 p-1   absolute left-1 top[50%]'/>
                                    <Input className={cn(roboto.className,'bg-white/50 pl-14 font-[500] w-full h-10 outline-none border-none focus-visible:ring-0 focus-within:ring-white/50  rounded-none py-6 ring-0  focus-visible:ring-offset-0  ')} type='email' placeholder='Email Address' {...field} disabled={isLoading}/>
                                </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            
                        )}/>
                        <FormField
                        control={form.control}
                        name='password'
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                <div className='bg-white/50 flex items-center relative'>
                                    <IoKeyOutline   className='w-10 h-10 p-1   absolute left-1 top[50%]'/>
                                    <Input className={cn(roboto.className,' bg-white/50 pl-14 font-[500] w-full h-10 outline-none border-none focus-visible:ring-0 focus-within:ring-white/50  rounded-none py-6 ring-0  focus-visible:ring-offset-0  ')} type='password' placeholder='Password' {...field} disabled={isLoading}/>
                                </div>   
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <div>

                            <Button type='submit' variant={'auth'} className=' mb-1 w-full py-6 rounded-none bg-tone5 z-40 text-white text-xl' disabled={isLoading}>LOGIN</Button>
                            <Link href={'/reset'} className='text-sm flex justify-center items-center  my-2'><span className='cursor-pointer hover:text-sky-400 text-gray-300'> Forgot password?</span></Link>
                            <Link href={'/register'} className='text-gray-300 text-center text-sm flex justify-center items-center'>Don&apos;t have an account? &nbsp;<span className='underline text-tone5  cursor-pointer'>Register</span></Link>
                        </div>

        
                    </form>
            </Form>
            </div>
        </div>
      )
}


export default page