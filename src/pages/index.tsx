import { Layout } from "@/layouts/Layout";
import About from "@/components/About/About";
import Contact from "@/components/Footer/Footer";
import Experiencie from "@/components/Experiencie/Experiencie";
import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects/Projects";

export default function Home() {
  return (
    <Layout description="Home page">
      <Hero />
      <About />
      <Experiencie />
      <Projects />
      <Contact />
    </Layout>
  );
}
