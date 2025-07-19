import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
import {TypeAnimation} from 'react-type-animation'

export default function CodeSection({
    position,heading,subheading,codeBlock,ctabtn1,ctabtn2,gradientC,codeC
}) {
  return (
    <div className={`flex flex-col w-full  justify-between ${position} gap-4`}>
    <div className='md:w-1/2'>
        <div className='text-white text-3xl font-semibold'>
            {heading}
           
        </div>
        <div className='font-semibold text-richblack-200 mt-4'>
            {subheading}
        </div>

              <div className="buttons flex mt-8 gap-6">
                <CTAButton  linkto='/signUp' active='true'>
                <div className='flex items-center gap-1 '>
                    {ctabtn1}
                    <FaArrowRight/>
                </div>
                </CTAButton>
                <CTAButton linkto='/login' active={false} >Learn More</CTAButton>
              </div>
    </div>
    <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
    {gradientC}
        <div className='w-[10%] text-center flex flex-col text-richblack-400 font-bold font-inter'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            
        </div>
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeC} `}>
            <TypeAnimation
            sequence={[codeBlock,10000,""]}
            repeat={Infinity}
            cursor={true}
            style={
                {
                    whiteSpace:'pre-line',
                    display:'block'
                }
            }

            />
        </div>
    </div>
    </div>
  )
}
