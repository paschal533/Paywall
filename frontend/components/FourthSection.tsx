import React from "react";
import Image from "next/image";
import image1 from "../assets/Ellipse 6.png";
import image2 from "../assets/Ellipse5.png";
import ButtonGroup from "./ButtonGroup";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectCards, Autoplay, Pagination, Navigation } from "swiper";
import Link from "next/link";

const FourthSection = () => {
  return (
    <div className="flex flex-wrap sm:space-y-4 space-y-0 justify-between items-center mt-16">
      <div className="sm:mb-6 sm:justify-center sm:items-center sm:w-full">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation, EffectCards]}
        >
          <SwiperSlide>
            <div className="text-black items-center justify-center flex flex-col drop-shadow-xl p-4 bg-white h-[100%]">
              <Image src={image1} width={100} height={100} alt="photo" />
              <h1>Dave Don</h1>
              <p className="mt-4 text-lg font-xs p2">
                Paywall lets you add a payment button to your ecommerce site in
                seconds and start accepting credit card payments on your mobile
                phone...
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="text-black items-center justify-center flex flex-col drop-shadow-xl p-4 bg-white h-[100%]">
              <Image src={image2} width={100} height={100} alt="photo" />
              <h1>Katie Williams</h1>
              <p className="mt-4 text-lg font-xs p2">
                Paywall is super convenient. The App is ver secure, You don't
                even have to open it, just use your phone number and payment
                will be...
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-[500px]">
        <h1 className="text-5xl sm:text-4xl font-bold">
          What Our Users Say About Paywall
        </h1>
        <div className="flex mt-8 mb-8">
          <p className="text-xl">
            Users testimonies by Paywall users have been compiled here in order
            to best illustrate the quality of our services.
          </p>
        </div>
        <Link href="/about">
          <ButtonGroup
            handleClick={() => {}}
            disable={false}
            btnName="Learn more"
          />
        </Link>
      </div>
    </div>
  );
};

export default FourthSection;
