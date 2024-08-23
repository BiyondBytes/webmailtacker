"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Radar } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { Loader2 } from "lucide-react"

const FormSchema = z.object({
  Email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

const HeroSection = () => {
  const [loading,setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Email: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/createTraking",{email: data.Email})
      console.log(res.data);
      setLoading(false);
      // Handle the response
      console.log('Submission successful:');
    } catch (error) {
      setLoading(false);
      // Handle any errors that occur during the async operation
      console.error('Submission failed:', error);
    }
  };

  return (
    <div className='hero-container relative
     w-full border h-[89vh] flex justify-evenly px-24 items-center '>
      <h1 className="text-5xl font-bold absolute top-6 left-0 right-0 mx-auto w-max">WELCOME TO Webmail Tracker</h1>
      {/* bg image */}
      <Image
        src='/bg.png'
        alt='hero'
        width={800}
        height={300}
        // style={{"transform":"scaleX(-1)"}}
        className='w-1/3 h-auto transform -scale-x-100 transition-transform duration-300 ease-in-out hover:scale-x-100 cursor-pointer'
      />
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Please Enter Your Email" {...field} />
                </FormControl>
                <FormDescription>
                  In this input field please enter your email address to track your mail.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='gap-x-2'>
            {loading? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</>:<>Create Tracker <Radar /></>}
            
            </Button>
        </form>
      </Form>
    </div>
  )
}

export default HeroSection









