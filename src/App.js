import Shorts from "./components/shorts";
import videos from "./data.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";

const sliderSettings = {
  speed: 500,
  vertical: true,
  draggable: false,
  arrows: false,
};

function App() {
  const sliderRef = useRef(null);
  const [currentShortsIndex, setCurrentShortsIndex] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      sliderRef.current.slickPrev();
    } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
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

  const handleBeforeChange = (oldIndex, newIndex) => {
    setCurrentShortsIndex(newIndex);
  };

  return (
    <div className="flex overflow-hidden h-screen w-screen items-center justify-center bg-slate-500">
      <Slider
        {...sliderSettings}
        ref={sliderRef}
        beforeChange={handleBeforeChange}
        className="w-full xs:w-[350px] md:w-[380px] h-full xs:h-[80vh] self-end"
      >
        {Object.values(videos).map((video, i) => {
          return (
            <div className="w-full h-[100svh] xs:h-[80vh]">
              <Shorts
                {...video}
                i={i}
                key={i}
                currentShortsIndex={currentShortsIndex}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default App;
