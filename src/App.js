import Shorts from "./components/shorts";
import videos from "./data.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel"
function App() {
  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-slate-700"
    >
      <Carousel
        className='h-full md:h-auto w-full md:w-[350px] '
        orientation='vertical'
      >
        <CarouselContent className='w-full h-screen md:h-[85vh]'>
          {Object.values(videos).map((video, index) => {
            return <CarouselItem key={index} className='w-full h-full'>
              <Shorts {...video} />
            </CarouselItem>
          })}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
    </div>
  );
}

export default App;
