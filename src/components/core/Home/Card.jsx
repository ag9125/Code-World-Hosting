import React from 'react'

export default function Card({course,currCard}) {
  return (
    <div className={`${currCard===course.heading ?'shadow-yellow-5 bg-white shadow-[15px_15px_0px]':'bg-richblack-800  shadow-white text-white'}
     translate-y-10  flex flex-col text-start gap-5 p-4`}>
        <div>
            {course.heading}
        </div>
        <div>
            {course.description}
        </div>
        <div className='border-dashed  border-pure-greys-500 border-[1px]'></div>
        <div className='flex justify-between'>
            <div>
                {course.level}
            </div>
            <div>
                {course.lessionNumber}
            </div>
        </div>
    </div>
  )
}
