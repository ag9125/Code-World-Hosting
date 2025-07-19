import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"
import { resetCourseState } from "../../../redux/Slices/courseSlice"

export default function SidebarLink({ link, iconName ,onClick}) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const isActive = matchRoute(link.path)

  return (
    <NavLink
      to={link.path}
      onClick={() => {dispatch(resetCourseState());if(onClick) onClick()}}
      className={`relative block w-full px-8 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
        isActive
          ? "bg-yellow-800 text-yellow-50"
          : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-100"
      }`}
    >
      {/* Active yellow bar */}
      <span
        className={`absolute left-0 top-0 h-full w-[0.25rem] rounded-r-sm bg-yellow-400 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      {/* Icon and Label */}
      <div className="flex items-center gap-x-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}
