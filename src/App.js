import Shorts from "./components/shorts";
import videos from "./data.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { useEffect, useRef } from "react";
function App() {
  const sliderRef = useRef(null);
  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      sliderRef.current.slickPrev();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      sliderRef.current.slickNext();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      sliderRef.current.slickPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      sliderRef.current.slickNext();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const settings = {
    // dots: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    swipe: true,
    draggable: false,
    // arrows: false,
  };
  const handle = () => {
    sliderRef.current.slickNext();
  };
  return (
    <div className="flex  h-screen w-screen items-center justify-center bg-slate-500">
      <Slider
        {...settings}
        ref={sliderRef}
        className="w-[350px] h-[80vh] self-end"
      >
        {Object.values(videos).map((video) => {
          return (
            <div className="w-full h-[80vh]">
              <Shorts {...video} />
            </div>
          );
        })}
      </Slider>
      {/* <Carousel
        className="h-full md:h-auto w-full md:w-[350px] "
        orientation="vertical"
        loop
      >
        <CarouselContent className="w-full h-screen md:h-[85vh]">
          {Object.values(videos).map((video, index) => {
            return (
              <CarouselItem key={index} className="w-full h-full">
                <Shorts {...video} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext/>
      </Carousel> */}
    </div>
  );
}

export default App;
