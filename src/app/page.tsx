import HeroSection from "@/components/HeroSection";
import Tutorial from "@/components/tutorial/Tutorial";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection/>
      <section className='w-full h-full flex justify-center items-center flex-col gap-y-4 py-8'>
        <h2 className="text-5xl max-xl:text-[5vw] font-bold text-center ">How to Add a Tracking Code to Your Emails</h2>
        <Tutorial/>
      </section>
      <section className='w-full h-full flex justify-center items-center flex-col gap-y-4 py-8'>
        <h2 className="text-5xl max-xl:text-[5vw] font-bold text-center ">What is Email Tracking and How Does It Work?</h2>
        <Tutorial/>
      </section>
    </main>
  );
}
