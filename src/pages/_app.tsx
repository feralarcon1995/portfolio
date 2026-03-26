import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { MotionConfig } from 'framer-motion';
import '@/styles/globals.css';
import PreLoader from '@/components/PreLoader';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleLoadingComplete = (): void => {
    setTimeout(() => {
      setShowContent(true);
      setTimeout(() => {
        setShowPreloader(false);
      }, 1000);
    }, 800);
  };

  return (
    <MotionConfig reducedMotion={isMobile ? 'always' : 'user'}>
      <>
        {showPreloader && <PreLoader onLoadingComplete={handleLoadingComplete} />}
        {showContent && <Component {...pageProps} />}
      </>
    </MotionConfig>
  );
}

export default MyApp;
