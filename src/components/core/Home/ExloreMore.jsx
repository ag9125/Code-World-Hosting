import React, { useState } from 'react'
import HighlightText from './HighlightText'
import Card from './Card'
import {HomePageExplore} from '../../../data/homepage-explore'
export default function ExloreMore() {
    const Tabs = ['Free','New to Coding','Most popular','Skills paths','Career paths']
    const [content,setContent] = useState(HomePageExplore[0].courses)
    const [currTab,setTab] = useState(Tabs[0]);
    const [currCard,setcurrCard] = useState(HomePageExplore[0].courses[0].heading)
    function clickhandler(tab,i){
        setTab(tab);
        setContent(HomePageExplore[i].courses)
        setcurrCard(HomePageExplore[i].courses[0].heading)


    }
    function handleCard(heading)
    {
        setcurrCard(heading)
    }
  return (
 <div className='flex flex-col items-center'>
         <div className="heading   mt-8  text-center text-4xl font-semibold text-white w-11/12">
               Unlock the 
               <HighlightText text="Power of Code"/>
               
              </div>
           <div className="subHeading text-richblack-200 w-[80%] text-center mt-2 text-lg font-semibold ">
            Learn to Build Anything You Can Imagine
              </div>
           
          <div className='opacity-0 lg:opacity-100 lg:mt-16 rounded-full bg-richblack-800 p-1 text-richblack-200 font-bold  w-fit border-b-[1px] shadow-sm shadow-richblack-600 flex gap-2'>
                {
                    Tabs.map((tab,index)=>(
                <button key={index} onClick={()=>clickhandler(tab,index)}>
                  <div className={`flex items-center px-5 py-[5px] transition-all
               hover:bg-richblack-900 rounded-full ${currTab==tab&&'bg-richblack-900'} `}>
                {tab}
                
               </div>
               </button>
                    ))
                }  
              </div>

              {/* tabs */}
              <div className="tagS  flex flex-col lg:flex-row gap-8 mt-7 w-2/3 ">
                {
                    content.map((course,i)=>(
                       <button key={i} onClick={()=>handleCard(course.heading)}>
                         <Card  course={course} currCard={currCard} />
                       </button>
                    ))
                }

              </div>
    </div>
  )
}
