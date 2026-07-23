"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "../lib/data";
import Typewriter from "./Typewriter";
import Counter from "./Counter";

// WebGL centerpiece — client-only, loaded after the page so it never blocks render.
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

function StaggerWord({ word, outline = false, delay = 0 }) {
  return (
    <span className="inline-block overflow-hidden pb-1 align-top">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.045,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className={`inline-block ${outline ? "text-outline" : ""}`}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 15 });
  const sy = useSpring(my, { stiffness: 50, damping: 15 });
  const shape1x = useTransform(sx, (v) => v * 40);
  const shape1y = useTransform(sy, (v) => v * 40);
  const shape2x = useTransform(sx, (v) => v * -60);
  const shape2y = useTransform(sy, (v) => v * -60);
  const nameX = useTransform(sx, (v) => v * 14);
  const nameY = useTransform(sy, (v) => v * 8);

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* 3D WebGL centerpiece (desktop only, decorative) */}
      <div className="pointer-events-none absolute right-[-6rem] top-1/2 hidden h-[640px] w-[640px] -translate-y-1/2 opacity-90 lg:block xl:right-0">
        <Hero3D />
      </div>

      {/* breathing glow orbs */}
      <div className="animate-breathe pointer-events-none absolute left-1/4 top-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[110px]" />
      <div className="animate-breathe pointer-events-none absolute bottom-1/4 right-1/5 h-[340px] w-[340px] rounded-full bg-white/[0.04] blur-[100px]" style={{ animationDelay: "4s" }} />

      {/* parallax floating shapes */}
      <motion.div
        style={{ x: shape1x, y: shape1y }}
        className="pointer-events-none absolute -right-24 top-32 h-72 w-72 rounded-full border border-white/10"
      >
        <span className="animate-spin-slow absolute inset-4 block rounded-full border border-dashed border-white/10" />
      </motion.div>
      <motion.div
        style={{ x: shape2x, y: shape2y }}
        className="pointer-events-none absolute -left-32 bottom-24 h-96 w-96 rounded-full border border-white/5"
      />
      <motion.div
        style={{ x: shape2x, y: shape1y }}
        className="pointer-events-none absolute right-1/4 top-1/4 h-3 w-3 rounded-full bg-white/30"
      />
      <motion.div
        style={{ x: shape1x, y: shape2y }}
        className="pointer-events-none absolute left-1/3 bottom-1/3 h-2 w-2 rounded-full bg-white/20"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-7xl px-6 py-20"
      >
        <motion.p
          variants={item}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/50"
        >
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
          Available for new projects
        </motion.p>

        <motion.h1
          style={{ x: nameX, y: nameY }}
          className="mt-8 font-[family-name:var(--font-display)] text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          <StaggerWord word="SHAHEER" delay={0.3} />
          <br />
          <StaggerWord word="SHAIKH" outline delay={0.65} />
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="font-[family-name:var(--font-display)] text-xl font-medium text-white md:text-2xl">
              <Typewriter
                words={[
                  "WordPress Developer",
                  "GHL Expert",
                  "Funnel Builder",
                  "Shopify Developer",
                  "AI Automation Expert",
                ]}
              />
            </p>
            <p className="mt-4 leading-relaxed text-white/55">
              I build fast, responsive websites and intelligent automation
              workflows — including AI agent–powered systems — that help
              businesses convert more leads and save time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="btn-shine rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
              >
                View my work
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/30 px-7 py-3.5 text-sm uppercase tracking-widest transition-all hover:bg-white hover:text-black"
              >
                Contact me
              </Link>
            </div>
          </div>

          <div className="flex gap-10 md:gap-14">
            {[
              [profile.yearsExperience, "Years experience"],
              [profile.projectsCompleted, "Websites launched"],
              ["4", "Companies worked with"],
            ].map(([num, label]) => (
              <div key={label}>
                <p className="font-[family-name:var(--font-display)] text-4xl font-bold md:text-5xl">
                  <Counter value={num} />
                </p>
                <p className="mt-2 max-w-[8rem] text-xs uppercase tracking-widest text-white/40">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-14 w-8 items-start justify-center rounded-full border border-white/20 p-2">
          <motion.span
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="block h-2 w-1 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
