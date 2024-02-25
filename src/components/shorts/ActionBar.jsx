import React, { useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import {
  BiSolidLike,
  BiSolidDislike,
  BiSolidCommentDetail,
} from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const ActionBar = ({ channel, totalLikes }) => {
  const [likeCount, setLikeCount] = useState(totalLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

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
      <button onClick={handleLike} className="relative">
        <BiSolidLike
          className={`${
            isLiked ? "text-blue-400" : ""
          } md:bg-gray-100 md:bg-opacity-30 rounded-full h-11 w-11 p-1.5  `}
        />
        <p className="text-sm absolute bottom-0 left-0 ml-[.8rem] mb-[-1.2rem]">
          {likeCount}
        </p>
      </button>
    </div>
  );
};

export default ActionBar;
