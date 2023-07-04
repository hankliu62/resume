"use client";

import {
  FileTextOutlined,
  LinkOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

import { Carousel, MessageModal, QrcodeModal } from "@/components";
import * as Constants from "@/constants";

interface IResumeProjectProps {
  isMobile: boolean;
}

export default function ResumeProject({ isMobile }: IResumeProjectProps) {
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

  return (
    <div className="resume-project-wrapper">
      <div className="title-wrapper">
        <h2 className="title">项目经历</h2>
      </div>

      <div className="projects-wrapper">
        <Carousel
          className="projects-carousel"
          effect={isMobile ? "scrollx" : "fade"}
          isMobile={isMobile}
          allowArrow
          dots={!isMobile}
        >
          {Constants.Projects.map((project) => {
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
              <div className="project-wrapper" key={company}>
                <div className="project-item-wrapper">
                  <div className="project-item">
                    <div className="project-image-wrapper">
                      <img
                        className="project-image"
                        src={image}
                        alt="Project"
                      />
                    </div>
                    <div className="project-content-wrapper">
                      <h5 className="project-name">
                        {`${name}${isMobile ? "" : `(${company})`}`}
                      </h5>
                      <div className="project-time">{time}</div>
                      <div className="project-profile" title="profile">
                        {profile}
                      </div>
                      <ul className="project-duties">
                        {duties.map((duty) => {
                          return (
                            <li className="project-duty" key={duty}>
                              {duty}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <ul className="project-actions-wrapper">
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
          })}
        </Carousel>
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
