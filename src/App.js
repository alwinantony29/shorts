import Shorts from "./components/shorts";
import data from "./data.json";
import { useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const carouselSettings = {
  axis: "vertical",
  emulateTouch: true,
  showArrows: false,
  swipeable: true,
  showThumbs: false,
  showIndicators: false,
  showStatus: false,
  ariaLabel: "Shorts",
  // infiniteLoop: true,
  useKeyboardArrows: true,
};
const videos = Object.values(data);

function App() {
  const sliderRef = useRef(null);
  const [currentShortsIndex, setCurrentShortsIndex] = useState(0);

  const handleCarouselChange = (newIndex) => {
    setCurrentShortsIndex(newIndex);
  };

  return (
    <div className="flex overflow-hidden h-[100svh] w-screen items-center justify-center bg-slate-500">
      <Carousel
        {...carouselSettings}
        ref={sliderRef}
        onChange={handleCarouselChange}
        className="w-full xs:w-[350px] md:w-[380px] h-full xs:h-[80svh] self-end"
      >
        {videos.map((video, i) => {
          return (
            <div className="w-full h-[100svh] xs:h-[80svh]" key={i}>
              <Shorts
                {...video}
                i={i}
                currentShortsIndex={currentShortsIndex}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default App;
