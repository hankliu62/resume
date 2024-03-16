"use client";

import {
  FileTextOutlined,
  LinkOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import React, { useState } from "react";

import { Carousel, MessageModal, QrcodeModal } from "@/components";
import Carousel3d from "@/components/Carousel3d";
import CarouselThreeD from "@/components/CarouselThreeD";
import Swiper from "@/components/Swiper";
import * as Constants from "@/constants";
import useMobile from "@/hooks/useMobile";
import { getRoutePrefix } from "@/utils/route";

export default function ResumeProject() {
  const isMobile = useMobile();

  const projectsLength = Constants.Projects.length;

  const [isVisibleQr, setIsVisibleQr] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [isVisibleSummary, setIsVisibleSummary] = useState(false);
  const [summary, setSummary] = useState("");

  const onOpenVisibleQr = (qrValue: string) => {
    setQrValue(qrValue);
    setIsVisibleQr(true);
  };

  const onCloseVisibleQr = () => {
    setQrValue("");
    setIsVisibleQr(false);
  };

  const onOpenVisibleSummary = (summary: string) => {
    setSummary(summary);
    setIsVisibleSummary(true);
  };

  const onCloseVisibleSummary = () => {
    setSummary("");
    setIsVisibleSummary(false);
  };

  const renderSlides = () => {
    return Constants.Projects.map((project) => {
      const {
        name,
        company,
        link,
        time,
        image,
        duties,
        profile,
        summary: projectSummary,
      } = project;

      return (
        <div
          className={classNames(
            "project-wrapper group relative overflow-hidden rounded-md bg-white py-[20px] shadow-[inset_0_0_10px_#ddd]",
            {
              "!h-[72vh] w-[62vw]": isMobile,
              "!h-[450px] w-[750px]": !isMobile,
            }
          )}
          key={name + company}
        >
          <div className="project-item-wrapper">
            <div
              className={classNames("project-item", {
                "flex-col": isMobile,
              })}
            >
              <div
                className={classNames("project-image-wrapper", {
                  "!w-full": isMobile,
                })}
              >
                <img
                  className={classNames("project-image", {
                    "!mb-1 !h-16": isMobile,
                  })}
                  src={getRoutePrefix() + image}
                  alt="Project"
                />
              </div>
              <div
                className={classNames("project-content-wrapper", {
                  "!px-6": isMobile,
                })}
              >
                <h5
                  className={classNames("project-name", {
                    "!mb-2 flex justify-center": isMobile,
                  })}
                >
                  <span
                    className={classNames({
                      "text-lg font-medium": isMobile,
                    })}
                  >{`${name}${isMobile ? "" : `(${company})`}`}</span>
                </h5>
                <div
                  className={classNames("project-time", {
                    "!mb-1 text-center !text-base": isMobile,
                  })}
                >
                  {time}
                </div>
                <div
                  className={classNames("project-profile", {
                    "!mb-1 !text-sm": isMobile,
                  })}
                  title={profile}
                >
                  {profile}
                </div>
                <ul className="project-duties">
                  {duties.map((duty) => {
                    return (
                      <li
                        className={classNames("project-duty", {
                          "!text-xs": isMobile,
                        })}
                        key={duty}
                      >
                        {duty}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <ul
              className={classNames(
                "project-actions-wrapper absolute bottom-0 left-0 flex h-0 w-full overflow-y-hidden opacity-0 transition-all group-hover:h-[36px] group-hover:opacity-100",
                {
                  "!h-auto !opacity-100": isMobile,
                }
              )}
            >
              <li className="project-action">
                <a
                  className="project-link"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer external nofollow"
                  title={`刘小聪的项目-${name}-链接地址`}
                >
                  <LinkOutlined type="link" />
                </a>
              </li>
              <li className="project-action">
                <QrcodeOutlined
                  type="qrcode"
                  onClick={() => {
                    onOpenVisibleQr(link);
                  }}
                  title="项目二维码"
                />
              </li>
              <li className="project-action">
                <FileTextOutlined
                  type="file-text"
                  onClick={() => {
                    onOpenVisibleSummary(projectSummary);
                  }}
                  title="项目总结"
                />
              </li>
            </ul>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="resume-project-wrapper relative h-[100vh] w-full">
      <div
        className="absolute left-0 top-0 z-0 h-full w-full bg-[linear-gradient(270deg,_#283048,_#859398)] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getRoutePrefix()}/images/resume/projects/banner.jpg)`,
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
          <h2 className="title">项目经历</h2>
        </div>

        <div
          className={classNames("projects-wrapper", {
            "!h-[80vh] !w-full": isMobile,
          })}
        >
          {isMobile ? (
            <Carousel3d
              childMaxLength={projectsLength}
              z={540}
              blurIncrease={3}
            >
              {renderSlides()}
            </Carousel3d>
          ) : (
            <Swiper
              className="!w-[100vw]"
              slideClassName={classNames("rounded-md overflow-hidden", {
                "!w-[750px]": !isMobile,
                "!w-[80vw]": isMobile,
              })}
              slides={renderSlides()}
            />
          )}
          {/* <Carousel
          className="projects-carousel"
          effect={isMobile ? "scrollx" : "fade"}
          isMobile={isMobile}
          allowArrow
          dots={!isMobile}
        >
          {renderSlides()}
        </Carousel> */}
        </div>
      </div>

      <QrcodeModal
        visible={isVisibleQr}
        content={qrValue}
        onCancel={onCloseVisibleQr}
        isMobile={isMobile}
      />

      <MessageModal
        visible={isVisibleSummary}
        onCancel={onCloseVisibleSummary}
        title="项目总结"
        isMobile={isMobile}
      >
        {summary}
      </MessageModal>
    </div>
  );
}
