"use client";

import Trackercode from '@/components/Trackercode';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { ListRestart, MailPlus } from 'lucide-react';
import TrackingInfo from '@/components/TrackingInfo';
import axios from 'axios';

const Page = () => {
  const { id }: { id: string } = useParams() || "";
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const deleteCookies = async () => {
    try {
      const res = await axios.get("/api/deleteToken")
      if(res.data.success ) router.push("/");
    } catch (error) {
      console.log(error);
    }

  };
  

  return (
    <div className='w-full h-[89vh] flex justify-evenly items-center max-md:flex-col-reverse px-10'>
      <div className='w-1/3 max-xl:w-1/2 max-md:w-full'>
        <TrackingInfo refresh={refresh} />
      </div>
      <div className='flex flex-col justify-center items-center gap-2 max-md:flex-row max-md:flex-wrap'>
        <Trackercode dialogState={true} trackercode={id} />
        <Button className='gap-x-2' onClick={() => setRefresh(!refresh)}>Refresh<ListRestart /></Button>
        <Button className='gap-x-2' onClick={deleteCookies}>Create New<MailPlus /></Button>
      </div>
    </div>
  );
};

export default Page;
