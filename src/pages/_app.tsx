import { useState } from 'react';
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import PreLoader from '@/components/PreLoader';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showPreloader, setShowPreloader] = useState<boolean>(true);

  const handleLoadingComplete = (): void => {
    setTimeout(() => {
      setShowContent(true);
      setTimeout(() => {
        setShowPreloader(false);
      }, 1000);
    }, 800);
  };

  return (
    <>
      {showPreloader && <PreLoader onLoadingComplete={handleLoadingComplete} />}
      {showContent && <Component {...pageProps} />}
    </>
  );
}

export default MyApp;
