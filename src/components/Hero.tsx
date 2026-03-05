"use client";

import { motion } from "framer-motion";
import Container from "./UI/Container";

export default function Hero() {
  return (
    <section className="flex min-h-[88vh] items-center border-b border-[var(--jr-border)] py-20">
      <Container>
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="jr-hero-title"
          >
            Amaro Junior
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="jr-hero-subtitle mt-6"
          >
            Full-Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="jr-body mt-6 max-w-xl text-[var(--jr-muted)]"
          >
            I build technology that helps people communicate. Creator of EcoVoz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-6"
          >
            <a href="#work" className="jr-link">
              View Work
            </a>
            <a
              href="https://github.com/jrvalerio"
              target="_blank"
              rel="noopener noreferrer"
              className="jr-link"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/jrvalerio"
              target="_blank"
              rel="noopener noreferrer"
              className="jr-link"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
