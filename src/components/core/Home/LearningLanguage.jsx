import React from 'react'
import HighlightText from './HighlightText'
import progress from '../../../assets/Images/Know_your_progress.svg'
import comapre from '../../../assets/Images/Compare_with_others.svg'
import know from '../../../assets/Images/Plan_your_lessons.svg'
import CTAButton from './Button'
export default function LearningLanguage() {
  return (
    <div className='bg-pure-greys-5 w-full'>
        <div className='w-11/12 mx-auto flex flex-col items-center max-w-maxContent '>
             <div className='flex flex-col items-center'>
                <div className="heading   mt-8  text-center text-4xl font-semibold text-black">
                               Your swiss knife for
                               <HighlightText text="learning any language"/>
                               
                              </div>
                
                              <div className="subHeading  w-[80%] text-center mt-4 font-semibold">
                               Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more. 
                              </div>
             </div>
             <div className="photos relative flex flex-col items-center lg:flex-row  ">
               
                    <img src={progress} alt=""
                    className='object-contain lg:-mr-32' />
               
                    <img src={comapre} alt=""
                    className='object-contain ' />
               
                    <img src={know} alt=""
                    className='object-contain lg:-ml-36' />
               
             </div>
             <div className='mt-4 mb-20'>
             <CTAButton  linkto='/signUp' active='true'>Learn More</CTAButton>

             </div>
        </div>
        
    </div>
  )
}
