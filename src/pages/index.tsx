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
    <Layout description="Home page" showCircularText={false}>
      <Hero />
      <About />
      <Experiencie />
      <Projects />
      <ContactForm />
      <Contact />
    </Layout>
  );
}
