import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';
import { useSmoothScroll } from '@/components/SmoothScroll/SmoothScrollProvider';

export const useLenisScroll = (targetRef: React.RefObject<HTMLElement>) => {
  const { lenis } = useSmoothScroll();
  const elementProgressMotion = useMotionValue(0);

  useEffect(() => {
    if (!lenis || !targetRef.current) return;

    const updateScroll = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      const elementHeight = targetRef.current.offsetHeight;
      const elementTop = rect.top;
      const p = Math.max(
        0,
        Math.min(1, (window.innerHeight - elementTop) / (window.innerHeight + elementHeight)),
      );
      elementProgressMotion.set(p);
    };

    lenis.on('scroll', updateScroll);
    updateScroll();

    return () => {
      lenis.off('scroll', updateScroll);
    };
  }, [lenis, targetRef, elementProgressMotion]);

  return {
    elementProgressMotion,
    lenis,
  };
};
