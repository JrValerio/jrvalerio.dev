import type { Metadata } from "next";
import About from "../../../components/About";
import Stack from "../../../components/Stack";

export const metadata: Metadata = {
  alternates: {
    canonical: "/v2/sobre",
  },
};

export default function V2AboutPage() {
  return (
    <>
      <About />
      <Stack />
    </>
  );
}
