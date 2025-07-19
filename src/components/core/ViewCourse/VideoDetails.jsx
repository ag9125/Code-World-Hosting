import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
// import "video-react/dist/video-react.css"
import { useLocation } from "react-router-dom"
import Player from "react-player"
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";

import { markLectureAsComplete } from "../../../Services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../redux/Slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  // console.log("ref is : ",playerRef);
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([null])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  (async () => {
    if (!courseSectionData.length || !courseId || !sectionId || !subSectionId) return

    const filteredData = courseSectionData.find((course) => course._id === sectionId)

    if (!filteredData || !filteredData.subSection?.length) return

    const filteredVideoData = filteredData.subSection.find(
      (data) => data._id === subSectionId
    )

    if (!filteredVideoData) return

    setVideoData(filteredVideoData)
    setPreviewSource(courseEntireData?.thumbnail)
    setVideoEnded(false)
  })()
}, [courseSectionData, courseEntireData, location.pathname])


  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection?.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // go to the next video
  const goToNextVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection?.findIndex((data) => data._id === subSectionId)

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // go to the previous video
  const goToPrevVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
  <div className="flex flex-col gap-5 text-white mt-9">
  {!videoData ? (
    <img
      src={previewSource}
      alt="Preview"
      className="h-full w-full rounded-md object-cover"
    />
  ) : (
    
<MediaController
  style={{
    width: "100%",
    aspectRatio: "16/9",
    position: "relative", // ensure container is relative for absolute children
  }}
>
  <Player
    slot="media"
    ref={playerRef}
    src={videoData?.videoUrl}
    playsInline
    
    onEnded={() => setVideoEnded(true)}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      "--controls": "none",
    }}
  />

  {/* ✅ Move this OUTSIDE <Player>, so it overlays correctly */}
  {videoEnded && (
    <div className="absolute inset-0 z-[100] grid place-content-center font-inter bg-black bg-opacity-70">
      {!completedLectures.includes(subSectionId) && (
        <IconBtn
          disabled={loading}
          onclick={() => handleLectureCompletion()}
          text={!loading ? "Mark As Completed" : "Loading..."}
          customClasses="text-xl max-w-max px-4 mx-auto"
        />
      )}
      {/* <IconBtn
        disabled={loading}
        onclick={() => {
           if (playerRef?.current) {
    const internalPlayer = playerRef.current.getInternalPlayer();
    if (internalPlayer) {
      internalPlayer.currentTime = 0;
      internalPlayer.play();
    }
    setVideoEnded(false);
  }
        }}
        text="Rewatch"
        customClasses="text-xl max-w-max px-4 mx-auto mt-2"
      /> */}
      <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
        {!isFirstVideo() && (
          <button
            disabled={loading}
            onClick={goToPrevVideo}
            className="blackButton"
          >
            Prev
          </button>
        )}
        {!isLastVideo() && (
          <button
            disabled={loading}
            onClick={goToNextVideo}
            className="blackButton"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )}

    
  <MediaControlBar >
    <MediaPlayButton />
    <MediaSeekBackwardButton seekOffset={10} />
    <MediaSeekForwardButton seekOffset={10} />
    <MediaTimeRange />
    <MediaTimeDisplay showDuration />
    <MediaMuteButton />
    <MediaVolumeRange />
    <MediaPlaybackRateButton />
    <MediaFullscreenButton />
  </MediaControlBar>
</MediaController>

  )}

  <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
  <p className="pt-2 pb-6">{videoData?.description}</p>
</div>

  )
}

export default VideoDetails
// video