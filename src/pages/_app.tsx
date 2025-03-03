import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import PreLoader from '@/components/PreLoader';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (): void => {
      setLoading(true);
      setShowContent(false);
    };

    const handleComplete = (): void => {
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 800); 
      }, 3000);
    };

    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setShowContent(true);
      }, 800);
    }, 3000);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      clearTimeout(timer);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      <PreLoader loading={loading} />
      {showContent && <Component {...pageProps} />}
    </>
  );
}

export default MyApp;