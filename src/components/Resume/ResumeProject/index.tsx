"use client";

import {
  FileTextOutlined,
  LinkOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import classNames from "classnames";
import React, { useState } from "react";

import { Carousel, MessageModal, QrcodeModal } from "@/components";
import Carousel3d from "@/components/Carousel3d";
import CarouselThreeD from "@/components/CarouselThreeD";
import LazyBgImage from "@/components/LazyBgImage";
import LazyImage from "@/components/LazyImage";
import Swiper from "@/components/Swiper";
import * as Constants from "@/constants";
import useMobile from "@/hooks/useMobile";
import { getRoutePrefix } from "@/utils/route";

type TProject = (typeof Constants.Projects)[0];

export default function ResumeProject() {
  const isMobile = useMobile();

  const projectsLength = Constants.Projects.length;

  const [isVisibleQr, setIsVisibleQr] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [isVisibleSummary, setIsVisibleSummary] = useState(false);
  const [summary, setSummary] = useState("");

  const [isVisibleProject, setIsVisibleProject] = useState(false);
  const [project, setProject] = useState<TProject>();

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

  const onOpenVisibleProject = (project: TProject) => {
    setProject(project);
    setIsVisibleProject(true);
  };

  const onCloseVisibleProject = () => {
    setProject(undefined);
    setIsVisibleProject(false);
  };

  const renderSlide = (
    project: (typeof Constants.Projects)[0],
    preview?: boolean
  ) => {
    const {
      name,
      company,
      link,
      time,
      image,
      profile,
      summary: projectSummary,
    } = project;

    const isInMobileCarousel = !preview && isMobile;
    const duties = isInMobileCarousel ? project.duties : project.duties;

    return (
      <div
        className={classNames(
          "project-wrapper group relative overflow-hidden bg-white ",
          {
            "!h-[72vh] w-[62vw]": isInMobileCarousel,
            "!h-[450px] w-[750px]": !isMobile,
            "rounded-md shadow-[inset_0_0_10px_#ddd]": !isMobile || !preview,
            "!h-full w-full": isMobile && preview,
          }
        )}
        key={name + company}
      >
        <div className="project-item-wrapper pb-[20px]">
          <div
            className={classNames("project-item", {
              "flex-col": isMobile,
              "pt-[20px]": !isMobile || !preview,
            })}
            onClick={() =>
              isInMobileCarousel ? onOpenVisibleProject(project) : null
            }
            aria-hidden
          >
            <div
              className={classNames("project-image-wrapper", {
                "!w-full": isMobile,
              })}
            >
              <LazyImage
                className={classNames("project-image", {
                  "mx-auto !mb-1 !h-16 !max-w-[60%]": isMobile,
                })}
                src={getRoutePrefix() + image}
                alt="Project"
              />
            </div>
            <div
              className={classNames("project-content-wrapper", {
                "!px-6": isInMobileCarousel,
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
                    truncate: isInMobileCarousel,
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
                  "line-clamp-5": isInMobileCarousel,
                })}
                title={profile}
              >
                {profile}
              </div>
              <ul
                className={classNames("project-duties mb-0 list-decimal", {
                  "pl-[20px]": !isMobile,
                  "pl-5": isMobile,
                })}
              >
                {duties.map((duty) => {
                  return (
                    <li
                      className={classNames("project-duty", {
                        "!text-sm": isMobile,
                      })}
                      key={duty}
                    >
                      <div
                        className={classNames({
                          "line-clamp-2": isInMobileCarousel,
                        })}
                      >
                        {duty}
                      </div>
                    </li>
                  );
                })}
                {/* {isInMobileCarousel && (
                  <li
                    className={classNames("project-duty", {
                      "!text-xs": isMobile,
                    })}
                  >
                    ...
                  </li>
                )} */}
              </ul>
            </div>
          </div>
          <ul
            className={classNames(
              "project-actions-wrapper absolute bottom-0 left-0 flex h-0 w-full overflow-y-hidden opacity-0 transition-all group-hover:h-[36px] group-hover:opacity-100",
              {
                "!h-auto !opacity-100": isMobile,
                "!hidden": isMobile && preview,
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
  };

  const renderSlides = () => {
    return Constants.Projects.map((project) => renderSlide(project));
  };

  return (
    <div className="resume-project-wrapper relative h-[100vh] w-full">
      <LazyBgImage
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
      </LazyBgImage>

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
            项目经历
          </h2>
        </div>

        <div
          className={classNames("projects-wrapper", {
            "!h-[80vh] !w-full": isMobile,
          })}
        >
          {isMobile ? (
            <CarouselThreeD
              childMaxLength={projectsLength}
              z={540}
              blurIncrease={3}
            >
              {renderSlides()}
            </CarouselThreeD>
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

      {isVisibleProject && (
        <Modal
          open={isVisibleProject}
          footer={null}
          width="90%"
          onCancel={onCloseVisibleProject}
          wrapClassName="project-detail-modal"
        >
          {renderSlide(project!, true)}
        </Modal>
      )}

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
