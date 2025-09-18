import React, { useId, useEffect, useState, useRef, Fragment } from 'react';
import useRefCallback from '@kne/use-ref-callback';
import useResize from '@kne/use-resize';
import classnames from 'classnames';
import style from './style.module.scss';

const ReactLiquidGlass = ({ className, children, responsiveBorder = true, dpi = 1.2, scale = 1, blur = 0.25, contrast = 1.2, brightness = 1.05, saturate = 1.1, ...props }) => {
  const id = useId().replace(/[#:]/g, '-');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(null);
  const containerRef = useResize(dom => {
    if (!(dom.clientWidth > 0 && dom.clientHeight > 0)) {
      return;
    }
    setSize({
      width: dom.clientWidth,
      height: dom.clientHeight
    });
    const domStyle = window.getComputedStyle(dom);
    dom.querySelectorAll(`.${style['glass']}`).forEach(element => {
      element.style.borderRadius = domStyle.borderRadius;
    });
  });
  const feImageRef = useRef(null);
  const feDisplacementMapRef = useRef(null);
  const handlerBoardChange = useRefCallback(e => {
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setMouseOffset({
      x: ((e.clientX - centerX) / rect.width) * 100,
      y: ((e.clientY - centerY) / rect.height) * 100
    });
  });
  useEffect(() => {
    document.body.addEventListener('mousemove', handlerBoardChange);
    document.body.addEventListener('touchstart', handlerBoardChange);
    return () => {
      document.body.removeEventListener('mousemove', handlerBoardChange);
      document.body.removeEventListener('touchstart', handlerBoardChange);
    };
  }, [handlerBoardChange]);
  useEffect(() => {
    if (!(size && size.width > 0 && size.height > 0)) {
      return;
    }

    const canvasDPI = dpi;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const w = Math.round(size.width * canvasDPI),
      h = Math.round(size.height * canvasDPI);
    canvas.width = w;
    canvas.height = h;
    const data = new Uint8ClampedArray(w * h * 4);

    const length = (x, y) => Math.sqrt(x * x + y * y);

    const roundedRectSDF = (x, y, width, height, radius) => {
      const qx = Math.abs(x) - width + radius;
      const qy = Math.abs(y) - height + radius;
      return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
    };

    const smoothStep = (a, b, t) => {
      t = Math.max(0, Math.min(1, (t - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };

    const texture = (x, y) => {
      return { type: 't', x, y };
    };

    const fragment = uv => {
      const ix = uv.x - 0.5;
      const iy = uv.y - 0.5;
      const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);
      const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
      const scaled = smoothStep(0, 1, displacement);
      return texture(ix * scaled + 0.5, iy * scaled + 0.5);
    };

    let maxScale = 0;
    const rawValues = [];
    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w;
      const y = ~~(i / 4 / w);
      const pos = fragment({
        x: x / w,
        y: y / h
      });
      const dx = pos.x * w - x;
      const dy = pos.y * h - y;
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }
    maxScale *= 2;

    let index = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[index++] / maxScale + 0.5;
      const g = rawValues[index++] / maxScale + 0.5;
      data[i] = r * 255;
      data[i + 1] = g * 255;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    context.putImageData(new ImageData(data, w, h), 0, 0);
    feImageRef.current.setAttribute('href', canvas.toDataURL());

    feDisplacementMapRef.current.setAttribute('scale', (scale * maxScale) / canvasDPI);
  }, [size, dpi, scale]);

  const linearGradient = (start, end) => `linear-gradient(
          ${135 + mouseOffset.x * 1.2}deg,
          rgba(255, 255, 255, 0.0) 0%,
          rgba(255, 255, 255, ${start + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
          rgba(255, 255, 255, ${end + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
          rgba(255, 255, 255, 0.0) 100%
        )`;
  return (
    <Fragment>
      <div
        {...props}
        ref={containerRef}
        className={classnames(style['container'], className)}
        style={{
          backdropFilter: `url(#liquid-glass-${id}_filter) blur(${blur}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturate})`
        }}
        onMouseMove={handlerBoardChange}
        onTouchStart={handlerBoardChange}
      >
        {responsiveBorder && (
          <>
            <div
              className={style['glass']}
              style={{
                opacity: 0.2,
                mixBlendMode: 'screen',
                background: linearGradient(0.12, 0.4)
              }}
            />
            <div
              className={style['glass']}
              style={{
                opacity: 0.8,
                mixBlendMode: 'overlay',
                background: linearGradient(0.32, 0.6)
              }}
            />
          </>
        )}
        {children}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" className={style['filter-svg']}>
        <defs>
          <filter id={`liquid-glass-${id}_filter`} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB" x="0" y="0" width={size?.width || 0} height={size?.height || 0}>
            <feImage ref={feImageRef} id={`liquid-glass-${id}_map`} width={size?.width || 0} height={size?.height || 0}></feImage>
            <feDisplacementMap ref={feDisplacementMapRef} in="SourceGraphic" in2={`liquid-glass-${id}_map`} xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>
          </filter>
        </defs>
      </svg>
    </Fragment>
  );
};

export default ReactLiquidGlass;
