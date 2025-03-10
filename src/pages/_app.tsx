import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import PreLoader from '@/components/PreLoader';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const router = useRouter();
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    const handleStart = (): void => {
      if (!initialLoad) {
        setLoading(true);
        setShowPreloader(true);
        setShowContent(false);
      }
    };

    const handleComplete = (): void => {
      if (!initialLoad) {
        setLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 800);
      }
      setInitialLoad(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, initialLoad]);

  const handleLoadingComplete = () => {
    setLoading(false);
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