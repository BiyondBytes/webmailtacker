"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import TrackerForm from './trackerForm'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const HeroSection = () => {
  const router = useRouter()

  useEffect(() => {
    const checkToken = async ()=>{
      try {
        const res = await axios.get("/api/isTokenExist")
        if(res.data.data.isExist){
          router.push(`/tracking/${res.data.data.id}`)
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    checkToken()
  }, []);


  return (
    <div className='hero-container relative
     w-full border h-[89vh] flex justify-evenly px-24 max-md:px-6 items-center '>
      <h1 className="text-5xl max-xl:text-[5vw] font-bold text-center  absolute top-6 max-md:top-28 left-0 right-0 mx-auto w-max">
        WELCOME TO Webmail Tracker
      </h1>

      {/* bg image */}
      <Image
        src='/bg.png'
        alt='hero'
        width={800}
        height={300}
        // style={{"transform":"scaleX(-1)"}}
        className='w-1/3 h-auto transform -scale-x-100 transition-transform duration-300 ease-in-out hover:scale-x-100 cursor-pointer max-xl:hidden'
      />
      <TrackerForm />

    </div>
  )
}

export default HeroSection









