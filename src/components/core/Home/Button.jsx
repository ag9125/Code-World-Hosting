import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({children,active,linkto}) {
  return (
    <Link to={linkto}>
    <div className={`text-sm  text-center px-6 py-3 rounded-md font-bold
      ${active ? "bg-yellow-50 text-black" :"bg-richblack-800 text-white shadow-sm shadow-richblack-400"} 
      transition-all hover:scale-95 `}>
        {children}
    </div>
    </Link>
  )
}
