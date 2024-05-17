'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { FilePdfOutlined, UpOutlined } from '@ant-design/icons';
// 要收费(不再使用)
// import ReactFullpage from "@fullpage/react-fullpage";
import { ConfigProvider as AntdConfigProvider, Popover, Watermark } from 'antd';
import zhCN from 'antd/locale/zh_CN';
// import AOS from "aos";
import React, { useEffect, useMemo } from 'react';

// import { Section, SectionsContainer } from "@/components/FullPage";
import FullPage from '@hankliu/rc-fullpage';
import {
  ResumeArticle,
  ResumeExperience,
  ResumeIndex,
  ResumeIntroduction,
  ResumeProject,
  ResumeSkill,
} from '@/components/Resume';
import useMobile from '@/hooks/useMobile';
import { getRoutePrefix } from '@/utils/route';

const Options = {
  activeClass: 'active', // 当前正在显示的 Section 的 classname
  anchors: [
    'resume-index',
    'resume-introduction',
    'resume-skill',
    'resume-experience',
    'resume-project',
    'resume-article',
  ], // 对应 section 列表元素的锚点名称列表
  shortcutKey: true, // 是否支持箭头快捷键
  className: 'resume-properties-section-container', // 组件外层元素 classname
  delay: 1000, // 滚动持续动画时间
  dots: false, // 是否显示面板指示点
  scrollBar: false, // 是否使用浏览器默认滚动条
  sectionClassName: 'resume-properties-section resume-section-container', // 组件 Section 元素 classname
  sectionPaddingTop: '0', // Section 元素的上边距
  sectionPaddingBottom: '0', // Section 元素的下边距
  verticalAlign: true, // 是否为垂直方向全屏滚动
  touchable: true, // 是否支持 Touch 事件
};

// interface IResumeProps {
//   isMobile: boolean;
// }

export default function Resume() {
  const isMobile = useMobile();
  const options = useMemo(() => {
    if (isMobile) {
      return {
        ...Options,
        navigation: false,
        sectionPaddingTop: '0',
        sectionPaddingBottom: '0',
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

  const renderResumeIndex = () => {
    return (
      <div className="section resume-section resume-section-index">
        <ResumeIndex />
      </div>
    );
  };

  const renderResumeIntroduction = () => {
    return (
      <div
        className="section resume-section resume-section-introduction"
        style={{
          backgroundImage: `url(${getRoutePrefix()}/images/resume/background.png)`,
        }}
      >
        <ResumeIntroduction />
      </div>
    );
  };

  const renderResumeExperience = () => {
    return (
      <div
        className="section resume-section resume-section-experience"
        style={{
          backgroundImage: `url(${getRoutePrefix()}/images/resume/background.png)`,
        }}
      >
        <ResumeExperience />
      </div>
    );
  };

  const renderResumeSkill = () => {
    return (
      <div className="section resume-section resume-section-skill">
        <ResumeSkill />
      </div>
    );
  };

  const renderResumeProject = () => {
    return (
      <div className="section resume-section resume-section-project overflow-x-hidden">
        <ResumeProject />
      </div>
    );
  };

  const renderResumeArticle = () => {
    return (
      <div className="section resume-section resume-section-article">
        <ResumeArticle />
      </div>
    );
  };

  // const renderReactFullpageWrapper = () => {
  //   const Options = {
  //     anchors: [
  //       "resume-index",
  //       "resume-introduction",
  //       "resume-skill",
  //       "resume-experience",
  //       "resume-project",
  //       "resume-article",
  //     ],
  //     navigationTooltips: [
  //       "简介",
  //       "自我介绍",
  //       "技能",
  //       "工作经历",
  //       "项目经验",
  //       "个人博客",
  //     ],
  //     scrollBar: false,
  //     navigation: true,
  //     verticalAlign: false,
  //     paddingTop: "0",
  //     paddingBottom: "0",
  //     arrowNavigation: true,
  //     credits: {
  //       enabled: false,
  //     },
  //   };

  //   return (
  //     <ReactFullpage
  //       {...Options}
  //       render={(comp) => (
  //         <ReactFullpage.Wrapper>
  //           {renderResumeIndex()}
  //           {renderResumeIntroduction()}
  //           {renderResumeSkill()}
  //           {renderResumeExperience()}
  //           {renderResumeProject()}
  //           {renderResumeArticle()}
  //         </ReactFullpage.Wrapper>
  //       )}
  //     />
  //   );
  // };

  const renderSectionsContainer = () => {
    return (
      <FullPage {...options}>
        <FullPage.Section>{renderResumeIndex()}</FullPage.Section>
        <FullPage.Section>{renderResumeIntroduction()}</FullPage.Section>
        <FullPage.Section>{renderResumeSkill()}</FullPage.Section>
        <FullPage.Section>{renderResumeExperience()}</FullPage.Section>
        <FullPage.Section>{renderResumeProject()}</FullPage.Section>
        <FullPage.Section>{renderResumeArticle()}</FullPage.Section>
      </FullPage>
    );
  };

  return (
    <div className="resume-container">
      <StyleProvider hashPriority="high">
        <AntdConfigProvider locale={zhCN}>
          <Watermark
            content="HankLiu Resume"
            font={{ color: 'rgba(0, 0, 0, 0.1)' }}
            className="flex h-full flex-1 flex-col"
          >
            {renderSectionsContainer()}
          </Watermark>
        </AntdConfigProvider>
      </StyleProvider>

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
