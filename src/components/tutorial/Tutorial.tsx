import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

interface TutorialSliderProps{
  title:string,
  image:{
    src:string,
    alt:string
  },
  description:string
}

const tutorialSlider = [
  {title:"CREATE TRACKER",image:{src:"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/phfeci28g7089fu1urqf.jpg",alt:"how to create tracker"},description:"Enter the email 📧 address you want to create and click 👆 on Create Tracker  button"},
  {title:"CODE CODE",image:{src:"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1xy3s5lec210qvdizh28.jpg",alt:"code code"},description:"Select that code and copy it"},
  {title:"ADDING CODE ",image:{src:"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iqb5d8l4vdsvnmh464qz.jpg",alt:"ADDING CODE"},description:"Add that code in your mail anywhere"},
  {title:"WAITING FOR MAIL OPENING",image:{src:"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fv2ld444ligqnmzh4x0g.jpg",alt:"WAITING FOR MAIL OPENING"},description:"when mail receiver user open the mail then over code is start running. NOTE:Please don't open send box mail it will also count the open"},
  {title:"CHECKING MAIL OPENING TIME",image:{src:"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q7yatrgocty5xsj9vwae.jpg",alt:"CHECKING MAIL OPENING TIME"},description:"refresh the page if mail receiver user opened that mail it will show in left side log box. it will show all the date and time of mail openings"},
]

const Tutorial = () => {
  return (
    <Carousel id='#tutorial' className="w-1/3 h-max max-xl:w-1/2 max-md:w-8/12">
      <CarouselContent >
        {tutorialSlider.map((tutorial:TutorialSliderProps, index:number) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="p-2 flex justify-center items-center flex-col h-full text-center">
                  <h3 className="text-xl font-semibold py-2 px-1">STEP {index + 1}: {tutorial.title} </h3>
                  <div className='w-full h-auto'>
                    <Image
                      src={tutorial.image.src}
                      alt={tutorial.image.alt}
                      width={400}
                      height={200}
                      className='w-full h-full object-contain rounded-sm'
                    />

                  </div>
                  <div className="text-sm py-2 px-1 flex bg-black text-white dark:bg-white dark:text-black w-full my-2 rounded-sm">
                     {tutorial.description}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default Tutorial
