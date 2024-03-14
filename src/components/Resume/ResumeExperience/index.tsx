"use client";

import classNames from "classnames";
import throttle from "lodash/throttle";
import React, { ReactElement, useCallback, useRef, useState } from "react";

import { Carousel } from "@/components";
import Carousel3d from "@/components/Carousel3d";
import * as Constants from "@/constants";
import useMobile from "@/hooks/useMobile";
import { isSafari } from "@/utils/platform";
import { getRoutePrefix } from "@/utils/route";

// export interface IResumeExperienceProps {
//   isMobile: boolean;
// }

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
    [isMobile, setThrottleRotates]
  );

  const onMouseLeave = useCallback(() => {
    if (isMobile) {
      return;
    }

    setRotateX(0);
    setRotateY(0);
  }, [isMobile]);

  const renderExperiences = (): ReactElement[] => {
    return Constants.Experiences.map((experience) => {
      const { company, time, post, works, image } = experience;
      return (
        <div
          className={classNames("experience-wrapper bg-white", {
            "min-h-[512px]": isMobile,
          })}
          key={company}
          style={{
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          }}
        >
          <div
            className={classNames("experience-item", {
              "flex flex-col": isMobile,
            })}
          >
            <div
              className={classNames("experience-image-wrapper", {
                "!w-full": isMobile,
              })}
            >
              <img
                className="company-image"
                src={getRoutePrefix() + image}
                alt="Company"
              />
            </div>
            <div
              className={classNames("experience-content-wrapper", {
                "!px-4": isMobile,
              })}
            >
              <h5
                className={classNames("company-name", {
                  "!mb-2 text-center !text-xl": isMobile,
                })}
              >
                {company}
              </h5>
              <div
                className={classNames("company-time", {
                  "!mb-1 text-center !text-lg": isMobile,
                })}
              >
                {time}
              </div>
              <div
                className={classNames("company-post", {
                  "!mb-1 text-center !text-lg": isMobile,
                })}
              >
                {post}
              </div>
              <ul className="company-works">
                {works.map((work) => {
                  return (
                    <li
                      className={classNames("company-work", {
                        "!text-base": isMobile,
                      })}
                      key={work}
                    >
                      {work}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="resume-experience-wrapper">
      <div className="title-wrapper">
        <h1 className="title">工作经历</h1>
      </div>

      <div
        className={classNames("experiences-wrapper", {
          "!h-[60vh] !w-full": isMobile,
        })}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        ref={experienceRef}
      >
        {isMobile ? (
          <Carousel3d
            className="h-full w-full"
            childMaxLength={experiencesLength}
            z={540}
            blurIncrease={3}
          >
            {renderExperiences()}
          </Carousel3d>
        ) : (
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
  );
}
