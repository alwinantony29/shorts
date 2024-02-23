import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineArrowRight } from "react-icons/md";
import { IoIosShareAlt, IoMdPlay as PlayIcon, IoMdPause as PauseIcon, IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import { BiSolidLike, BiSolidDislike, BiSolidCommentDetail } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Slider } from "../components/ui/slider";

const Shorts = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const videoRef = useRef(null);

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime || 0);
    };

    const handleSliderChange = ([newTime]) => {
        if (!videoRef.current) return
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime || 0);
    };

    useEffect(() => {
        if (!videoRef.current) return
        const video = videoRef.current;
        video.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    const handlePlayPause = (e) => {
        if (e.target.paused) {
            setIsPlaying(true)
            e.target.play();
        } else {
            setIsPlaying(false)
            e.target.pause();
        }
    };

    return (
        <div>

            <div className='w-[80%] min-w-[300px] text-white max-w-[350px] h-[80svh] rounded-md flex flex-col relative bg-slate-300 p-2'>
                <video
                    className='inset-0 object-cover absolute w-full h-full top-0 left-0 rounded-md'
                    onClick={handlePlayPause}
                    src={src} loop
                    ref={videoRef}
                />

                <div className='flex justify-between z-10 '>
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    <IoMdVolumeHigh />
                </div>
                <div className='absolute h-[25%] z-10 gap-2 flex-col bottom-0'>
                    <div className='flex gap-3 items-center  font-semibold'>
                        <img className='h-9 w-9 rounded-full ' alt='profile pic' src='https://yt3.ggpht.com/yti/AGOGRCoiEx1X29gGYZQtGH3qoikIqIl5NqNa2hibMD8X2-4=s88-c-k-c0x00ffffff-no-rj' />
                        <p className='text-sm'>@EpicPopcornReviews</p>
                        <button className='rounded-2xl px-2 py-0.5 bg-white' >
                            <span className='opacity-80 text-sm text-black'>
                                Subscribe
                            </span>
                        </button>
                    </div>
                    <div className='flex items-center gap-3 w-full font-semibold'>
                        <MdOutlineArrowRight />
                        <p>MCU 4/32 - He is SUCCESSFUL in</p>
                    </div>
                    <div className='flex w-full font-semibold text-wrap '>
                        <p>World PEACE #ironman2 #movie #featuremovie #film #mcu</p>
                    </div>
                </div>
                <div className='absolute left-0 bottom-0 px-[1%] w-full z-10'>
                    <Slider
                        value={[currentTime]}
                        onValueChange={handleSliderChange}
                        max={videoRef.current && videoRef.current.duration}
                        className=' w-[98%] mx-auto' />
                    {/* <div className='absolute left-0 text-red-600 bottom-0 px-[1%] w-full z-10'>
                    <input
                            type="range"
                            className=' w-[98%] mx-auto'
                            value={currentTime}
                            min={0}
                            max={videoRef.current && videoRef.current.duration}
                            onChange={handleSliderChange}
                            style={{ background: 'red' }}
                        />
                     </div>  */}
                </div>
                <div className='action-bar gap-5 items-center text-3xl flex-col-reverse flex absolute right-[-4rem] p-1 top-0 w-16 h-full'>
                    <button><BsThreeDotsVertical /></button>
                    <button><IoIosShareAlt /></button>
                    <button><BiSolidCommentDetail /></button>
                    <button><BiSolidDislike /></button>
                    <button><BiSolidLike /></button>
                </div>
            </div>
        </div>
    )
}

export default Shorts