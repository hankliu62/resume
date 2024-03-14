"use client";

import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import Typed from "typed.js";

import * as Constants from "@/constants";
import useMobile from "@/hooks/useMobile";
import { getRoutePrefix } from "@/utils/route";

export default function ResumeIndex() {
  const isMobile = useMobile();

  const el = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [Constants.User.Signature, Constants.User.Signature],
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
    <div className="resume-index-wrapper">
      <div className="avatar-wrapper">
        <img
          src={`${getRoutePrefix()}/images/resume/avatar.jpg`}
          className="avatar"
          alt="avatar"
        />
      </div>

      <div className="name-wrapper">
        <h2 className="name">{Constants.User.Name}</h2>
      </div>

      <div className="signature-wrapper">
        <p
          className={classNames("signature", {
            "min-h-[3.6rem] max-w-[100vw] break-all px-6 text-center": isMobile,
          })}
        >
          <span>「</span>
          <span ref={el} />
          <span>」</span>
        </p>
      </div>

      <div className="social-accounts-wrapper">
        <ul
          className={classNames("social-accounts", {
            "justify-between px-6": isMobile,
          })}
        >
          {Constants.SocialAccounts.map((account) => {
            const { type, link, name, icon } = account;
            return (
              <li
                className={classNames(
                  "social-account",
                  `social-account-${type}`,
                  {
                    "!mx-0 scale-[0.8]": isMobile,
                  }
                )}
                key={type}
              >
                <ReactSVG
                  src={`${getRoutePrefix()}/images/resume/circle.svg`}
                  className="social-account-circle"
                />
                <a
                  className="account-link"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer external nofollow"
                  title={`刘小聪的社交账号-${name}`}
                >
                  <ReactSVG
                    src={icon}
                    className="social-account-icon hk-icon"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
