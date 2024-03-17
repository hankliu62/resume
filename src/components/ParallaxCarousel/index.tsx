import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import classNames from "classnames";
import BannerAnim from "rc-banner-anim";
import QueueAnim from "rc-queue-anim";
import { TweenOneGroup } from "rc-tween-one";
import {
  JSX,
  memo,
  ReactElement,
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

const Element = BannerAnim.Element;

export interface IParallaxCarouselProps<T> {
  className?: string;
  list: T[];
  width?: number;
  leftChildrenWidth?: number;
  height?: number;
  renderLeftChildren: (data: T) => ReactElement | JSX.Element;
  renderRightChildren: (data: T) => ReactElement | JSX.Element;
}

const typedMemo: <T>(c: T) => T = memo;

const ParallaxCarousel = function <T>({
  className,
  list,
  width = 750,
  leftChildrenWidth = 140,
  height = 360,
  renderLeftChildren,
  renderRightChildren,
}: IParallaxCarouselProps<T>) {
  const [showInt, setShowInt] = useState<number>(0);
  const [delay, setDelay] = useState<number>(0);
  const [imgAnim, setImgAnim] = useState<
    Array<{ translateX: number[]; opacity: number[] }>
  >([
    { translateX: [0, 300], opacity: [1, 0] },
    { translateX: [0, -300], opacity: [1, 0] },
  ]);

  const oneEnter = useRef<boolean>(false);
  const bannerImg = useRef<any>();
  const bannerText = useRef<any>();

  const listLength = useMemo<number>(() => list.length, [list]);

  const onChange = useCallback(() => {
    if (!oneEnter.current) {
      setDelay(300);
      oneEnter.current = true;
    }
  }, []);

  const onLeft = useCallback(() => {
    let currentShowInt = showInt;
    currentShowInt -= 1;
    if (currentShowInt <= 0) {
      currentShowInt = 0;
    }

    setShowInt(currentShowInt);
    setImgAnim([
      { translateX: [0, -300], opacity: [1, 0] },
      { translateX: [0, 300], opacity: [1, 0] },
    ]);

    bannerImg.current.prev();
    bannerText.current.prev();
  }, [showInt]);

  const onRight = useCallback(() => {
    let currentShowInt = showInt;
    currentShowInt += 1;
    if (currentShowInt > listLength - 1) {
      currentShowInt = listLength - 1;
    }

    setShowInt(currentShowInt);
    setImgAnim([
      { translateX: [0, 300], opacity: [1, 0] },
      { translateX: [0, -300], opacity: [1, 0] },
    ]);

    bannerImg.current.next();
    bannerText.current.next();
  }, [listLength, showInt]);

  const getDuration = useCallback((e: any) => {
    if (e.key === "map") {
      return 800;
    }
    return 1000;
  }, []);

  const leftQueueAnim = list.map((item, i) => (
    <Element
      key={i}
      style={{
        // background: item.color,
        height: "100%",
      }}
      leaveChildHide
    >
      <QueueAnim
        animConfig={imgAnim}
        duration={getDuration}
        delay={[i ? 300 : delay, 0]}
        ease={["easeOutCubic", "easeInQuad"]}
        key="img-wrapper"
      >
        {renderLeftChildren(item)}
      </QueueAnim>
    </Element>
  ));

  const rightQueueAnim = list.map((item, i) => {
    return (
      <Element key={i}>
        <QueueAnim
          type="bottom"
          duration={1000}
          delay={[i ? 800 : delay + 500, 0]}
        >
          {renderRightChildren(item)}
        </QueueAnim>
      </Element>
    );
  });
  return (
    <div
      className={`${className}-wrapper transition-background relative duration-[1s]`}
      // style={{ background: dataArray[showInt].background }}
    >
      <div
        className={classNames("relative mx-auto", {
          [className!]: className,
        })}
        style={{
          width,
          height,
        }}
      >
        <BannerAnim
          prefixCls={`${className}-left-wrapper inline-block h-full relative overflow-hidden`}
          sync
          type="across"
          duration={1000}
          ease="easeInOutExpo"
          arrow={false}
          thumb={false}
          ref={bannerImg}
          onChange={onChange}
          dragPlay={false}
          style={{ width: leftChildrenWidth }}
        >
          {leftQueueAnim}
        </BannerAnim>
        <BannerAnim
          prefixCls={`${className}-right-wrapper inline-block h-full relative overflow-hidden before:absolute before:left-0 before:content-[''] before:w-[1px] before:top-[20px] before:bottom-[20px] before:bg-[#e8e8e8]`}
          sync
          type="across"
          duration={1000}
          arrow={false}
          thumb={false}
          ease="easeInOutExpo"
          ref={bannerText}
          dragPlay={false}
          style={{ width: width - leftChildrenWidth }}
        >
          {rightQueueAnim}
        </BannerAnim>
        <TweenOneGroup
          enter={{ opacity: 0, type: "from" }}
          leave={{ opacity: 0 }}
        >
          {showInt && (
            <LeftCircleOutlined
              onClick={onLeft}
              className="arrow-middle absolute -left-[60px] top-1/2 z-50 -mt-[12px] cursor-pointer text-[40px] text-white opacity-60 transition-opacity duration-[0.5s] hover:opacity-100"
            />
          )}
          {showInt < listLength - 1 && (
            <RightCircleOutlined
              onClick={onRight}
              className="arrow-middle absolute -right-[60px] top-1/2 -mt-[12px] cursor-pointer text-[40px] text-white opacity-60 transition-opacity duration-[0.5s] hover:opacity-100"
            />
          )}
        </TweenOneGroup>
      </div>
    </div>
  );
};

const ParallaxCarouselSuspense = function <T>(
  props: IParallaxCarouselProps<T>
) {
  return (
    <Suspense>
      <ParallaxCarousel<T> {...props} />
    </Suspense>
  );
};

export default typedMemo(ParallaxCarouselSuspense);
