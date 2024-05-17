
import classNames from 'classnames';
import type {
  CSSProperties,
  ReactElement} from 'react';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ICarousel3dProps {
  children: ReactElement[];
  style: Partial<CSSProperties>;
  className: string;
  onChange: (arg: { current: number; rotate: number; eventType: string }) => void;
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

export default memo(function Carousel3d({
  onChange = () => {},
  className,
  tilt = '15rem',
  duration = '.45s',
  ease = 'cubic-bezier(0.215, 0.61, 0.355, 1)',
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
  const zDpr = useMemo(() => z * dpr, [z]);
  const perspectiveDpr = useMemo(() => perspective * dpr, [perspective]);

  const childrenLength = useRef<number>(
    Math.max(React.Children.toArray(children).length, childMaxLength),
  );
  const angle = useRef<number>(360 / childrenLength.current);

  // body的长度
  const clientWidth = useRef<number>(0);

  // 旋转值
  const [rotate, setRotate] = useState<number>(-defaultCurrent * angle.current);
  const currentRotate = useRef<number>(-defaultCurrent * angle.current);
  // 偏移值
  const [transition, setTransition] = useState<string>('none');
  // 当前选择的节点
  const [current, setCurrent] = useState<number>(defaultCurrent);

  const startX = useRef<number>(0);
  const startRotate = useRef<number>(0);

  useEffect(() => {
    clientWidth.current = document.body.clientWidth;
  }, []);

  useEffect(() => {
    childrenLength.current = Math.max(React.Children.toArray(children).length, childMaxLength);
    angle.current = 360 / childrenLength.current;
    setCurrent(defaultCurrent);
    setRotate(-defaultCurrent * angle.current);
    currentRotate.current = -defaultCurrent * angle.current;
  }, [childMaxLength, children, defaultCurrent]);

  useEffect(() => {
    setTransition(`transform ${duration} ${ease}`);
  }, [duration, ease]);

  const onTouchStart = (e: MouseEvent & TouchEvent) => {
    if ((e.touches && e.touches.length > 1) || childrenLength.current <= 1) {
      return;
    }
    startX.current = e.pageX || e.touches[0].pageX;
    startRotate.current = Math.round(rotate / angle.current) * angle.current; // 偏移修复;
  };

  const onTouchMove = (e: MouseEvent & TouchEvent) => {
    if ((e.touches && e.touches.length > 1) || childrenLength.current <= 1 || !startX.current) {
      return;
    }
    const x = e.pageX || e.touches[0].pageX;
    const differ = (x - startX.current) * moveRange; // 幅度加大；
    const nextRotate = startRotate.current + (differ / clientWidth.current) * angle.current;
    const r = (Math.abs(Math.ceil(nextRotate / 360)) * 360 - nextRotate) % 360;
    const nextCurrent = Math.round(r / angle.current) % childrenLength.current;

    setRotate(nextRotate);
    currentRotate.current = nextRotate;
    setCurrent(nextCurrent);
    setTransition('none');

    onChange({
      current: nextCurrent,
      rotate: nextRotate,
      eventType: 'move',
    });
  };

  const onTouchEnd = useCallback(
    (e: MouseEvent & TouchEvent) => {
      if (
        (e.changedTouches && e.changedTouches.length > 1) ||
        childrenLength.current <= 1 ||
        !startX.current
      ) {
        return;
      }
      const x = e.pageX || e.changedTouches[0].pageX;
      const differ = x - startX.current;
      const n = differ > 0 ? 1 : -1;
      const newRotate =
        startRotate.current +
        n * angle.current * Math.round(Math.abs((rotate - startRotate.current) / angle.current));

      // const r = (Math.abs(Math.ceil(newRotate / 360)) * 360 - newRotate) % 360;
      // const current = Math.round(r / angle.current) % childrenLength.current;

      setRotate(newRotate);
      currentRotate.current = newRotate;
      // setCurrent(current);
      setTransition(`transform ${duration} ${ease}`);
      startX.current = 0;
      onChange({
        current,
        rotate: newRotate,
        eventType: 'end',
      });
    },
    [current, duration, ease, onChange, rotate],
  );

  useEffect(() => {
    window.addEventListener('mouseup', onTouchEnd as any);

    return () => {
      window.removeEventListener('mouseup', onTouchEnd as any);
    };
  }, [onTouchEnd]);

  /**
   * 渲染子元素
   */
  const renderChildren = () => {
    const newChildren = React.Children.toArray(children) as ReactElement[];
    const length = newChildren.length;
    const nextZDpr = z * dpr;
    return newChildren.map((item, i) => {
      if (i >= childMaxLength) {
        return null;
      }
      const transform = `rotateY(${
        angle.current * i
      }deg) translateZ(${nextZDpr}px) rotateY(-${angle.current * i}deg) `;

      const diffPosition = Math.abs(current - i);

      const center = (childMaxLength ?? length) / 2;
      const index = diffPosition > center ? center * 2 - diffPosition : diffPosition;
      const opacity = Math.max(
        0.1,
        1 - ((index - 1) * opacityDecline + opacityBasics * (diffPosition ? 1 : 0)),
      );
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
            transformStyle: 'preserve-3d',
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
              {/* transform 与 filter 的距阵冲突，图层分离 */}
              <div
                className="transition-[opacity] duration-[0.65s]"
                style={{ opacity: current === i ? 1 : 1 }}
              >
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
      className={classNames('relative h-full w-full', {
        [className!]: className,
      })}
    >
      <div className="absolute left-0 right-0 m-auto -mt-[360px] h-[80vh] w-[60vw] pt-[360px]">
        <div
          className="relative m-auto h-full w-full"
          style={{
            ...style,
            perspective: perspectiveDpr,
            transform: `translateY(-${tilt}) scale(${(perspectiveDpr - zDpr) / perspectiveDpr})`,
          }}
        >
          <div
            className="w-full"
            style={{
              transformStyle: 'preserve-3d',
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
});
