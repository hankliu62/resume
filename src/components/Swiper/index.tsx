// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import classNames from 'classnames';
import type { ReactElement } from 'react';
import React from 'react';
// import required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
// Import Swiper React components
import type { SwiperProps} from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';

export interface ISwiperProps extends Partial<SwiperProps> {
  slides: ReactElement[];
  slideClassName?: string;
}

export default function CSwiper({ slides, slideClassName, className, ...others }: ISwiperProps) {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={60}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        className={classNames('c-swiper', { [className!]: !!className })}
        scrollbar={false}
        {...others}
      >
        {slides.map((children) => (
          <SwiperSlide className={slideClassName} key={'slide-' + children.key}>
            {children}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
