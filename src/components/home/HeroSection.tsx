import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
export const RenderNewLine = ({ text }: { text: string }) => {
  return text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};
const HeroSection = () => {
  const sliderData = [
    {
      id: 1,
      image: "/images/slider3.jpg",
      heading: "Elevate \nYour Fitness Routine",
      desc: "Unleash your potential with premium fitness gear crafted for peak performance. Whether you're into cardio or strength training, our top-of-the-line equipment is designed to help you crush your fitness goals.",
    },
    {
      id: 2,
      image: "/images/slider2.jpg",
      heading: "Transform \nYour Fitness Journey",
      desc: "Explore cutting-edge fitness equipment that empowers your workouts. From high-performance cardio machines to essential strength training tools, we provide everything you need to reach your fitness aspirations.",
    },
    {
      id: 3,
      image: "/images/slider1.jpg",
      heading: "Gear Up \nfor Greatness",
      desc: "Unlock your full potential with elite fitness equipment tailored for your success. From advanced cardio machines to powerful strength training tools, we offer everything you need to conquer your fitness goals. Wishing you an inspiring and transformative fitness journey ahead!",
    },
  ];

  return (
    <div className="relative w-full mt-6">
      <Carousel
        className=" overflow-hidden rounded-lg shadow-lg h-[250px] sm:h-[300px] lg:h-[500px]"
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
      >
        <CarouselContent className="flex">
          {sliderData.map((slider) => (
            <CarouselItem key={slider.id} className="min-w-full">
              <Card className="bg-transparent">
                <CardContent className="flex items-center justify-center h-full p-0 w-full">
                  <div
                    className="relative w-full h-[250px] sm:h-[300px] lg:h-[500px] hover:scale-[1.03]"
                    style={{ transition: "0.3s" }}
                  >
                    <img
                      src={slider.image}
                      className="absolute z-[1]  top-0 left-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      alt=""
                    />

                    <div className="relative z-10 w-full h-full flex items-start flex-col justify-center pl-[50px] bg-[#00000011] gap-[5px]">
                      <h1 className="text-[20px] sm:text-[30px] lg:text-[60px] font-[700] text-white">
                        <RenderNewLine text={slider.heading} />
                      </h1>
                      <p className="max-w-[550px] text-white text-[12px] sm:text-[14px] lg:text-[16px]">
                        {slider.desc}
                      </p>
                      <Link
                        to={"/product"}
                        className="px-[20px] rounded-xl border-[1px] border-cyan-600 bg-primaryMat hover:bg-green-500 py-[5px] text-black mt-[20px]"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
};
export default HeroSection;
