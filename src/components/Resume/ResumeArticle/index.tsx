"use client";

import React from "react";

import * as Constants from "@/constants";

interface IResumeArticleProps {
  isMobile: boolean;
}

export default function ResumeArticle({ isMobile }: IResumeArticleProps) {
  return (
    <div className="resume-article-wrapper">
      <div className="title-wrapper">
        <h1 className="title">
          <a
            className="link-blog"
            href={Constants.BlogLink}
            target="_blank"
            rel="noopener noreferrer external nofollow"
            title="刘小聪的个人博客"
          >
            个人博客
          </a>
        </h1>
        <div className="content-wrapper">开发过程中，敬请期待</div>
      </div>
    </div>
  );
}
