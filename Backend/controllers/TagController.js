const Category = require('../models/Category')
const Course=require('../models/Course')
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
exports.createCategory = async (req,res)=>{
    try {
        const {name,description} = req.body;
        if(await Category.findOne({name})) {
            return res.json({
                success:false,
                message:"Category is already available"
            })
        }
        const newTag = await Category.create({
            name,description
        })
        return res.json({
            success:true,
            message:"Tag created Successfully"
        })
        
    } catch (error) {
        res.json({
            err:error,
            message:'tag not created',
            success:false
        })
    }
}
exports.showAllCategories =async (req,res)=>{
    try {
        const allCategory = await Category.find()
        res.json({
            Categories:allCategory,
            success:true,

        })
    } catch (error) {
        res.json({
            message:error.message,
            success:false
        })
    }
}


exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          // match: { status: "Published" },
          // populate: "ratingAndReviews",
        })
        
  
      // console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
             _id: { $ne: categoryId },
           })
           let differentCategory = await Category.findOne(
             categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
               ._id
           )
             .populate({
               path: "courses",
              //  match: { status: "Published" },
             })
        // console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const categories = await Category.find({})
  .populate({
    path: "courses",
    // match: { status: "Published" },
    populate:{
      path:"instructor"
    }
  })

// Now `categories` is an array, so you can safely flatMap
const allCourses = categories.flatMap(category => category.courses);
      const mostSellingCourses = allCourses
        .sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length)
        .slice(0, 10)
      //  console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  } 

