'use client';

import classNames from 'classnames';
import throttle from 'lodash/throttle';
import type { ReactElement} from 'react';
import React, { useCallback, useRef, useState } from 'react';

import { Carousel } from '@/components';
import Carousel3d from '@/components/Carousel3d';
import LazyBgImage from '@/components/LazyBgImage';
import LazyImage from '@/components/LazyImage';
// import ParallaxCarousel from "@/components/ParallaxCarousel";
import * as Constants from '@/constants';
import useMobile from '@/hooks/useMobile';
import { isSafari } from '@/utils/platform';
import { getRoutePrefix } from '@/utils/route';

type TExperience = (typeof Constants.Experiences)[0];

export default function ResumeExperience() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const isMobile = useMobile();

  const experiencesLength = Constants.Experiences.length;

  const experienceRef = useRef<HTMLDivElement>(null);

  const setRotates = (diffLeft: number, diffTop: number) => {
    setRotateY((diffLeft - 375) / 50);
    setRotateX((180 - diffTop) / 50);
  };

  const setThrottleRotates = useCallback(throttle(setRotates, 300), []);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isMobile || isSafari()) {
        return;
      }

      const diffLeft = event.clientX - experienceRef.current!.offsetLeft;
      const diffTop = event.clientY - experienceRef.current!.offsetTop;
      setThrottleRotates(diffLeft, diffTop);
    },
    [isMobile, setThrottleRotates],
  );

  const onMouseLeave = useCallback(() => {
    if (isMobile) {
      return;
    }

    setRotateX(0);
    setRotateY(0);
  }, [isMobile]);

  const renderExperienceImage = (experience: TExperience) => (
    <div
      className={classNames('flex w-full items-center justify-center', {
        '!w-full': isMobile,
        'absolute top-1/2 -translate-y-1/2': !isMobile,
      })}
    >
      <LazyImage className="max-w-[80px]" src={getRoutePrefix() + experience.image} alt="Company" />
    </div>
  );

  const renderExperienceContent = (experience: TExperience) => {
    const { company, time, post, works } = experience;
    return (
      <div
        className={classNames('relative w-full px-[30px]', {
          '!px-4': isMobile,
          'h-full': !isMobile,
        })}
      >
        <h5
          className={classNames('mb-[20px] text-[20px]', {
            '!mb-2 text-center !text-xl': isMobile,
          })}
        >
          {company}
        </h5>
        <div
          className={classNames('mb-[15px] text-[18px]', {
            '!mb-1 text-center !text-lg': isMobile,
          })}
        >
          {time}
        </div>
        <div
          className={classNames('mb-[15px] text-[18px]', {
            '!mb-1 text-center !text-lg': isMobile,
          })}
        >
          {post}
        </div>
        <ul className="mb-[0] list-decimal pl-[20px] text-[16px]">
          {works.map((work) => {
            return (
              <li
                className={classNames('leading-[1.6]', {
                  '!text-base': isMobile,
                })}
                key={work}
              >
                {work}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderExperiences = (): ReactElement[] => {
    return Constants.Experiences.map((experience) => {
      const { company } = experience;
      return (
        <div
          className={classNames('experience-wrapper bg-white', {
            'min-h-[512px]': isMobile,
            'h-full': !isMobile,
          })}
          key={company}
          style={{
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          }}
        >
          <div
            className={classNames('experience-item', {
              'flex flex-col': isMobile,
            })}
          >
            <div
              className={classNames('relative', {
                'w-[140px]': !isMobile,
              })}
            >
              {renderExperienceImage(experience)}
            </div>
            <div
              className={classNames('relative', {
                "flex-1 before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[1px] before:bg-[#e8e8e8] before:content-['']":
                  !isMobile,
              })}
            >
              {renderExperienceContent(experience)}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="resume-experience-wrapper relative h-[100vh] w-full">
      <LazyBgImage
        className="absolute left-0 top-0 z-0 h-full w-full bg-[#4d5e8f] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getRoutePrefix()}/images/resume/experiences/banner.jpg)`,
        }}
      >
        <div
          className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,_#fafafa,_#aaa)]"
          style={{
            mixBlendMode: 'multiply',
            inset: 0,
          }}
        />
      </LazyBgImage>

      <div
        className={classNames('relative z-10 flex h-full flex-col items-center justify-center', {
          '!w-full': isMobile,
        })}
      >
        <div className="title-wrapper">
          <h1
            className={classNames('title', {
              '!text-[2.5rem]': isMobile,
            })}
          >
            工作经历
          </h1>
        </div>

        <div
          className={classNames('experiences-wrapper', {
            '!h-[60vh] !w-full': isMobile,
          })}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          ref={experienceRef}
        >
          {isMobile ? (
            <Carousel3d childMaxLength={experiencesLength} z={540} blurIncrease={3}>
              {renderExperiences()}
            </Carousel3d>
          ) : (
            // <ParallaxCarousel<TExperience>
            //   className="experiences-carousel bg-white"
            //   list={Constants.Experiences}
            //   renderLeftChildren={renderExperienceImage}
            //   renderRightChildren={renderExperienceContent}
            // />
            <Carousel
              className="experiences-carousel"
              effect="scrollx"
              isMobile={isMobile}
              allowArrow
              dots={!isMobile}
            >
              {renderExperiences()}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
}
