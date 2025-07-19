import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/Home/HighlightText';
import CTAButton from '../components/core/Home/Button';
import banner from '../assets/Images/banner.mp4'
import CodeSection from '../components/core/Home/CodeSection';
import bghome from '../assets/Images/bghome.svg'
import TimelineSection from '../components/core/Home/TimelineSection';
import LearningLanguage from '../components/core/Home/LearningLanguage';
import Footer from '../components/common/Footer';
import instructor from '../assets/Images/Instructor.png'
import ExloreMore from '../components/core/Home/ExloreMore';
import Navbar from '../components/common/Navbar';
import { TypeAnimation } from 'react-type-animation';
export default function Home() {
                 
  const subh = 'With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.'
  return (
    <div className='relative'>
        {/* Section 1 */}

         <div className='relative mx-auto w-11/12 flex flex-col items-center justify-between  max-w-maxContent  '>
           
              <Link to='/signUp' > 
              <div className='group mt-16 rounded-full bg-richblack-800 p-1 text-richblack-200 font-bold transition-all
              hover:scale-95 w-fit border-b-[1px] shadow-sm shadow-richblack-600'>
               <div className='flex items-center gap-2 px-10 py-[5px] transition-all
                group-hover:bg-richblack-900 rounded-full'>
                <p className=' '>Become an Instructor</p>
                <FaArrowRight size='12px'/>
               </div>
              </div>
              <div>

              </div>
              </Link>  
              <div className="heading   mt-8  text-center text-4xl font-semibold text-white">
               Empower Your Future with 
               <HighlightText text="Coding Skills"/>
               
              </div>

              <div className="subHeading text-richblack-200 w-[80%] text-center mt-4">
                <TypeAnimation
                  sequence={[subh, 1000, ""]}
                  repeat={Infinity}
                />
              </div>

              <div className="buttons flex mt-8 gap-6">
                <CTAButton  linkto='/signUp' active='true'>Learn More</CTAButton>
                <CTAButton linkto='/login' active={false} >Book a Demo</CTAButton>
              </div>
               <div className='w-[80%] relative mt-12 bg-white '>
               <div className="video relative bottom-3 right-3  shadow-[0_-8px_15px_0_rgba(56,189,248,0.6)] ">
                <video autoPlay muted loop >
                    <source src={banner}/>
                </video>
              </div>
               </div>

               {/* code section 1 */}
               <div className='w-[85%] mt-14'>
                <CodeSection heading={
                    <>
                    Unlock your {<HighlightText text='coding potential'/>} with our online courses.
                    </>
                    } subheading='Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.' 
                    ctabtn1='Try it Yourself'
                    position='lg:flex-row'
                    codeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}

                    gradientC={<div className="codeblock1 absolute"></div>}
                    codeC='text-yellow-100'
                    />
               </div>
               <div className='w-[90%] mt-14'>
                <CodeSection heading={
                    <>
                    Start {<HighlightText text='coding in seconds'/>}.
                    </>
                    } subheading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
               position='lg:flex-row-reverse'
               ctabtn1='Continue Lesson'
                gradientC={<div className="codeblock2 absolute"></div>}
                codeC='text-blue-5'
            codeBlock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            
               />
               </div>
              
          
         </div>
        {/* Section 2 */}
 <div className='mt-20   flex flex-col items-center justify-between  max-w-maxContent'>

         <ExloreMore/>

              <div className='bg-pure-greys-5  w-full'>
                <div className='bg_home  h-[333px]  '>
                  <div className='w-11/12 flex  mx-auto max-w-maxContent pt-40 justify-center'>
                 <div className="buttons flex  gap-6">
                <CTAButton  linkto='/signUp' active='true'>
                
                <div className='flex items-center gap-1 text-sm'>
                  Exlpore Full Catalog
                 <FaArrowRight size='12px'/>
                </div>
                </CTAButton>
                <CTAButton linkto='/login' active={false} >Book a Demo</CTAButton>
              </div>
                  </div>

                </div>

                <div className='w-11/12 flex flex-col mt-14 mx-auto justify-between items-center'>

                <div className=' flex flex-col md:flex-row gap-5 '>
                  <div className="heading   text-center text-4xl font-semibold text-black">
               Get the skills you need for a
               <HighlightText text="job that is in demand."/>
               
              </div>
                    <div className='flex flex-col items-start gap-7'>
                      <div className='font-semibold text-richblack-200'>
                      The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.

                      </div>
                      <div className='max-w-maxContent'>
                        <CTAButton active={true} linkto='/login' >Learn More</CTAButton>
                      </div>
                      
                    </div>
                </div>

                <div className="timeLine w-full mt-32 ">
                 <TimelineSection/>
                </div>
               
                </div>
              </div>





          


        </div>

        {/* Section 3 */}
        <LearningLanguage/>
        
        <div className='w-11/12 mx-auto mt-16 flex mb-20 flex-col md:flex-row gap-10 items-center'>
            <div className='w-2/3 lg:w-fit shadow-white shadow-[-10px_-10px_0_5px]'>
                    <img src={instructor} alt="" />
            </div>
            <div className='md:w-[50%] '>
                <div className="heading   mt-8   text-4xl font-semibold text-white">
               Become an
               <HighlightText text="Instructor"/>
               
              </div>
                 <div className="subHeading text-richblack-200 w-[80%]  mt-4 font-bold">
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
              </div>

             <div className='w-fit mt-10'>
               <CTAButton active={true} linkto='/signUp'>
                <div className='flex items-center gap-2  '>
                  Start Teaching Today
                  <FaArrowRight/>
                </div>
              </CTAButton>
             </div>
            </div>

            <div className="review">

            </div>
            

        </div>
        {/* Footer  */}

       
         <Footer/>
      
   
    </div>
  )
}
