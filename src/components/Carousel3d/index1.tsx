/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from "classnames";
import React, {
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface ICarousel3dProps {
  children: ReactElement[];
  style: Partial<CSSProperties>;
  className: string;
  onChange: (arg: {
    current: number;
    rotate: number;
    eventType: string;
  }) => void;
  tilt: string;
  duration: string;
  ease: string;
  blurIncrease: number;
  opacityDecline: number;
  opacityBasics: number;
  moveRange: number;
  childMaxLength: number;
  perspective: number;
  z: number;
  defaultCurrent: number;
}

// const currentDpr = window.devicePixelRatio;
// const defaultDpr = 2; // sketch 里用的是 iphone 6 尺寸;
const dpr = 0.5; // currentDpr / defaultDpr;

const DefaultWidth = 360;

export default function Carousel3d({
  onChange = () => {},
  className,
  tilt = "15rem",
  duration = ".45s",
  ease = "cubic-bezier(0.215, 0.61, 0.355, 1)",
  blurIncrease = 8,
  opacityDecline = 0.1,
  opacityBasics = 0.5,
  moveRange = 2,
  childMaxLength = 6,
  perspective = 2800,
  z = 800,
  defaultCurrent = 0,
  children,
  style = {},
}: Partial<ICarousel3dProps>) {
  const zDpr = useMemo<number>(() => z * dpr, [z]);
  const perspectiveDpr = useMemo<number>(
    () => perspective * dpr,
    [perspective]
  );

  // 子元素长度
  const childrenLength = useMemo<number>(
    () => Math.max(React.Children.toArray(children).length, childMaxLength),
    [childMaxLength, children]
  );
  // 偏移量
  const angle = useMemo<number>(
    () => DefaultWidth / childrenLength,
    [childrenLength]
  );
  // body的长度
  const clientWidth = useRef<number>(0);

  // 旋转值
  const [rotate, setRotate] = useState<number>(-defaultCurrent * angle);
  // 偏移值
  const [transition, setTransition] = useState<string>("none");
  // 当前选择的节点
  const [current, setCurrent] = useState<number>(defaultCurrent);

  const startX = useRef<number>(0);

  const startRotate = useMemo<number>(
    () => Math.round(rotate / angle) * angle,
    [rotate, angle]
  );

  useEffect(() => {
    clientWidth.current = document.body.clientWidth;
  }, []);

  useEffect(() => {
    setCurrent(defaultCurrent);
    setRotate(-defaultCurrent * angle);
  }, [angle, defaultCurrent]);

  useEffect(() => {
    setTransition(`transform ${duration} ${ease}`);
  }, [duration, ease]);

  const onChangeEvent = useCallback(
    (
      eventType: "move" | "end",
      data: {
        current?: number;
        rotate?: number;
      }
    ) => {
      onChange({
        current,
        rotate,
        eventType,
        ...data,
      });
    },
    [current, onChange, rotate]
  );

  const onTouchStart = useCallback(
    (e: MouseEvent & TouchEvent) => {
      if ((e.touches && e.touches.length > 1) || childrenLength <= 1) {
        return;
      }
      startX.current = e.pageX || e.touches[0].pageX;
    },
    [childrenLength]
  );

  const onTouchMove = useCallback(
    (e: MouseEvent & TouchEvent) => {
      if (
        (e.touches && e.touches.length > 1) ||
        childrenLength <= 1 ||
        !startX.current
      ) {
        return;
      }
      const x = e.pageX || e.touches[0].pageX;
      const differ = (x - startX.current) * moveRange; // 幅度加大；
      const rotate = startRotate + (differ / clientWidth.current) * angle;
      const r =
        (Math.abs(Math.ceil(rotate / DefaultWidth)) * DefaultWidth - rotate) %
        DefaultWidth;
      const current = Math.round(r / angle) % childrenLength;

      console.log("onTouchMove", current);

      setRotate(rotate);
      setCurrent(current);
      setTransition("none");

      onChangeEvent("move", {
        current,
        rotate,
      });
    },
    [angle, childrenLength, moveRange, onChangeEvent, startRotate]
  );

  const onTouchEnd = useCallback(
    (e: MouseEvent & TouchEvent) => {
      if (
        (e.changedTouches && e.changedTouches.length > 1) ||
        childrenLength <= 1 ||
        !startX.current
      ) {
        return;
      }
      const x = e.pageX || e.changedTouches[0].pageX;
      const differ = x - startX.current;
      const n = differ > 0 ? 1 : -1;
      const newRotate =
        startRotate +
        n * angle * Math.round(Math.abs((rotate - startRotate) / angle));

      setRotate(newRotate);

      startX.current = 0;
      onChangeEvent("end", {
        rotate: newRotate,
      });
    },
    [angle, childrenLength, onChangeEvent, rotate, startRotate]
  );

  useEffect(() => {
    window.addEventListener("mouseup", onTouchEnd as any);

    return () => {
      window.removeEventListener("mouseup", onTouchEnd as any);
    };
  }, [onTouchEnd]);

  /**
   * 渲染子元素
   */
  const renderChildren = () => {
    const newChildren = React.Children.toArray(children) as ReactElement[];
    const length = newChildren.length;
    const zDpr = z * dpr;
    return newChildren.map((item, i) => {
      if (i >= childMaxLength) {
        return null;
      }
      const transform = `rotateY(${
        angle * i
      }deg) translateZ(${zDpr}px) rotateY(-${angle * i}deg) `;

      const diffPosition = Math.abs(current - i);

      const center = Math.min(childMaxLength, length) / 2;
      const index =
        diffPosition > center ? center * 2 - diffPosition : diffPosition;
      let opacity =
        1 -
        ((index - 1) * opacityDecline + opacityBasics * (diffPosition ? 1 : 0));
      opacity = opacity < 0.1 ? 0.1 : opacity;
      const animStyle: CSSProperties = {
        opacity,
      };
      if (blurIncrease) {
        animStyle.filter = `blur(${index * blurIncrease}px)`;
      }
      return (
        <div
          className="absolute left-0 top-0"
          key={item.key}
          style={{
            transformStyle: "preserve-3d",
            transform,
          }}
        >
          <div
            style={{
              transform: `rotateY(${-rotate}deg)`,
              transition: transition,
            }}
          >
            <div
              className="m-auto overflow-hidden rounded-lg transition-[filter] duration-[0.45s]"
              style={{ ...animStyle }}
            >
              <div className="transition-[opacity] duration-[0.65s]">
                {item}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      onTouchStart={onTouchStart as any}
      onMouseDown={onTouchStart as any}
      onTouchMove={onTouchMove as any}
      onMouseMove={onTouchMove as any}
      onTouchEnd={onTouchEnd as any}
      onMouseUp={onTouchEnd as any}
      className={classNames("relative h-full w-full", {
        [className!]: className,
      })}
    >
      <div className="absolute left-0 right-0 m-auto h-[80vh] w-[60vw]">
        <div
          className="relative m-auto h-full w-full"
          style={{
            ...style,
            perspective: perspectiveDpr,
            transform: `translateY(-${tilt}) scale(${
              (perspectiveDpr - zDpr) / perspectiveDpr
            })`,
          }}
        >
          <div
            className="w-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateY(${tilt}) rotateY(${rotate}deg)`,
              transition: transition,
            }}
          >
            {renderChildren()}
          </div>
        </div>
      </div>
    </div>
  );
}
