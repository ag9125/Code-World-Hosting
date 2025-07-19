import React, { startTransition, useEffect, useState } from 'react'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation,matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/CodeWorld.jpg'
// import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { apiConnector } from '../../Services/apiCall'
import { categories } from '../../Services/apis'
// import PhoneDropdown from '../core/Auth/PhoneDropdown'
export default function Navbar() {
  const {token} = useSelector((state)=>state.auth)
  console.log("Token is :",token)
  const {cart} = useSelector((state)=>state.cart)
  const {user} = useSelector((state)=>state.profile)
  const [subLinks,setsublinks] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      setsublinks(response.data.Categories);
      console.log(response.data.Categories);
    } catch (error) {
      console.log("Category not fetched", error.message);
    }
  };

  fetchCategories();
}, []);

  const location = useLocation()
  function matchRoute(route){
    return matchPath({path:route,end:true},location.pathname); 
  }

  return (
    <div className='h-14 border-b-[1px] border-b-richblack-50 flex justify-center items-center'>
        <div className='w-11/12 h-full flex items-center justify-around '>
            <Link to='/'>
              <img src={logo} alt="" width='190px' />
            </Link>
            <nav>
              <ul className='flex gap-x-6 '>
                {
                  NavbarLinks.map((link,i)=>(
                    <li className='' key={i}>
                      {
                        link.title==='Catalog'?(
   <div className="relative group text-richblack-25 cursor-pointer">
  <div className="flex items-center gap-x-1 ">
    
    <span className='invisible absolute md:relative md:visible'>Catalog</span>
    <IoIosArrowDropdownCircle />
     <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {
                        (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                        .map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
  </div>


</div>
):(
                      <Link to={link.path} className={`opacity-0 absolute md:relative md:opacity-100   ${matchRoute(link.path)?'text-yellow-200':'text-richblack-25'}`}>
                      {link.title}
                      </Link>
                        )
                      }

                    </li>
                  ))
                }
              </ul>
            </nav>

            <div className=''>
                  {
                    token?(<div className='flex items-center gap-x-10 ' >
                          {
                            user&&user.role==='Student'&&(
                              <Link to='/dashboard/cart' className='text-white text-2xl relative opacity-0 md:opacity-100 ' >
                            <AiOutlineShoppingCart/>
                            {
                              cart.length>0&&(
                                <div className=' absolute -top-1 rounded-full h-[15px] w-[15px]  items-center flex justify-center text-[8px] font-bold text-black bg-white
                                animate-bounce'>
                                  {cart.length}
                                  
                                  </div>
                              )
                            }
                              </Link>
                            )
                          }
                          {    
                          <>
                              <ProfileDropdown/>
                             
                              </>
                          }
                    </div>):(
                      <div className='text-white flex items-center gap-x-4 '>
                        <Link to='/login' className='py-2 px-3 border-[0.1px] border-richblack-500 bg-richblack-800 rounded-md'  >Login</Link>
                        <Link to='/signup'className='py-2 px-3 border-[0.1px] border-richblack-500 bg-richblack-800 rounded-md   '    >SignUp</Link>
                      </div>
                    )
                  }
            </div>
        </div>
    </div>
  )
}
