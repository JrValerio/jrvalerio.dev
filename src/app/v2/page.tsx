import Hero from "../../components/Hero";
import Work from "../../components/Work";
import About from "../../components/About";
import Stack from "../../components/Stack";
import Contact from "../../components/Contact";

export default function V2HomePage() {
  return (
    <>
      <Hero />
      <Work limit={3} />
      <About />
      <Stack />
      <Contact />
    </>
  );
}
