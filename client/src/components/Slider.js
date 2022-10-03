import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";


// import required modules
import { Scrollbar } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
        className=" mt-5 rounded-xl shadow-md"
        src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/08/dang-ki-iphone-14wee.png"
      ></img>
        </SwiperSlide>
        <SwiperSlide>
          <img
        className=" mt-5 rounded-xl shadow-md"
        src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/12/web-xiaomi-12-lite-landing-mai-phuong-web.jpg"
      ></img>
        </SwiperSlide>
      </Swiper>
    </>
  );
}