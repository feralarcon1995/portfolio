import Head from 'next/head'
import localFont from "next/font/local";
import './Layout.module.scss';
import Navbar from '@/components/Navbar/Navbar';
import useLenis from '@/hooks/useLenis';
import { useActiveSection } from '@/hooks/useActiveSection';
import CircularText from '@/components/CircularText/CircularText';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const metaDescription = description || "Fernando Alarcon's Portfolio – Frontend Web Developer specializing in building dynamic and responsive user interfaces with React, Next.js, and modern JavaScript frameworks.";

  const pageTitle = title ? `${title} | Fernando Alarcon` : `Fernando Alarcon | ${activeSection}`;
  return (
    <>
      <Head>
        <title>
          {pageTitle}
        </title>
        <meta charSet="utf-8" />
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Fernando Alarcon" />
        <meta name="keywords" content="web development, frontend developer, React developer, NextJS, JavaScript, portfolio, Fernando Alarcon, creative developer" />

        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href={`https://feralarcon.vercel.app/${router.asPath}`} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://feralarcon.vercel.app/${router.asPath}`} />
        <meta property="og:title" content={pageTitle}
        />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content="/hero.png" />
        <meta property="og:site_name" content="Fernando Alarcon | Creative Developer" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@medicenferpy" />
        <meta name="twitter:creator" content="@medicenferpy" />
        <meta name="twitter:title" content={pageTitle}
        />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="/hero.png" />

        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Fernando Alarcon",
              "url": "https://feralarcon.vercel.app/",
              "image": "https://feralarcon.vercel.app//images/me.jpg",
              "jobTitle": "Creative Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Proactive Talent Hub"
              },
              "alumniOf": "CoderHouse",
              "sameAs": [
                "https://github.com/feralarcon1995",
                "https://linkedin.com/in/feralarcon1995",
                "https://x.com/medicenferpy"
              ],
              "knowsAbout": ["Web Development", "React", "Next.js", "JavaScript"]
            })
          }}
        />
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
