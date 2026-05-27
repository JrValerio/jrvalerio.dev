import { useEffect, useState } from "react";

/**
 * Typewriter animation hook — no external dependency.
 * Cycles through `strings`, typing and deleting each one.
 *
 * @param strings  Array of strings to cycle through.
 * @param delay    Base typing delay in ms (delete speed is delay/2).
 */
export function useTypewriter(strings: string[], delay = 80): string {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    if (strings.length === 0) return;

    const current = strings[index % strings.length];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          delay
        );
        return () => clearTimeout(t);
      }
      // Fully typed — pause before deleting
      const t = setTimeout(() => setPhase("deleting"), 1200);
      return () => clearTimeout(t);
    }

    // phase === "deleting"
    if (displayed.length > 0) {
      const t = setTimeout(
        () => setDisplayed((d) => d.slice(0, -1)),
        delay / 2
      );
      return () => clearTimeout(t);
    }

    // Fully deleted — advance to next string
    setIndex((i) => i + 1);
    setPhase("typing");
  }, [displayed, phase, index, strings, delay]);

  return displayed;
}
