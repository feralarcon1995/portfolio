import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import '@/styles/globals.css'; 
import PreLoader from '@/components/PreLoader';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Gestionar eventos de navegación
    const handleStart = (): void => setLoading(true);
    const handleComplete = (): void => setLoading(false);

    // Carga inicial
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Puedes ajustar este tiempo

    // Suscribirse a eventos del router para navegaciones posteriores
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
      {loading && <PreLoader />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;