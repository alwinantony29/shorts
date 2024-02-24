import React, { useEffect, useRef, useState } from "react";
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
import { Slider } from "../components/ui/slider";
import { Button } from "./ui/button";

const Shorts = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudible, setIsAudible] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handlePlayPause = (e) => {
    if (e.target.paused) {
      setIsPlaying(true);
      e.target.play();
    } else {
      setIsPlaying(false);
      e.target.pause();
    }
  };
  const handleAudio = () => {
    videoRef.current.muted = false;
    setIsAudible((prev) => !prev);
  };

  return (
    <div className="w-screen md:w-[80%] text-white h-screen md:h-full md:rounded-md flex flex-col relative p-2  ">
      <video
        className="inset-0 object-cover absolute w-screen md:w-full h-screen md:h-full top-0 left-0 md:rounded-md"
        onClick={handlePlayPause}
        src={src}
        loop
        ref={videoRef}
      />

      <div className="flex justify-between z-10 ">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
        <button onClick={handleAudio}>
          {isAudible ? <IoMdVolumeHigh /> : <IoMdVolumeOff />}
        </button>
      </div>
      <div className="absolute h-auto mb-2 z-10 gap-2 flex-col bottom-0 text-xs md:text-sm">
        <div className="flex gap-2 flex-wrap items-center  font-semibold ">
          <img
            className="h-6 md:h-7 w-6 md:w-7 rounded-full "
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
        ></img>
        <button>
          <BsThreeDotsVertical className="md:bg-gray-100 md:bg-opacity-30 rounded-full p-1.5 h-11 w-11 " />
        </button>
        <button>
          <IoIosShareAlt className="md:bg-gray-100 md:bg-opacity-30 rounded-full p-1.5 h-11 w-11 " />
        </button>
        <button>
          <BiSolidCommentDetail className="md:bg-gray-100 md:bg-opacity-30 rounded-full p-1.5 h-11 w-11 " />
        </button>
        <button>
          <BiSolidDislike className="md:bg-gray-100 md:bg-opacity-30 rounded-full h-11 w-11 p-1.5" />
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
