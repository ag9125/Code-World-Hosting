import React from 'react'
import {Routes,Route,NavLink,Link} from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
         <div className='header'>
     <nav id='page'>
      <NavLink to='/'> <img id='ig' src='./logo192.png'></img></NavLink>
       
        <ul id='navbar'>
          <NavLink className='link' to='/'>Home</NavLink>
          <NavLink className='link' to='/'>About</NavLink>
             {/*navlink bta deta ha link active ha ya nhi use krte pta krne ke lye ki konsi link active ha */}
          <NavLink className='link' to='/'>Contact</NavLink>
        </ul>
        <ul id='navbar'>
          <NavLink className='link' to='/login'><button className='btn'>Login</button></NavLink>
          <NavLink className='link'to='/signup'><button className='btn'>Signup</button></NavLink>
        
        </ul>
       
      </nav>


     </div>
    </div>
  )
}
