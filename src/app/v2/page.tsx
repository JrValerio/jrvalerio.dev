import type { Metadata } from "next";
import Hero from "../../components/Hero";
import Work from "../../components/Work";
import About from "../../components/About";
import Stack from "../../components/Stack";
import Contact from "../../components/Contact";

export const metadata: Metadata = {
  alternates: {
    canonical: "/v2",
  },
};

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
