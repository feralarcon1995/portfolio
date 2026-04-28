import { Layout } from "@/layouts/Layout";
import Hero from "@/components/Hero/Hero";
import dynamic from "next/dynamic";


const About = dynamic(() => import("@/components/About/About"), {
  ssr: true,
  loading: () => <div style={{ height: "100vh" }} />
});

const Experiencie = dynamic(() => import("@/components/Experiencie/Experiencie"), {
  ssr: true,
  loading: () => <div style={{ height: "100vh" }} />
});

const Projects = dynamic(() => import("@/components/Projects/Projects"), {
  ssr: true,
  loading: () => <div style={{ height: "80vh" }} />
});

const ContactForm = dynamic(() => import("@/components/Contact/contact-form"), {
  ssr: true,
  loading: () => <div style={{ height: "60vh" }} />
});

const Contact = dynamic(() => import("@/components/Footer/Footer"), {
  ssr: true,
  loading: () => <div style={{ height: "20vh" }} />
});

export default function Home() {
  return (
    <Layout
      title="Portfolio"
      description="Fernando Alarcon's portfolio, a frontend and full stack developer specialized in React, Next.js, TypeScript, and high-performance web experiences."
      image="https://www.feralarcon.com.ar/hero.png"
      showCircularText={false}
    >
      <Hero />
      <About />
      <Experiencie />
      <Projects />
      <ContactForm />
      <Contact />
    </Layout>
  );
}
