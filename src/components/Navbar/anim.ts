import { Variants } from 'framer-motion';

export const mountAnim = { initial: 'initial', animate: 'enter', exit: 'exit' };

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeOutSoft: [number, number, number, number] = [0.33, 1, 0.53, 1];

export const menuLayer: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.58,
      ease: easeSmooth,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1.08,
      ease: easeOutSoft,
    },
  },
};

export const height: Variants = {
  initial: {
    height: 0,
  },
  enter: (i: number) => ({
    height: '100%',
    transition: {
      duration: 0.78,
      delay: 0.07 * i,
      ease: easeSmooth,
    },
  }),
  exit: (i: number) => ({
    height: 0,
    transition: {
      duration: 0.58,
      delay: 0.055 * (7 - i),
      ease: easeOutSoft,
    },
  }),
};

export const background: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.5,
    transition: {
      duration: 0.65,
      ease: easeSmooth,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.58,
      ease: easeOutSoft,
    },
  },
};

export const opacity: Variants = {
  initial: {
    opacity: 0,
  },
  enter: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: easeSmooth,
      delay: typeof i === 'number' ? Math.min(i, 0.35) : 0,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.42,
      ease: easeOutSoft,
    },
  },
};

export const slideLeft: Variants = {
  initial: {
    x: 72,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: easeSmooth,
    },
  },
  exit: {
    x: 48,
    opacity: 0,
    transition: {
      duration: 0.45,
      ease: easeOutSoft,
    },
  },
};

export const rotateX: Variants = {
  initial: {
    rotateX: 58,
    opacity: 0,
    y: 12,
  },
  enter: (i: number) => ({
    rotateX: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: easeSmooth,
      delay: 0.12 + i * 0.055,
    },
  }),
  exit: (i: number) => ({
    rotateX: -22,
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.48,
      ease: easeOutSoft,
      delay: Math.max(0, 3 - i) * 0.05,
    },
  }),
};
