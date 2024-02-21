"use client";

import throttle from "lodash/throttle";
import React, { useCallback, useRef, useState } from "react";

import { Carousel } from "@/components";
import * as Constants from "@/constants";
import { isSafari } from "@/utils/platform";
import { getRoutePrefix } from "@/utils/route";

export interface IResumeExperienceProps {
  isMobile: boolean;
}

export default function ResumeExperience({ isMobile }: IResumeExperienceProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

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
    [isMobile]
  );

  const onMouseLeave = useCallback(() => {
    if (isMobile) {
      return;
    }

    setRotateX(0);
    setRotateY(0);
  }, [isMobile]);

  return (
    <div className="resume-experience-wrapper">
      <div className="title-wrapper">
        <h1 className="title">工作经历</h1>
      </div>

      <div
        className="experiences-wrapper"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        ref={experienceRef}
      >
        <Carousel
          className="experiences-carousel"
          effect="scrollx"
          isMobile={isMobile}
          allowArrow
          dots={!isMobile}
        >
          {Constants.Experiences.map((experience) => {
            const { company, time, post, works, image } = experience;
            return (
              <div
                className="experience-wrapper"
                key={company}
                style={{
                  transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                }}
              >
                <div className="experience-item">
                  <div className="experience-image-wrapper">
                    <img
                      className="company-image"
                      src={getRoutePrefix() + image}
                      alt="Company"
                    />
                  </div>
                  <div className="experience-content-wrapper">
                    <h5 className="company-name">{company}</h5>
                    <div className="company-time">{time}</div>
                    <div className="company-post">{post}</div>
                    <ul className="company-works">
                      {works.map((work) => {
                        return (
                          <li className="company-work" key={work}>
                            {work}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
