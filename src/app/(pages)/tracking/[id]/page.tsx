"use client"
import Trackercode from '@/components/Trackercode'
import React from 'react'
import { useParams } from 'next/navigation';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ListRestart } from 'lucide-react';
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
const page = () => {
  const { id }: { id: string } = useParams() || ""

  return (
    <div className='w-full h-[89vh] flex justify-evenly items-center max-md:flex-col-reverse px-10'>
      <div className=' w-1/3 max-xl:w-1/2 max-md:w-full'>
        <ScrollArea className="h-72 w-full rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Opening time logs.........</h4>
            {tags.map((tag, index) => (
              <React.Fragment key={index}>
                <div className="text-sm">
                  {tag}
                </div>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className='flex flex-col justify-center items-center gap-y-1'>
        <Trackercode dialogState={true} trackercode={id} />
        <Button className='gap-x-2'>Refresh Logs <ListRestart /></Button>
      </div>
    </div>
  )
}

export default page
