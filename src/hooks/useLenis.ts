import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenis = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    setLenis(lenisInstance);

    const animate = (time: number) => {
      lenisInstance.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return lenis;
};

export default useLenis;