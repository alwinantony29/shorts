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
      className="flex p-5 h-screen w-screen items-center justify-center bg-slate-700"
    >
      <Carousel
        className='max-h-screen max-w-sm'
        orientation='vertical'
      >
        <CarouselContent className='w-[350px] h-[90vh]'>
          {Object.values(videos).map((video, index) => {
            return <CarouselItem key={index} className="">
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
