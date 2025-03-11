import Head from 'next/head'
import localFont from "next/font/local";
import './Layout.module.scss';
import Navbar from '@/components/Navbar/Navbar';
import useLenis from '@/hooks/useLenis';
import { useActiveSection } from '@/hooks/useActiveSection';
import CircularText from '@/components/CircularText/CircularText';

interface LayoutProps {
  children: React.ReactNode;
  description?: string;
  title?: string;
}

const BricolageGrotestk = localFont({
  src: "../pages/fonts/BricolageGrotesque_48pt-ExtraBold.ttf",
  variable: "--font-bricolage",
  weight: "400 700 900",
});

const FounderGrotestk = localFont({
  src: "../pages/fonts/founders-grotesk-test-semibold.woff",
  variable: "--font-founder",
  weight: "400 900",
});

const Monument = localFont({
  src: "../pages/fonts/MonumentExtended-Bold.otf",
  variable: "--font-monument",
  weight: "900",
});

export const Layout = ({ children, title, description }: LayoutProps) => {
  useLenis();
  const activeSection = useActiveSection();

  return (
    <>
      <Head>
        <title>
          {title ? `${title} | ${activeSection}` : activeSection}
        </title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${Monument.variable} ${BricolageGrotestk.variable} ${FounderGrotestk.variable}`}>
        <CircularText
          text=" CONTACT * LET&#39;S TALK *"
          onHover="pause"
          spinDuration={10}
          className="custom-class"
        />
        <Navbar />
        {children}
      </main>
    </>
  )
}
