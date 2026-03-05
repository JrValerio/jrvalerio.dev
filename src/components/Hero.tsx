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
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="jr-hero-title"
          >
            Amaro Junior
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: "easeOut" }}
            className="jr-hero-subtitle mt-6"
          >
            Full-Stack Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24, duration: 0.7, ease: "easeOut" }}
            className="jr-body mt-6 max-w-xl text-[var(--jr-muted)]"
          >
            I build technology that helps people communicate. Creator of EcoVoz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.36, duration: 0.7, ease: "easeOut" }}
            className="mt-10 flex flex-wrap gap-6"
          >
            <motion.a whileHover={{ y: -1 }} href="#work" className="jr-link">
              View Work
            </motion.a>
            <motion.a
              whileHover={{ y: -1 }}
              href="https://github.com/jrvalerio"
              target="_blank"
              rel="noopener noreferrer"
              className="jr-link"
            >
              GitHub
            </motion.a>
            <motion.a
              whileHover={{ y: -1 }}
              href="https://linkedin.com/in/jrvalerio"
              target="_blank"
              rel="noopener noreferrer"
              className="jr-link"
            >
              LinkedIn
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
