import throttle from 'lodash/throttle';
import type {
  CSSProperties,
  ReactNode} from 'react';
import React, {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import SectionContext from './sectionContext';

type TScrollCallbackParams = {
  activeSection: number;
  scrollingStarted: boolean;
  sectionScrolledPosition: number;
};

interface ISectionsContainerProps {
  scrollCallback?: (params: TScrollCallbackParams) => void;
  delay?: number;
  verticalAlign?: boolean;
  scrollBar?: boolean;
  navigation?: boolean;
  className?: string;
  sectionClassName?: string;
  navigationClass?: string;
  navigationAnchorClass?: string;
  activeClass?: string;
  sectionPaddingTop?: string;
  sectionPaddingBottom?: string;
  arrowNavigation?: boolean;
  activeSection?: number;
  touchNavigation?: boolean;
  anchors?: string[];
  children?: ReactNode;
}

const SectionsContainer = ({
  scrollCallback = undefined,
  delay = 1000,
  verticalAlign = false,
  scrollBar = false,
  navigation = true,
  className = 'SectionContainer',
  sectionClassName = 'Section',
  anchors = [],
  activeClass = 'active',
  sectionPaddingTop = '0',
  sectionPaddingBottom = '0',
  arrowNavigation = true,
  activeSection = 0,
  touchNavigation = true,
  children,
  navigationAnchorClass,
  navigationClass,
}: ISectionsContainerProps) => {
  const [stateActiveSection, setStateActiveSection] = useState<number>(activeSection);
  const stateActiveSectionRef = useRef<number>(stateActiveSection);

  const [scrollingStarted, setScrollingStarted] = useState<boolean>(false);
  const scrollingStartedRef = useRef<boolean>(false);
  const [sectionScrolledPosition, setSectionScrolledPosition] = useState<number>(0);

  const scrollCallbackParams = useMemo<TScrollCallbackParams>(
    () => ({
      activeSection: stateActiveSection,
      scrollingStarted,
      sectionScrolledPosition,
    }),
    [scrollingStarted, sectionScrolledPosition, stateActiveSection],
  );

  const resetScrollTimer = useRef<number>();
  const childrenLength = useRef<number>(children ? (children as any).length : 0);

  const contextData = useMemo(() => {
    return {
      verticalAlign: verticalAlign,
      sectionClassName: sectionClassName,
      sectionPaddingTop: sectionPaddingTop,
      sectionPaddingBottom: sectionPaddingBottom,
    };
  }, [verticalAlign, sectionClassName, sectionPaddingTop, sectionPaddingBottom]);

  const addChildrenWithAnchorId = useCallback(() => {
    let index = 0;

    return Children.map(children, (child) => {
      const id = anchors[index];

      index++;

      return id
        ? cloneElement(child as any, {
            id: id,
          })
        : child;
    });
  }, [anchors, children]);

  const addOverflowToBody = useCallback(() => {
    document.querySelector('body')!.style.overflow = 'hidden';
  }, []);

  const removeOverflowFromBody = useCallback(() => {
    document.querySelector('body')!.style.overflow = 'initial';
  }, []);

  const handleScrollCallback = useCallback(() => {
    if (scrollCallback) {
      setTimeout(() => scrollCallback(scrollCallbackParams), 0);
    }
  }, [scrollCallback, scrollCallbackParams]);

  const clearResetScrollTimer = useCallback(() => {
    if (resetScrollTimer.current) {
      clearTimeout(resetScrollTimer.current);
    }
  }, []);

  const resetScroll = useCallback(() => {
    clearResetScrollTimer();

    resetScrollTimer.current = setTimeout(() => {
      setScrollingStarted(false);
      scrollingStartedRef.current = false;
    }, delay + 300) as unknown as number;
  }, [clearResetScrollTimer, delay]);

  const addActiveClass = useCallback(() => {
    // 先移除 Active className
    const activeLinks = document.querySelectorAll(
      `a:not([href="#${anchors[stateActiveSectionRef.current]}"])`,
    );

    if (activeLinks) {
      for (const activeLink of activeLinks) {
        const elemClassName = activeLink.className
          .replaceAll(activeClass, '')
          .replaceAll(/\s+/g, ' ')
          .trim();

        activeLink.className = `${elemClassName} ${activeClass}`.trim();
      }
    }
  }, [activeClass, anchors]);

  const setAnchorAndSectionTransition = useCallback(
    (index: number) => {
      if (anchors.length === 0 || index === -1 || index >= anchors.length) {
        return false;
      }

      // 设置Hash
      const hash = anchors[index];
      const nextHash = '#' + hash;
      if (window.location.hash !== nextHash) {
        window.location.hash = '#' + hash;
      }

      // 设置translate偏移量和当前选中的Section
      const position = 0 - index * window.innerHeight;

      setScrollingStarted(true);
      scrollingStartedRef.current = true;
      setStateActiveSection(index);
      stateActiveSectionRef.current = index;
      setSectionScrolledPosition(position);

      resetScroll();
      handleScrollCallback();

      // 修改当前选中的Section时，添加对应的active class
      addActiveClass();
    },
    [anchors, addActiveClass, handleScrollCallback, resetScroll],
  );

  const handleAnchor = useCallback(() => {
    const hash = window.location.hash.slice(1);
    const nextActiveSection = anchors.indexOf(hash);

    if (stateActiveSectionRef.current !== nextActiveSection) {
      setAnchorAndSectionTransition(nextActiveSection);
    }
  }, [anchors, setAnchorAndSectionTransition]);

  const handleResize = useCallback(() => {
    const position = 0 - stateActiveSectionRef.current * window.innerHeight;

    setScrollingStarted(true);
    scrollingStartedRef.current = true;
    setSectionScrolledPosition(position);

    resetScroll();
  }, [resetScroll]);

  // 通过箭头修改当前显示的Page
  const handleArrowKeys = useCallback(
    (e: any) => {
      const event = window.event || e;
      const nextActiveSection =
        event.keyCode === 38 || event.keyCode === 37
          ? stateActiveSectionRef.current - 1
          : event.keyCode === 40 || event.keyCode === 39
            ? stateActiveSectionRef.current + 1
            : -1;

      if (
        scrollingStartedRef.current ||
        nextActiveSection < 0 ||
        childrenLength.current === nextActiveSection
      ) {
        return false;
      }

      setAnchorAndSectionTransition(nextActiveSection);
    },
    [setAnchorAndSectionTransition],
  );

  // 处理滚轮事件的滚动
  const handleMouseWheel = useCallback(
    throttle((event: any) => {
      const e = window.event || event;
      const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      const nextActiveSection = stateActiveSectionRef.current - delta;

      if (
        scrollingStartedRef.current ||
        nextActiveSection < 0 ||
        childrenLength.current === nextActiveSection
      ) {
        return false;
      }

      setAnchorAndSectionTransition(nextActiveSection);
    }, 100),
    [setAnchorAndSectionTransition],
  );

  // 处理wheel事件
  useEffect(() => {
    window.addEventListener('wheel', handleMouseWheel, false);
    window.addEventListener('mousewheel', handleMouseWheel, false);
    window.addEventListener('DOMMouseScroll', handleMouseWheel, false);
    return () => {
      window.removeEventListener('wheel', handleMouseWheel);
      window.removeEventListener('mousewheel', handleMouseWheel);
      window.removeEventListener('DOMMouseScroll', handleMouseWheel);
    };
  }, [handleMouseWheel]);

  const handleTouchNav = useCallback(() => {
    const touchsurface = document.querySelector('.' + className);
    let swipedir: string;
    let startX: number;
    let startY: number;
    let distX: number;
    let distY: number;
    const threshold = 50;
    const restraint = 100;
    const allowedTime = 1000;
    let elapsedTime: number;
    let startTime: number;

    const handleswipe = function (swipeDir: string) {
      console.log(swipeDir);
    };

    const handleTouchNavStart = (e: any) => {
      if (scrollingStartedRef.current) {
        return;
      }
      const touchobj = e.changedTouches[0];
      swipedir = 'none';
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = Date.now();
    };

    const handleTouchNavMove = (e: any) => {
      if (scrollingStartedRef.current) {
        return;
      }

      e.preventDefault();
    };

    const handleTouchNavEnd = (e: any) => {
      if (scrollingStartedRef.current) {
        return;
      }

      const touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX;
      distY = touchobj.pageY - startY;
      elapsedTime = Date.now() - startTime;

      if (
        elapsedTime <= allowedTime &&
        Math.abs(distY) >= threshold &&
        Math.abs(distX) <= restraint
      ) {
        swipedir = distY < 0 ? 'up' : 'down';
        const direction = stateActiveSectionRef.current + 1 * (swipedir === 'down' ? -1 : 1);
        setAnchorAndSectionTransition(direction);
      }
      handleswipe(swipedir);
    };

    touchsurface && touchsurface.addEventListener('touchstart', handleTouchNavStart, false);

    touchsurface && touchsurface.addEventListener('touchmove', handleTouchNavMove, false);

    touchsurface && touchsurface.addEventListener('touchend', handleTouchNavEnd, false);

    return () => {
      touchsurface && touchsurface.removeEventListener('touchstart', handleTouchNavStart);

      touchsurface && touchsurface.removeEventListener('touchmove', handleTouchNavMove);

      touchsurface && touchsurface.removeEventListener('touchend', handleTouchNavEnd);
    };
  }, [className, setAnchorAndSectionTransition]);

  useEffect(() => {
    setAnchorAndSectionTransition(activeSection);
  }, [activeSection]);

  useEffect(() => {
    clearResetScrollTimer();
    removeOverflowFromBody();

    handleResize();
    window.addEventListener('resize', handleResize);

    if (!scrollBar) {
      addOverflowToBody();
      handleAnchor();

      window.addEventListener('hashchange', handleAnchor, false);

      if (arrowNavigation) {
        window.addEventListener('keydown', handleArrowKeys);
      }

      if (touchNavigation) {
        handleTouchNav();
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('hashchange', handleAnchor);

      if (arrowNavigation) {
        window.removeEventListener('keydown', handleArrowKeys);
      }
    };
  }, []);

  const renderNavigation = () => {
    const navigationStyle: CSSProperties = {
      position: 'fixed',
      zIndex: '10',
      right: '20px',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    };

    const anchorElements = anchors.map((link: string, index: number) => {
      const anchorStyle: CSSProperties = {
        display: 'block',
        margin: '10px',
        borderRadius: '100%',
        backgroundColor: '#556270',
        padding: '5px',
        transition: 'all 0.2s',
        transform: stateActiveSection === index ? 'scale(1.3)' : 'none',
      };

      return (
        <a
          href={`#${link}`}
          key={link}
          className={navigationAnchorClass || 'Navigation-Anchor'}
          style={navigationAnchorClass ? {} : anchorStyle}
        />
      );
    });

    return (
      <div
        className={navigationClass || 'Navigation'}
        style={navigationClass ? {} : navigationStyle}
      >
        {anchorElements}
      </div>
    );
  };

  const containerStyle: CSSProperties = {
    height: '100%',
    width: '100%',
    position: 'relative',
    transform: `translate3d(0px, ${sectionScrolledPosition}px, 0px)`,
    transition: `all ${delay}ms ease`,
  };

  return (
    <SectionContext.Provider value={contextData}>
      <div>
        <div className={className} style={containerStyle}>
          {scrollBar ? addChildrenWithAnchorId() : children}
        </div>
        {navigation && !scrollBar ? renderNavigation() : null}
      </div>
    </SectionContext.Provider>
  );
};

export default SectionsContainer;
