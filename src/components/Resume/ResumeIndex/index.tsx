"use client";

import classNames from "classnames";
import React from "react";
import { ReactSVG } from "react-svg";

import * as Constants from "@/constants";
import { getRoutePrefix } from "@/utils/route";

interface IResumeIndexProps {
  isMobile: boolean;
}

export default function ResumeIndex({ isMobile }: IResumeIndexProps) {
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
        <p className="signature">{Constants.User.Signature}</p>
      </div>

      <div className="social-accounts-wrapper">
        <ul className="social-accounts">
          {Constants.SocialAccounts.map((account) => {
            const { type, link, name, icon } = account;
            return (
              <li
                className={classNames(
                  "social-account",
                  `social-account-${type}`
                )}
                key={type}
              >
                <ReactSVG
                  src="/images/resume/circle.svg"
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
