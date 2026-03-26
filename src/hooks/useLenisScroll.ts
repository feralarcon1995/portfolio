import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';
import { useSmoothScroll } from '@/components/SmoothScroll/SmoothScrollProvider';

export const useLenisScroll = (targetRef: React.RefObject<HTMLElement>) => {
  const { lenis } = useSmoothScroll();
  const elementProgressMotion = useMotionValue(0);

  useEffect(() => {
    if (!targetRef.current) return;

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

    updateScroll();

    if (lenis) {
      lenis.on('scroll', updateScroll);
    } else {
      window.addEventListener('scroll', updateScroll, { passive: true });
      window.addEventListener('resize', updateScroll);
    }
    updateScroll();

    return () => {
      if (lenis) {
        lenis.off('scroll', updateScroll);
      } else {
        window.removeEventListener('scroll', updateScroll);
        window.removeEventListener('resize', updateScroll);
      }
    };
  }, [lenis, targetRef, elementProgressMotion]);

  return {
    elementProgressMotion,
    lenis,
  };
};
