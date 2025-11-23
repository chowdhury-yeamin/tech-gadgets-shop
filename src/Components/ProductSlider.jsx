"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import img1 from "../../public/Samsung-Watch.png";
import img2 from "../../public/s24.png";
import img3 from "../../public/pc.png";
import img4 from "../../public/sunglass.png";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function ProductSlider() {
  return (
    <div className="w-7xl mx-auto py-10 rounded-4xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[500px] rounded-4xl"
      >
        <SwiperSlide className="flex items-center justify-center">
          <Image
            src={img1}
            alt="Samsung Watch"
            width={500}
            height={500}
            className="w-full h-full object-cover "
          />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image
            src={img2}
            alt="QGear UltraLaptop"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image
            src={img3}
            alt="QuantumPods Pro"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image
            src={img4}
            alt="QVision AR Glasses"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
