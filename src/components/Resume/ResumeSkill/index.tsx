"use client";

import { Popover, Progress } from "antd";
import classNames from "classnames";
import React from "react";

import * as Constants from "@/constants";
import { getRoutePrefix } from "@/utils/route";

export interface IResumeSkillProps {
  isMobile: boolean;
}

export default function ResumeSkill({ isMobile }: IResumeSkillProps) {
  const renderSkillPopover = (popover: any, percent: number) => {
    return (
      <div
        className={classNames("skill-popover-wrapper", {
          "skill-popover-wrapper-mobile": isMobile,
        })}
      >
        <h5 className="skill-popover-title">{popover}</h5>
        <div className="skill-popover-progress">
          <Progress
            percent={percent}
            showInfo={false}
            strokeColor="#00b38a"
            strokeWidth={12}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="resume-skill-wrapper">
      <div className="title-wrapper">
        <h2 className="title">技能</h2>
      </div>

      <div className="skills-wrapper">
        <ul className="skills">
          {Constants.Skills.map((skill) => {
            const { type, popover, percent } = skill;
            return (
              <li className={classNames("skill", `skill-${type}`)} key={type}>
                <Popover
                  placement="top"
                  overlayClassName={classNames("skill-popover", {
                    "skill-popover-mobile": isMobile,
                  })}
                  content={renderSkillPopover(popover, percent)}
                >
                  <div className="skill-wrapper">
                    <img
                      src={`${getRoutePrefix()}/images/resume/skills/${type}.svg`}
                      alt=""
                    />
                  </div>
                </Popover>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
