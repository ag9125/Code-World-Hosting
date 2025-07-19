import {configureStore} from '@reduxjs/toolkit'
import authSlice from './Slices/authSlice'
import profileSlice from './Slices/profileSlice'
import cartSlice from './Slices/CartSlice'
import courseReducer from "./Slices/courseSlice"
import viewCourseReducer from "./Slices/viewCourseSlice"
const store = configureStore({
    reducer:{
        auth:authSlice,
        profile:profileSlice,
        cart : cartSlice,
       course:courseReducer,
      viewCourse:viewCourseReducer,
    }
})

export default store;