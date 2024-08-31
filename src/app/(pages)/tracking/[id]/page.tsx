"use client"
import Trackercode from '@/components/Trackercode'
import React, { useState } from 'react'
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { ListRestart } from 'lucide-react';
import TrackingInfo from '@/components/TrackingInfo';

const page = () => {
  const { id }: { id: string } = useParams() || ""
  const [refresh,SetRefresh] = useState(false)


  return (
    <div className='w-full h-[89vh] flex justify-evenly items-center max-md:flex-col-reverse px-10'>
      <div className=' w-1/3 max-xl:w-1/2 max-md:w-full'>
        <TrackingInfo  refresh={refresh}/>
      </div>
      <div className='flex flex-col justify-center items-center gap-y-1'>
        <Trackercode dialogState={true} trackercode={id} />
        <Button className='gap-x-2' onClick={()=>SetRefresh(!refresh)}>Refresh<ListRestart /></Button>
      </div>
    </div>
  )
}

export default page
