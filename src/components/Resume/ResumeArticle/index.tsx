"use client";

import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Typed from "typed.js";

import LazyBgImage from "@/components/LazyBgImage";
import * as Constants from "@/constants";
import useMobile from "@/hooks/useMobile";
import { getRoutePrefix } from "@/utils/route";

export default function ResumeArticle() {
  const isMobile = useMobile();

  const el = useRef<HTMLSpanElement | null>(null);
  const contenedor = useRef<HTMLDivElement | null>(null);
  const cube = useRef<HTMLUListElement | null>(null);

  // const [rotateX, setRotateX] = useState<number>(-25);
  // const [rotateY, setRotateY] = useState<number>(32);

  const [offsetLeft, setOffsetLeft] = useState<number>(0);
  const [offsetTop, setOffsetTop] = useState<number>(0);

  useEffect(() => {
    const rect = contenedor.current?.getBoundingClientRect();
    setOffsetLeft((rect?.left || 0) + 50);
    setOffsetTop((rect?.top || 0) + 50);
  }, []);

  const onCubeMouseMove = useCallback<
    React.MouseEventHandler<HTMLUListElement>
  >(
    (e) => {
      window.requestAnimationFrame(function () {
        const elem = cube.current;
        if (elem) {
          elem.style.transform = `rotateX(${e.pageY - offsetTop}deg) rotateY(${
            e.pageX - offsetLeft
          }deg)`;
        }
      });

      // setRotateX(e.pageY - offsetTop);
      // setRotateY(e.pageX - offsetLeft);
    },
    [offsetLeft, offsetTop]
  );

  const onCubeMouseLeave = useCallback<
    React.MouseEventHandler<HTMLUListElement>
  >(() => {
    // setRotateX(-25);
    // setRotateY(32);

    window.requestAnimationFrame(function () {
      const elem = cube.current;
      if (elem) {
        elem.style.transform = `rotateX(-25deg) rotateY(32deg)`;
      }
    });
  }, []);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "努力去听风的声音，不必在意风的方向。",
        "等风来不如追风去，追逐的过程就是人生的意义。",
      ],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className="resume-article-wrapper">
      <LazyBgImage
        className="resume-article-banner"
        style={{
          backgroundImage: `url(${getRoutePrefix()}/images/resume/article/banner.jpg)`,
        }}
      >
        <div className="resume-article-banner-mask" />
      </LazyBgImage>
      <div
        className={classNames("resume-article-content", {
          "flex !w-full flex-col-reverse px-6": isMobile,
        })}
      >
        <div
          className={classNames("title-wrapper", {
            "min-h-[30vh] text-[3rem]": isMobile,
          })}
        >
          <h1
            className={classNames("title", {
              "text-center !text-4xl": isMobile,
            })}
          >
            <a
              className="link-blog"
              href={Constants.BlogLink}
              target="_blank"
              rel="noopener noreferrer external nofollow"
              title="刘小聪的个人博客"
            >
              HankLiu的博客小屋
            </a>
          </h1>
          <div
            className={classNames("sub-title", {
              "!text-xl": isMobile,
            })}
          >
            <span ref={el} />
            {/* <span className="blinking-cursor">|</span> */}
          </div>
        </div>

        <div
          className={classNames({
            "flex h-52 justify-center": isMobile,
          })}
        >
          <div className="contenedor" ref={contenedor}>
            <ul
              className="cube animar"
              ref={cube}
              // style={{
              //   transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              // }}
              onMouseMove={isMobile ? () => {} : onCubeMouseMove}
              onMouseLeave={isMobile ? () => {} : onCubeMouseLeave}
            >
              <li className="cara">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  height="100"
                  width="100"
                  viewBox="-50 -50 200 200"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    strokeWidth="5"
                    stroke="black"
                    strokeOpacity="0.5"
                    fillOpacity="0"
                  ></circle>
                  <rect
                    id="clockwise"
                    x="47.5"
                    y="27.5"
                    width="5"
                    height="25"
                    rx="2.5"
                    ry="2.5"
                    fill="black"
                    fillOpacity="0.5"
                    transform="rotate(33010 50 50)"
                  ></rect>
                  <rect
                    id="minute"
                    x="48.5"
                    y="16.5"
                    width="3"
                    height="35"
                    rx="1.5"
                    ry="1.5"
                    fill="black"
                    fillOpacity="0.5"
                    transform="rotate(120 50 50)"
                  ></rect>
                </svg>
              </li>
              <li className="cara">K</li>
              <li className="cara">X</li>
              <li className="cara">L</li>
              <li className="cara">C</li>
              <li className="cara">Q</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
