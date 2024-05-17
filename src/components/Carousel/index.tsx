'use client';

import {
  LeftCircleOutlined,
  LeftOutlined,
  RightCircleOutlined,
  RightOutlined,
} from '@ant-design/icons';
import type { CarouselProps } from 'antd';
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import classNames from 'classnames';
import React, { useCallback, useRef } from 'react';

export interface ICustomCarouselProps extends CarouselProps {
  isMobile?: boolean;
  className?: string;
  allowArrow?: boolean;
  children: any;
}

export default function CustomCarousel({
  className,
  allowArrow,
  isMobile,
  children,
  ...props
}: ICustomCarouselProps) {
  const carouselRef = useRef<CarouselRef>(null);

  const onClickPrev = useCallback(() => {
    carouselRef.current?.prev();
  }, []);

  const onClickNext = useCallback(() => {
    carouselRef.current?.next();
  }, []);

  return (
    <div
      className={classNames('custom-carousel-container', {
        [className!]: className,
        'with-arrow': allowArrow,
      })}
    >
      {isMobile ? (
        <LeftOutlined onClick={onClickPrev} className="arrow-middle" />
      ) : (
        <LeftCircleOutlined onClick={onClickPrev} className="arrow-middle" />
      )}
      <Carousel {...props} ref={carouselRef}>
        {children}
      </Carousel>
      {isMobile ? (
        <RightOutlined onClick={onClickNext} className="arrow-middle" />
      ) : (
        <RightCircleOutlined onClick={onClickNext} className="arrow-middle" />
      )}
    </div>
  );
}
