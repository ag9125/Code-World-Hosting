const Subsection =require('../models/Subsection')
const Section  = require('../models/Section')
const cloudinaryConnect = require('../utils/cloudinary')

exports.createSubSection = async(req,res)=>{
    try {
        const {title,description,sectionId} = req.body;
        if(!title||!description){
            return res.status(404).json({
                success:false,
                message:'Missing Fields'
            })
        }
         const video = req.files.video
          console.log('vedio size is : ',video.size)
         const response = await cloudinaryConnect(video,process.env.FOLDER_NAME)
        console.log(response)

        const newSubSection =   await Subsection.create({
            title,description,
            timeDuration: `${response.duration}`
            ,videoUrl:response.secure_url
        })
        //update Section
      const updatedSection =   await Section.findByIdAndUpdate(sectionId,{
            $push:{
                subSection:newSubSection
            }
        },{new:true}).populate(
           "subSection"
        )

        res.json({
            success:true,
            data:updatedSection,

        })
    } catch (error) {
      console.log('error in createSubsection controoller')
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;

    // Validate IDs

    // Find subsection
    const subSection = await Subsection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Update fields
    if (title !== undefined) subSection.title = title;
    if (description !== undefined) subSection.description = description;

    // Handle video update
    if (req.files?.videoUrl && req.files.videoUrl.size > 0) {
      const video = req.files.videoUrl;
      const uploadDetails = await cloudinaryConnect(video, process.env.FOLDER_NAME);
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    // Save updated subsection
    await subSection.save();

    // Return updated section with populated subSections
    const updatedSection = await Section.findById(sectionId).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error updating subsection:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the subsection",
    });
  }
};


exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;

    // Validate IDs
 

    // Check if section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    // Remove subSection from section
    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    // Delete the subSection
    const subSection = await Subsection.findByIdAndDelete(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Return updated section with populated subSections
    const updatedSection = await Section.findById(sectionId).populate("subSection");

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Error deleting subsection:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the subsection",
    });
  }
};
