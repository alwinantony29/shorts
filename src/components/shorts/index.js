import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineArrowRight } from "react-icons/md";
import {
  IoIosShareAlt,
  IoMdPlay as PlayIcon,
  IoMdPause as PauseIcon,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import {
  BiSolidLike,
  BiSolidDislike,
  BiSolidCommentDetail,
} from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Slider } from "../ui/slider";

const Shorts = ({ src, i, currentShortsIndex }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudible, setIsAudible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };
  const handleKeyDown = useCallback(
    (event) => {
      // space-bar (key code 32)
      if (!currentShortsIndex === i) return;
      if (event.keyCode === 32) {
        event.preventDefault();
        handlePlayPause();
      }
    },
    [currentShortsIndex, i]
  );

  useEffect(() => {
    if (!videoRef.current) return;
    if (currentShortsIndex === i) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [currentShortsIndex, i]);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.addEventListener("timeupdate", handleTimeUpdate);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      setIsPlaying(true);
      videoRef.current.play();
    } else {
      setIsPlaying(false);
      videoRef.current.pause();
    }
  };

  return (
    <div className="w-screen xs:w-full md:w-[80%] text-white h-screen xs:h-full xs:rounded-md flex flex-col relative p-2  ">
      <video
        className="inset-0 object-cover absolute w-screen xs:w-full h-screen xs:h-full top-0 left-0 xs:rounded-md"
        onClick={handlePlayPause}
        src={src}
        loop
        ref={videoRef}
        muted={!isAudible}
      />

      <div className="flex justify-between z-10 ">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
        <button onClick={() => setIsAudible((prev) => !prev)}>
          {isAudible ? <IoMdVolumeHigh /> : <IoMdVolumeOff />}
        </button>
      </div>
      <div className="flex absolute h-auto mb-2 z-10 gap-1 flex-wrap flex-col bottom-0 text-sm">
        <div className="flex gap-2 items-center font-semibold ">
          <img
            className="h-8 w-8 flex rounded-full "
            alt="profile pic"
            src="https://yt3.ggpht.com/yti/AGOGRCoiEx1X29gGYZQtGH3qoikIqIl5NqNa2hibMD8X2-4=s88-c-k-c0x00ffffff-no-rj"
          />
          <p>@EpicPopcornReviews</p>
          <button className="rounded-2xl px-2 py-0.5 bg-white">
            <span className="opacity-80 text-black">Subscribe</span>
          </button>
        </div>
        <div className="flex items-center gap-2 w-full font-semibold">
          <MdOutlineArrowRight />
          <p>MCU 4/32 - He is SUCCESSFUL in</p>
        </div>
        <div className="flex w-full font-semibold text-wrap max-w-[80%] ">
          <p>World PEACE #ironman2 #movie #featuremovie #film #mcu</p>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 px-[1%] w-full z-20">
        <Slider
          value={[currentTime]}
          max={videoRef.current && videoRef.current.duration}
          min={0}
          className="w-[98%] mx-auto"
          step={10}
        />
      </div>
      <div className="action-bar gap-5 items-center text-3xl flex-col-reverse flex absolute right-0 md:right-[-4rem] p-1 bottom-0 w-16  h-screen md:h-full">
        <img
          src={
            "https://yt3.ggpht.com/yti/AGOGRCoiEx1X29gGYZQtGH3qoikIqIl5NqNa2hibMD8X2-4=s88-c-k-c0x00ffffff-no-rj"
          }
          className="h-9 w-9 rounded-md"
          alt="channel-icon"
        />
        <button>
          <BsThreeDotsVertical className="md:bg-gray-100 md:bg-opacity-30 rounded-full p-1.5 h-11 w-11 " />
        </button>
        <button>
          <IoIosShareAlt className="md:bg-gray-100 md:bg-opacity-30 rounded-full p-1.5 h-11 w-11 " />
        </button>
        <button>
          <BiSolidCommentDetail className="md:bg-gray-100 md:bg-opacity-30 rounded-full p-1.5 h-11 w-11 " />
        </button>
        <button onClick={() => setIsDisliked((prev) => !prev)}>
          <BiSolidDislike
            className={`md:bg-gray-100 md:bg-opacity-30 rounded-full h-11 w-11 p-1.5 ${
              isDisliked ? "text-blue-500" : ""
            }`}
          />
        </button>
        <button onClick={() => setIsLiked((prev) => !prev)}>
          <BiSolidLike
            className={`${
              isLiked ? "text-blue-600" : ""
            } md:bg-gray-100 md:bg-opacity-30 rounded-full h-11 w-11 p-1.5   `}
          />
        </button>
      </div>
    </div>
  );
};

export default Shorts;
