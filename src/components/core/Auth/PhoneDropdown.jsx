import { useRef, useState ,useCallback} from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import {NavbarLinks} from '../../../data/navbar-links'
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { IoMdMenu } from "react-icons/io";
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../Services/operations/authAPI"

export default function PhoneDropdown({IoIosArrowDropdownCircle, subLinks, matchRoute}) {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const handler = useCallback(() => {
  setOpen(false)
}, [])
  useOnClickOutside(ref,handler)

  if (!user) return null

  return (
    <button className="relative opacity-100 md:opacity-0" onClick={() => setOpen(true)}>
      <div className="text-2xl text-white w-10 h-10">
        <IoMdMenu/>
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
                {
                  NavbarLinks.map((link,i)=>(
                    <li className='' key={i}>
                      {
                        link.title==='Catalog'?(
   <div className="relative group text-richblack-25 cursor-pointer">
  <div className="flex items-center gap-x-1">
    Catalog
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
                      <Link to={link.path} className={`${matchRoute(link.path)?'text-yellow-200':'text-richblack-25'}`}>
                      {link.title}
                      </Link>
                        )
                      }

                    </li>
                  ))
                }
        </div>
      )}
    </button>
  )
}

