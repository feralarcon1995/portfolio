"use client";
import { useRef, useEffect, useCallback } from "react";
import styles from "./line.module.scss";

interface MouseEvent {
  movementY: number;
  clientX: number;
}

export default function Line() {
  const path = useRef<SVGPathElement>(null);

  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId: number | null = null;

  const setPath = useCallback((progress: number) => {
    const width = window.innerWidth * 1;
    path.current?.setAttributeNS(
      "",
      "d",
      `M 0 50 Q ${width * 0.5} ${50 + progress} ${width} 50`
    );
  }, []);

  useEffect(() => {
    setPath(progress);
  }, [progress, setPath]);

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { movementY, clientX } = e;
    const pathBound = path.current?.getBoundingClientRect();
    if (pathBound) {
      x = (clientX - pathBound.left) / pathBound.width;
      progress += movementY;
      setPath(progress);
    }
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);

    progress = lerp(progress, 0, 0.025);

    time += 0.2;

    setPath(newProgress);

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div className={styles.flex_col_container}>
      <div className={styles.line_container}>
        <div
          onMouseEnter={() => {
            manageMouseEnter();
          }}
          onMouseMove={(e) => {
            manageMouseMove(e);
          }}
          onMouseLeave={() => {
            manageMouseLeave();
          }}
          className={styles.interactive_area}
        ></div>
        <svg className={styles.svg_container}>
          <path
            ref={path}
            className={styles.path}
          ></path>
        </svg>
      </div>
    </div>
  );
}