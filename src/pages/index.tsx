import About from "@/components/About/About";
import Contact from "@/components/Footer/Footer";
import Experiencie from "@/components/Experiencie/Experiencie";
import Hero from "@/components/Hero/Hero";
import { Layout } from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout  description="Home page">
      <Hero />
      <About />
      <Experiencie />
      <Contact />
    </Layout>
  );
}
