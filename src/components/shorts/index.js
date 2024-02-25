import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { debounce } from "../../lib/utils";

const Shorts = ({
  channel,
  src,
  i,
  currentShortsIndex,
  description = "",
  isAudible,
  setIsAudible,
  totalLikes = 0,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [likeCount, setLikeCount] = useState(totalLikes);

  const videoRef = useRef(null);

  const handlePlayPause = (action) => {
    try {
      if (
        (action !== "pause" && videoRef.current.paused) ||
        action === "play"
      ) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch (e) {
      console.log("video play error");
    }
  };
  const debouncedHandlePlayPause = debounce(handlePlayPause, 300);

  useEffect(() => {
    try {
      if (!videoRef.current) return;
      if (currentShortsIndex === i) {
        debouncedHandlePlayPause("play");
      } else {
        debouncedHandlePlayPause("pause");
        videoRef.current.currentTime = 0;
      }
    } catch (e) {
      console.log("video error");
    } // eslint-disable-next-line
  }, [currentShortsIndex, i]);

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleKeyDown = useCallback(
    (event) => {
      // space-bar (key code 32)
      if (currentShortsIndex !== i) return;
      if (event.keyCode === 32) {
        event.preventDefault();
        handlePlayPause();
      }
    },
    [currentShortsIndex, i, handlePlayPause]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener("timeupdate", handleTimeUpdate);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleLike = () => {
    if (isDisliked) setIsDisliked(false);
    if (isLiked) setLikeCount((prev) => prev - 1);
    else setLikeCount((prev) => prev + 1);
    setIsLiked((prev) => !prev);
  };
  const handleDislike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    }
    setIsDisliked((prev) => !prev);
  };

  return (
    <div className="w-screen xs:w-full md:w-[80%] text-white h-[100svh] xs:h-full xs:rounded-md flex flex-col relative p-2  ">
      <video
        className="inset-0 object-cover absolute w-screen xs:w-full h-[100svh] xs:h-full top-0 left-0 xs:rounded-md"
        onClick={debouncedHandlePlayPause}
        src={src}
        loop={isPlaying}
        ref={videoRef}
        muted={!isAudible}
      />

      <div className="flex justify-between z-10 ">
        <button onClick={handlePlayPause}>
          {isPlaying ? (
            <PauseIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="h-6 w-6" />
          )}
        </button>
        <button onClick={() => setIsAudible((prev) => !prev)}>
          {isAudible ? (
            <IoMdVolumeHigh className="h-6 w-6" />
          ) : (
            <IoMdVolumeOff className="h-6 w-6" />
          )}
        </button>
      </div>
      <div className="flex text-pretty text-start absolute h-auto mb-2 z-10 gap-1 flex-wrap flex-col bottom-0 text-lg xs:text-sm">
        <div className="flex gap-2 items-center font-semibold ">
          <img
            className="h-8 !w-8 flex rounded-full "
            alt="profile pic"
            src={
              channel.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
          />
          <p>{channel.name || ""}</p>
          <button
            onClick={() => setIsSubscribed((prev) => !prev)}
            className="rounded-2xl px-3 w-28 py-0.5 bg-white"
          >
            <span className="opacity-80 text-black">
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </span>
          </button>
        </div>
        <div className="w-[80%] md:w-full font-semibold h-auto text-wrap">
          <p>{description || ""}</p>
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
      <div className="gap-5 items-center text-3xl flex-col-reverse flex absolute right-0 md:right-[-4rem] p-1 pb-2 bottom-0 w-16  h-screen md:h-full">
        <img
          src={
            channel.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          className="h-9 !w-9 rounded-md"
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
        <button onClick={handleDislike}>
          <BiSolidDislike
            className={`md:bg-gray-100 md:bg-opacity-30 rounded-full h-11 w-11 p-1.5 ${
              isDisliked ? "text-blue-400" : ""
            }`}
          />
        </button>
        <button onClick={handleLike}>
          <BiSolidLike
            className={`${
              isLiked ? "text-blue-400" : ""
            } md:bg-gray-100 md:bg-opacity-30 rounded-full h-11 w-11 p-1.5 `}
          />
          <p className="text-sm">{likeCount}</p>
        </button>
      </div>
    </div>
  );
};

export default Shorts;
