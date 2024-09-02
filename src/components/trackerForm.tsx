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
import { useRouter } from 'next/navigation';
import { useTrackingCode } from '@/tools/ContextProvider';

const FormSchema = z.object({
  Email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

const TrackerForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const {setDailogData } = useTrackingCode()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Email: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/createTraking", { email: data.Email })
      console.log(res.data);
      setLoading(false);
      router.push(`/tracking/${res.data.data.id}`);
      setDailogData(true);
      
      // Handle the response
      console.log('Submission successful:');
    } catch (error) {
      setLoading(false);
      // Handle any errors that occur during the async operation
      console.error('Submission failed:', error);
    }
  };
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 max-xl:w-1/2 max-md:w-full space-y-6">
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
                In this input field please enter your email address that you want to track.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='gap-x-2'>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : <>Create Tracker <Radar /></>}

        </Button>
      </form>
    </Form>
  )
}

export default TrackerForm
