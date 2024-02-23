import React from 'react'
import { MdOutlineArrowRight } from "react-icons/md";

const Shorts = () => {
    return (
        <div className='w-[30%] h-[80svh] rounded-md flex-col relative'>
            shorts
            <div className='absolute w-full h-[25%] p-5 gap-2 flex-col bottom-0'>
                <div className='flex gap-3 items-center w-full font-semibold'>
                    <img className='h-9 w-9 rounded-full' alt='profile pic' src='https://yt3.ggpht.com/yti/AGOGRCoiEx1X29gGYZQtGH3qoikIqIl5NqNa2hibMD8X2-4=s88-c-k-c0x00ffffff-no-rj' />
                    <p>@EpicPopcornReviews</p>
                    <button className='rounded-2xl px-2 py-1 ' >Subscribe</button>
                </div>
                <div className='flex items-center gap-3 w-full font-semibold'>
                    <MdOutlineArrowRight />
                    <p>MCU 4/32 - He is SUCCESSFUL in</p>
                </div>
                <div className='flex w-full font-semibold'>
                    <p>World PEACE #ironman2 #movie #featuremovie #film #mcu</p>
                </div>

            </div>

        </div>
    )
}

export default Shorts