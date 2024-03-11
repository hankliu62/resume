"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { FilePdfOutlined, UpOutlined } from "@ant-design/icons";
import { ConfigProvider as AntdConfigProvider, Popover, Watermark } from "antd";
import zhCN from "antd/locale/zh_CN";
// import AOS from "aos";
import React, { useEffect, useMemo } from "react";
// import ReactFullpage from '@fullpage/react-fullpage';
import { Section, SectionsContainer } from "react-fullpage";

import {
  ResumeArticle,
  ResumeExperience,
  ResumeIndex,
  ResumeIntroduction,
  ResumeProject,
  ResumeSkill,
} from "@/components/Resume";
import { getRoutePrefix } from "@/utils/route";

// const Options = {
//   licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
//   anchors: ['resume-index', 'resume-introduction', 'resume-skill', 'resume-experience',
//     'resume-project', 'resume-article'],
//   navigationTooltips: ['简介', '自我介绍', '技能', '工作经历', '项目经验', '个人博客'],
//   scrollBar: false,
//   navigation: true,
//   verticalAlign: false,
//   paddingTop: '30px',
//   paddingBottom: '30px',
//   arrowNavigation: true,
//   credits: {
//     enabled: true,
//   }
// };

const Options = {
  activeClass: "active", // the class that is appended to the sections links
  anchors: [
    "resume-index",
    "resume-introduction",
    "resume-skill",
    "resume-experience",
    "resume-project",
    "resume-article",
  ], // the anchors for each sections
  arrowNavigation: true, // use arrow keys
  className: "resume-properties-section-container", // the class name for the section container
  delay: 1000, // the scroll animation speed
  navigation: true, // use dots navigatio
  scrollBar: false, // use the browser default scrollbar
  sectionClassName: "resume-properties-section resume-section-container", // the section class name
  sectionPaddingTop: "0", // the section top padding
  sectionPaddingBottom: "0", // the section bottom padding
  verticalAlign: false, // align the content of each section vertical
};

interface IResumeProps {
  isMobile: boolean;
}

export default function Resume() {
  const isMobile = false;
  const options = useMemo(() => {
    if (isMobile) {
      return {
        ...Options,
        navigation: false,
        sectionPaddingTop: "0",
        sectionPaddingBottom: "0",
      };
    }

    return Options;
  }, [isMobile]);

  useEffect(() => {
    // AOS.init({
    //   // Global settings:
    //   disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    //   startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
    //   initClassName: "aos-init", // class applied after initialization
    //   animatedClassName: "aos-animate", // class applied on animation
    //   useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    //   disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    //   debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    //   throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    //   // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    //   offset: 120, // offset (in px) from the original trigger point
    //   delay: 0, // values from 0 to 3000, with step 50ms
    //   duration: 400, // values from 0 to 3000, with step 50ms
    //   easing: "ease", // default easing for AOS animations
    //   once: false, // whether animation should happen only once - while scrolling down
    //   mirror: false, // whether elements should animate out while scrolling past them
    //   anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
    // });
  }, []);

  return (
    <div className="resume-container">
      <StyleProvider hashPriority="high">
        <AntdConfigProvider locale={zhCN}>
          <Watermark
            content="HankLiu Resume"
            font={{ color: "rgba(0, 0, 0, 0.1)" }}
            className="flex h-full flex-1 flex-col"
          >
            <SectionsContainer {...options}>
              <Section>
                <div className="section resume-section resume-section-index">
                  <ResumeIndex isMobile={isMobile} />
                </div>
              </Section>
              <Section>
                <div
                  className="section resume-section resume-section-introduction"
                  style={{
                    backgroundImage: `url(${getRoutePrefix()}/images/resume/background.png)`,
                  }}
                >
                  <ResumeIntroduction isMobile={isMobile} />
                </div>
              </Section>
              <Section>
                <div className="section resume-section resume-section-skill">
                  <ResumeSkill isMobile={isMobile} />
                </div>
              </Section>
              <Section>
                <div
                  className="section resume-section resume-section-experience"
                  style={{
                    backgroundImage: `url(${getRoutePrefix()}/images/resume/background.png)`,
                  }}
                >
                  <ResumeExperience isMobile={isMobile} />
                </div>
              </Section>
              <Section>
                <div className="section resume-section resume-section-project overflow-x-hidden">
                  <ResumeProject isMobile={isMobile} />
                </div>
              </Section>
              <Section>
                <div className="section resume-section resume-section-article">
                  <ResumeArticle isMobile={isMobile} />
                </div>
              </Section>
            </SectionsContainer>
          </Watermark>
        </AntdConfigProvider>
      </StyleProvider>

      {/* <ReactFullpage
        {...options}
        render={() => {
          return (
            <div className="resume-section-container">
              <ReactFullpage.Wrapper>
                <div className="section resume-section resume-section-index">
                  <ResumeIndex isMobile={isMobile} />
                </div>
                <div className="section resume-section resume-section-introduction">
                  <ResumeIntroduction isMobile={isMobile} />
                </div>
                <div className="section resume-section resume-section-skill">
                  <ResumeSkill isMobile={isMobile} />
                </div>
                <div className="section resume-section resume-section-experience">
                  <ResumeExperience isMobile={isMobile} />
                </div>
                <div className="section resume-section resume-section-project">
                  <ResumeProject isMobile={isMobile} />
                </div>
                <div className="section resume-section resume-section-article">
                  <ResumeArticle isMobile={isMobile} />
                </div>
              </ReactFullpage.Wrapper>
            </div>
          );
        }}
      /> */}
      <div className="arrow-wrapper">
        <UpOutlined />
      </div>
      <div className="pdf-wrapper">
        <Popover placement="top" content={<span>PDF简历</span>}>
          <a
            className="link-pdf"
            href={`${getRoutePrefix()}/resume.pdf`}
            target="_blank"
            title="刘小聪的PDF简历"
            rel="noreferrer"
          >
            <FilePdfOutlined />
          </a>
        </Popover>
      </div>
    </div>
  );
}
