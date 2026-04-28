import { useState } from 'react';
import { AppProps } from 'next/app';
import { MotionConfig } from 'framer-motion';
import '@/styles/globals.css';
import PreLoader from '@/components/PreLoader';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);

  const handleLoadingComplete = (): void => {
    setShowPreloader(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <>
        {showPreloader && <PreLoader onLoadingComplete={handleLoadingComplete} />}
        <Component {...pageProps} />
      </>
    </MotionConfig>
  );
}

export default MyApp;
