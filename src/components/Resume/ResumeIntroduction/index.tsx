"use client";

import classNames from "classnames";
import React from "react";

import * as Constants from "@/constants";
import useMobile from "@/hooks/useMobile";
import { getRoutePrefix } from "@/utils/route";

export default function ResumeIntroduction() {
  const isMobile = useMobile();

  return (
    <div className="resume-introduction-wrapper relative h-[100vh] w-full">
      <div
        className="absolute left-0 top-0 z-0 h-full w-full bg-[#109085] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getRoutePrefix()}/images/resume/introduction/banner.jpg)`,
        }}
      >
        <div
          className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,_#fafafa,_#aaa)]"
          style={{
            mixBlendMode: "multiply",
            inset: 0,
          }}
        />
      </div>

      <div
        className={classNames(
          "relative z-10 flex h-full flex-col items-center justify-center",
          {
            "!w-full": isMobile,
          }
        )}
      >
        <div className="title-wrapper">
          <h2
            className={classNames("title", {
              "!text-[2.5rem]": isMobile,
            })}
          >
            自我介绍
          </h2>
        </div>

        <div className="self-introduction-wrapper" data-aos="fade-up">
          <ol className="introductions">
            <li className={classNames("introduction-item")}>
              对前端方面有着浓厚的兴趣，
              {isMobile
                ? "有着多年的前端工作经验"
                : "这几年来的前端工作经验，使我对前端技术的热情高涨，实战方面得到提升，希望能够在前端这条路上一直走下去"}
              ；
            </li>
            <li className="introduction-item">
              做人诚信，做事踏实，性格有点内向，却是一名典型的实干派；
            </li>
            <li className="introduction-item">
              有较强的动手能力，适应力强，在工作和业余时间中，不断提高自己，适应工作的需要；
            </li>
            <li className="introduction-item">
              对工作认真负责，
              {isMobile ? "能" : "就是做好自己的本职工作，"}
              在规定的时间内保质保量的完成任务；
            </li>
            <li
              className={classNames("introduction-item", { hidden: isMobile })}
            >
              学习能力强，前端技术主要在于自学。
            </li>
          </ol>
        </div>

        <div className="self-information-wrapper" data-aos="fade-up">
          <ul className="information-items">
            {Constants.Information.map((info) => {
              const { type, value } = info;
              return (
                <li className="information-item" key={type}>
                  <img
                    className="information-item-icon"
                    src={`${getRoutePrefix()}/images/resume/introduction/${type}.svg`}
                    alt=""
                  />
                  <div
                    className={classNames("information-item-data break-all", {
                      "text-xs": isMobile,
                    })}
                  >
                    {value}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
