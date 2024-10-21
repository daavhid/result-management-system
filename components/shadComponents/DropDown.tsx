'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import React from 'react'
import { FormControl } from "../ui/form"



const DropDown = ({properties}:{properties:any[]}) => {
    
  
  return (
            <SelectContent onCloseAutoFocus={(e)=>e.preventDefault()}>
                {properties?.map((property,index) => (

                <SelectItem  key={index} value={property?.value||property?.semesterCode}>{property?.value?.toUpperCase()|| property?.semesterCode}</SelectItem>
                ))}
            </SelectContent>
  )
}

export default DropDown