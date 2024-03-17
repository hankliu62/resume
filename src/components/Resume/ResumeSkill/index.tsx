/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import { Popover, Progress } from "antd";
import classNames from "classnames";
import React from "react";

import * as Constants from "@/constants";
import useMobile from "@/hooks/useMobile";
import { getRoutePrefix } from "@/utils/route";

const SkillPopover = ({
  popover,
  isMobile,
  percent,
  contexts,
}: {
  popover: any;
  percent: number;
  contexts: string[];
  isMobile?: boolean;
}) => {
  return (
    <div
      className={classNames("skill-popover-wrapper", {
        "skill-popover-wrapper-mobile": isMobile,
      })}
    >
      <h5 className="skill-popover-title text-center">{popover}</h5>
      <div className="mb-[8px]">
        <label className="mb-1 block text-base font-medium">熟练度: </label>
        <div className="skill-popover-progress">
          <Progress
            percent={percent}
            showInfo={false}
            strokeColor="#00b38a"
            strokeWidth={12}
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-base font-medium">技能点: </label>
        <ul className="mb-0 ml-4 list-disc gap-y-1">
          {contexts.map((text) => (
            <li className="mb-0 max-w-[320px]" key={text}>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function ResumeSkill() {
  const isMobile = useMobile();

  return (
    <div className="resume-skill-wrapper relative h-[100vh] w-full">
      <div
        className="absolute left-0 top-0 z-0 h-full w-full bg-[linear-gradient(270deg,_#ff5f6d,_#ffc371)] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getRoutePrefix()}/images/resume/skills/banner.jpg)`,
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
            技能
          </h2>
        </div>

        <div className="skills-wrapper">
          <ul
            className={classNames("skills", {
              "!flex justify-between": isMobile,
            })}
          >
            {Constants.Skills.map((skill, index) => {
              const { type, popover, percent, contexts } = skill;
              return (
                <li
                  className={classNames("skill relative", `skill-${type}`, {
                    "!w-[33.3%]": isMobile,
                  })}
                  key={type}
                >
                  <Popover
                    placement="top"
                    overlayClassName={classNames("skill-popover", {
                      "skill-popover-mobile": isMobile,
                    })}
                    content={
                      <SkillPopover
                        isMobile={isMobile}
                        popover={popover}
                        percent={percent}
                        contexts={contexts}
                      />
                    }
                  >
                    <div
                      className={classNames(
                        "skill-wrapper group relative flex items-center bg-white bg-[length:86px_86px] bg-center bg-no-repeat transition-all hover:bg-[length:92px_92px]",
                        {
                          "!h-28 !w-28 !bg-[length:3rem_3rem] hover:!bg-[length:2.5rem_2.5rem]":
                            isMobile,
                        }
                      )}
                      style={{
                        backgroundImage: `url(
                            ${getRoutePrefix()}/images/resume/skills/${type}.svg
                          )`,
                      }}
                    >
                      <div className="absolute inset-0 bottom-0 left-0 right-0 top-0 hidden h-full w-full rounded-[50%] bg-[linear-gradient(to_right,_#eee,_#aaa)] mix-blend-multiply group-hover:block" />
                      <div className="mx-[5px] hidden w-full group-hover:block">
                        {isMobile ? (
                          <div
                            className="text-center text-base font-medium text-white"
                            style={{ mixBlendMode: "color-dodge" }}
                          >{`熟练度 ${percent}%`}</div>
                        ) : (
                          <Progress
                            percent={percent}
                            strokeColor="#00b38a"
                            type="dashboard"
                            size={150}
                            format={(p) => `熟练度\r\n${p}%`}
                          />
                        )}
                      </div>
                    </div>
                  </Popover>
                </li>
              );
            })}
            {!!(isMobile && Constants.Skills.length % 3 !== 0) &&
              Array.from({ length: 3 - (Constants.Skills.length % 3) })
                .fill("1")
                .map((item, index) => (
                  <li
                    className={classNames("skill relative", {
                      "!w-[33.3%]": isMobile,
                    })}
                    key={(item as string) + index}
                  >
                    <div className="h-28 w-28" />
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
