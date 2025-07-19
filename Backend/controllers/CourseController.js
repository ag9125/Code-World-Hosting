const Course =require('../models/Course')
const CourseProgress = require('../models/CourseProgress')
const Category = require('../models/Category')
const User = require('../models/User')
const Section = require('../models/Section')
const cloudinaryUpload = require('../utils/cloudinary')
const Subsection = require('../models/Subsection')
const { convertSecondsToDuration } = require("../utils/secToDuration")
require('dotenv').config()

exports.createCourse = async(req,res)=>{
    try {
      console.log("In create course controller")
        const {courseName,courseDescription,whatYouWillLearn,price,tag,category,instructions} = req.body;
        const instructorId = req.user.id
        if(!courseName||!courseDescription||!whatYouWillLearn||!price||!tag||!category){
            return res.status(400).json({
              success:false,
              message:"All Fields Are Required"
            })
        }
        const isCategoryExist = await Category.findOne({_id:category});
        if(!isCategoryExist){
          console.log('category not exist')
            return res.json({
                success:false,
                message:"Category not available"
            })
        }
        const tag_id = isCategoryExist._id  
       
         const tagP =JSON.parse(tag)
         const instructionsP = JSON.parse(instructions)
       
         const thumbnailImg = req.files.thumbnailImage
         console.log(thumbnailImg)
         if(!thumbnailImg){
          return res.json({
            message:'Image not found'
          })
         }
        const response = await cloudinaryUpload(thumbnailImg,process.env.FOLDER_NAME)
        const newCourse = await Course.create({
           tag:tagP, courseName,courseDescription,whatYouWillLearn,price,category:tag_id,thumbnail:response.secure_url,instructor:instructorId,instructions:instructionsP
        })

        //add course to user{instructor}
        await User.findOneAndUpdate({_id:instructorId},{
            $push : {
                courses:newCourse
            }
        },{new:true})

        //update tag Schema
        await Category.findOneAndUpdate({_id:category},{
            $push:{
                courses:newCourse
            }
        },{new:true})

        res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse
        })


        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Unable to Create Course',
            err:error.message
        })
    }
}

exports.getAllCourses = async(req,res)=>{
    try {

        const allCourses = await Course.find().populate("instructor")
        res.json({
            success:true,
            message:"Course Fetched Successfully",
            data:allCourses
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Unable to Create Course',
            err:error
    })
}
}

exports. getCourseDetails = async (req,res)=>{
    try{
        const {courseId} = req.body
        const courseDetail = await Course.findById(courseId).populate([{
            path:"courseContent",
            populate:  {path:"subSection"  }
        },
        {path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        },
        // {path:"ratingAndReviews"},
        {path:"studentsEnrolled"
            ,
            populate:{
                path:"additionalDetails"
            }
        },
        {path:"category"}])
        console.log('Course details are : ',courseDetail)
        if(!courseDetail){
            return res.json({
                success:false,
                message:"Course not found"
            })
        }
        return res.json({
            success:true,
              data:courseDetail
        })
    }
    catch(err){
       return res.json({
        success:false,
        message:err.message
       })
    }
  }

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    if (courseDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      });
    }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }
    console.log("updates are : ",updates)

    // Update only the fields that are present in the request body
if (updates && typeof updates === "object") {
  Object.keys(updates).forEach(key => {
    if (key !== "courseId") {
      if (key === "tag") {
        try {
          course[key] = JSON.parse(updates[key]);
        } catch (err) {
          return res.status(400).json({ error: "Invalid tag format" });
        }
      } else {
        course[key] = updates[key];
      }
    }
  });
}


    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await Subsection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
