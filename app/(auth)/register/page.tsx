'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
import { Roboto,Montserrat, Mochiy_Pop_One, Nunito_Sans } from 'next/font/google'
import axios, { AxiosError } from "axios"
import {MdVpnKey, MdPerson,MdEmail, MdOutlineArrowOutward} from 'react-icons/md'
import { IoKeyOutline } from "react-icons/io5";

import { RiLockPasswordFill } from "react-icons/ri";




import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PassThrough } from 'stream'
import { useRouter } from 'next/navigation'
import { registerSchema } from '@/schemas'
import Link from 'next/link'

 export const roboto = Nunito_Sans({
    weight:['500','600'],
    subsets:['latin']
})

const Page = () => {
    const router = useRouter()
    const [pending,setPending] = useState(false)
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')

    useEffect(()=>{
        setTimeout(()=>{
         setError('')
        },3000) 
     },[error,success])

    const form = useForm<z.infer<typeof registerSchema>>({
        defaultValues: {
            username:'',
            email:"",
            password:"",
            key:''
        },
        resolver:zodResolver(registerSchema)
    })

    // const errmsg = form.formState.errors
   
         let isLoading = form.formState.isSubmitting 
         if(form.formState.isSubmitSuccessful && success){
            isLoading  = true
         }

    const onSubmit =async (values:z.infer<typeof registerSchema>)=>{

        const user = {
            username:values.username,
            email:values.email,
            password:values.password,
        }
        try {
            const res = await axios.post('/api/register',user)
            console.log(res)
            if(res.status === 201){
               setSuccess(res.data.message)
                // router.push('/login')
            }else{
                console.log(res.data.message)
                setError(res.data.message)
            }

            
        } catch (error:any) {
            
            setError(error?.response.data.message)
        }
        //

    }
  return (
    <div>

        {error&&<p className='w-full text-center my-6 bg-red-600 py-4 px-2 text-white font-semibold'>{error}</p>}
        {success &&<p className='bg-green-600 my-5 text-white w-full text-center py-4 px-2'>{success}</p>}
        <div className=' p-12 w-[350px] z-30 px-8 bg-[#656565]/50 rounded-md'>
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 

                className=' flex flex-col gap-3' >
                    <FormField
                    control={form.control}
                    name='username'
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <div className='bg-white/50 flex items-center relative'>
                                    <MdPerson className='  w-10 h-10 p-1   absolute left-1 top[50%]'/>
                                    <Input className={cn(roboto.className,' bg-white/50 pl-14 font-[500] w-full h-10 outline-none border-none focus-visible:ring-0 focus-within:ring-white/50  rounded-none py-6 ring-0  focus-visible:ring-offset-0  ')} placeholder='Username' {...field} disabled={isLoading}/>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <FormField
                    control={form.control}
                    name='email'
                    render={({field})=>(
                        <FormItem>
                            
                            <FormControl>
                                <div className='bg-white/50 flex items-center relative'>
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
                                <div className='bg-white/50 flex items-center relative '>
                                    <IoKeyOutline   className='w-10 h-10 p-1   absolute left-1 top[50%]'/>
                                    <Input className={cn(roboto.className,' bg-white/50 pl-14 font-[500] w-full h-10 outline-none border-none focus-visible:ring-0 focus-within:ring-white/50  rounded-none py-6 ring-0  focus-visible:ring-offset-0  ')} type='password' placeholder='Password' {...field} disabled={isLoading}/>
                                </div>                        
                            </FormControl>
                            
                            <FormMessage/>
                            
                        </FormItem>
                    )}/>
                    <FormField
                    control={form.control}
                    name='key'
                    render={({field})=>(
                        <FormItem>
                            
                            <FormControl>
                                <div className='bg-white/50 flex items-center relative'>
                                    <MdVpnKey className='w-10 h-10 p-1   absolute left-1 top[50%]'/>
                                    <Input className={cn(roboto.className,' bg-white/50 pl-14 font-[500] w-full h-10 outline-none border-none focus-visible:ring-0 focus-within:ring-white/50  rounded-none py-6 ring-0  focus-visible:ring-offset-0  ')} type='password' placeholder='Secret Key' {...field} disabled={isLoading}/>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                    <div>

                        <Button type='submit' variant={'auth'} className='  w-full  py-6 rounded-none  z-40 text-white text-xl' disabled={isLoading}>REGISTER</Button>
                        <Link href={'/login'} className='text-gray-200 text-center text-sm flex justify-center items-center'>Already have an account? &nbsp;<span className='underline text-sky-400 '>Log In </span></Link>
                    </div>

                </form>
        </Form>
        </div>
    </div>
  )
}

export default Page