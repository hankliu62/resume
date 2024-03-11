// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import LeftCircleOutlined from "@ant-design/icons/lib/icons/LeftCircleOutlined";
import RightCircleOutlined from "@ant-design/icons/lib/icons/RightCircleOutlined";
import classNames from "classnames";
import React, { ReactElement } from "react";
// import required modules
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

export interface ISwiperProps extends Partial<SwiperProps> {
  slides: ReactElement[];
  slideClassName?: string;
}

export default function CSwiper({
  slides,
  slideClassName,
  className,
  ...others
}: ISwiperProps) {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={60}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        className={classNames("c-swiper", { [className!]: !!className })}
        scrollbar={false}
        {...others}
      >
        {slides.map((children) => (
          <SwiperSlide className={slideClassName} key={"slide-" + children.key}>
            {children}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
