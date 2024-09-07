import HeroSection from "@/components/HeroSection";
import Tutorial from "@/components/tutorial/Tutorial";
import { Blocks } from "lucide-react";
import Image from "next/image";



export default function Home() {
  return (
    <main >
      <HeroSection />
      <section className='w-full  flex justify-center items-center flex-col gap-y-6 py-8'>
        <h2 className="text-5xl max-xl:text-[5vw] font-bold text-center ">How to Add a Tracking Code to Your Emails</h2>
        <Tutorial />
      </section>

      {/* What is Email Tracking and How Does It Work? */}

      <section className='text-center'>
        <h2 className="text-5xl max-xl:text-[5vw] font-bold text-center">
          What is Email Tracking and How Does It Work?
        </h2>
        <div className="w-full h-max flex justify-center items-center flex-wrap">
          <div className="relative w-full max-w-md h-auto mb-8">
            <Image
              src='/main-bg.png'
              alt='How Does It Work'
              width={800}
              height={300}
              className="rounded-xl dark:invert  w-full h-auto object-contain"
            />
            <Image
              src='/main-text.png'
              alt='How Does It Work'
              width={800}
              height={300}
              className="absolute top-0 left-0 rounded-xl w-full h-auto object-contain"
            />
          </div>
          <p className="w-full max-w-lg max-md:p-4">
            Email tracking is a process by which you can track the opening and clicking of emails. This tool works on a simple method. You are provided a code, you have to add that code in your mail. That code contains an image tag with a server link. Whenever the mail is opened, the image tag calls the server, it gets a 1*1 pixel image from there and saves it in the database on the server.
          </p>
        </div>
      </section>

      {/* Benefits of Using an Email Tracker for Your Business */}

      <section className='w-full h-full flex justify-center items-center flex-col gap-y-4 py-8'>
        <h2 className="text-3xl max-xl:text-[5vw] font-bold text-center ">Benefits of Using an Email Tracker for Your Business</h2>
        <div className="w-full h-max flex justify-center items-center flex-wrap">
          <p className="max-w-lg max-md:p-4 text-center">
            If you have a business, then this tool can help you a lot. With the help of this tool, you can find out at what time your users are opening the email, so that you can send your mail at that time and increase your email opening rate. With this, you can also increase the engagement of your mail. And you can reduce the cost of mailing by sending mail only to those users who open the mails.
          </p>
          <Image
            src='/grow-bus.png'
            alt='Benefits of Using an Email Tracker'
            width={800}
            height={300}
            className="rounded-xl invert  w-full h-auto object-contain max-w-md"
          />
        </div>
      </section>
      {/* Comparing Email Tracking Tools: Why Choose [Your Website Name]? */}

      <section className='w-full h-full flex justify-center items-center flex-col gap-y-4 py-8'>
        <h2 className="text-3xl max-xl:text-[5vw] font-bold text-center ">Comparing Email Tracking Tools: Why Choose mailtracker.biyondbytes.com?</h2>
        <div className="w-full h-max flex justify-center items-center flex-wrap">
          <Blocks
            width={800}
            height={300}
            className="rounded-xl dark:text-white w-full max-w-md h-auto object-contain"
          />
          <p className="max-w-lg max-md:p-4 text-center">
            This mail tracking website is different from all other websites, in all other websites you have to add extensions and you have to give permission of your Gmail to those extensions and it is very difficult to use them. But here the tool neither takes permission of Gmail from you nor does it get any extension added to the browser, you can use it <strong>without any Chrome extension</strong> its simple work <strong>online with tracking code</strong>. And this  <strong>website is free and easy to use</strong>.
          </p>
        </div>
      </section>
      
    </main>
  );
}
