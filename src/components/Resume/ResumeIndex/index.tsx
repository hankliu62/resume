'use client';

import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import Typed from 'typed.js';

import * as Constants from '@/constants';
import useMobile from '@/hooks/useMobile';
import { getRoutePrefix } from '@/utils/route';

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
    <div className="resume-index-wrapper relative h-[100vh] w-full">
      <div
        className="resume-index-banner absolute left-0 top-0 z-0 h-full w-full bg-[#888] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getRoutePrefix()}/images/resume/index/banner.jpg)`,
        }}
      >
        <div
          className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right_,_#fafafa_,_#aaa)]"
          style={{
            mixBlendMode: 'multiply',
            inset: 0,
          }}
        />
      </div>

      <div
        className={classNames('relative z-10 flex h-full flex-col items-center justify-center', {
          '!w-full': isMobile,
        })}
      >
        <div className="avatar-wrapper hidden">
          <img
            src={`${getRoutePrefix()}/images/resume/avatar.jpg`}
            className="avatar h-[160px] w-[160px] rounded-[50%] shadow-md shadow-white/30"
            alt="avatar"
          />
        </div>

        <div className="avatar-wrapper relative mt-2 flex items-center justify-center">
          <div className="avatar relative h-[200px] w-[200px]">
            <div className="relative z-[3] h-[100px] overflow-hidden">
              <div
                className={classNames('h-[200px] w-[200px] bg-cover p-[15px]')}
                style={{
                  backgroundImage: `url(${getRoutePrefix()}/images/resume/avatar-adorn.svg)`,
                }}
              >
                <img
                  className="h-full w-full rounded-t-[200px] object-cover"
                  src={`${getRoutePrefix()}/images/resume/avatar.jpg`}
                  referrerPolicy="no-referrer"
                  alt="avatar"
                />
              </div>
            </div>
            <div className="rotating-ellipse absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] rounded-[100%] border-[2px] border-solid border-[#faad14]">
              <div className="point absolute origin-center animate-[rotate-spin_6s_infinite_linear] rounded-[100%] bg-[#faad14]" />
            </div>
            <div className="relative z-[1] h-[100px] overflow-hidden">
              <div
                className={classNames('-mt-[100px] h-[200px] w-[200px] bg-cover p-[15px]')}
                style={{
                  backgroundImage: `url(${getRoutePrefix()}/images/resume/avatar-adorn.svg)`,
                }}
              >
                <img
                  className="h-full w-full rounded-b-[200px] object-cover"
                  src={`${getRoutePrefix()}/images/resume/avatar.jpg`}
                  referrerPolicy="no-referrer"
                  alt="avatar"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="name-wrapper">
          <h2 className="name text-white">{Constants.User.Name}</h2>
        </div>

        <div className="signature-wrapper">
          <p
            className={classNames('signature text-gray-200', {
              'min-h-[3.6rem] max-w-[100vw] break-all px-6 text-center': isMobile,
            })}
          >
            <span>「</span>
            <span ref={el} />
            <span>」</span>
          </p>
        </div>

        <div className="social-accounts-wrapper">
          <ul
            className={classNames('social-accounts', {
              'justify-between px-6': isMobile,
            })}
          >
            {Constants.SocialAccounts.map((account) => {
              const { type, link, name, icon } = account;
              return (
                <li
                  className={classNames('social-account', `social-account-${type}`, {
                    '!mx-0 scale-[0.8]': isMobile,
                  })}
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
                    <ReactSVG src={icon} className="social-account-icon hk-icon" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
