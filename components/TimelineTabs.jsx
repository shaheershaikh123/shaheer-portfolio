"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience, education, achievements } from "../lib/data";

const TABS = [
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "achievements", label: "Achievements" },
];

function Row({ period, logo, fallback, title, subtitle, description, tools, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: i * 0.08 }}
      className="relative grid gap-4 md:grid-cols-[220px_1fr] md:gap-10"
    >
      {/* left: period + name */}
      <div className="md:text-right">
        <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-[11px] uppercase tracking-widest text-white/60">
          {period}
        </span>
        <div className="mt-3 flex items-center gap-3 md:justify-end">
          {logo ? (
            <img src={logo} alt="" className="h-9 w-9 rounded-lg border border-white/10 bg-white object-contain p-1 md:order-2" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] font-[family-name:var(--font-display)] font-bold md:order-2">
              {fallback}
            </span>
          )}
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold leading-snug">
            {title}
          </h3>
        </div>
        {subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}
      </div>

      {/* timeline spine + content */}
      <div className="relative border-l border-white/15 pb-12 pl-8 last:pb-0">
        <span className="absolute -left-[7px] top-1.5 h-[13px] w-[13px] rounded-full border-2 border-white bg-black" />
        <p className="leading-relaxed text-white/55">{description}</p>
        {tools && tools.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/65 transition-colors hover:border-white/40 hover:text-white"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function TimelineTabs() {
  const [tab, setTab] = useState("experience");

  return (
    <div>
      {/* tab pills */}
      <div className="mx-auto flex w-fit rounded-full border border-white/15 bg-white/[0.04] p-1.5">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative rounded-full px-6 py-2.5 text-sm transition-colors ${
              tab === t.key ? "text-black" : "text-white/60 hover:text-white"
            }`}
          >
            {tab === t.key && (
              <motion.span
                layoutId="tl-tab"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-14">
        <AnimatePresence mode="wait">
          {tab === "experience" && (
            <motion.div key="exp" exit={{ opacity: 0 }} className="space-y-2">
              {experience.map((e, i) => (
                <Row
                  key={e.company}
                  i={i}
                  period={e.period}
                  logo={e.logo}
                  fallback={e.company[0]}
                  title={e.role}
                  subtitle={e.company}
                  description={e.description}
                  tools={e.tools}
                />
              ))}
            </motion.div>
          )}
          {tab === "education" && (
            <motion.div key="edu" exit={{ opacity: 0 }} className="space-y-2">
              {education.map((e, i) => (
                <Row
                  key={e.school}
                  i={i}
                  period={e.period}
                  logo={e.logo}
                  fallback={e.school[0]}
                  title={e.school}
                  description={e.degree}
                />
              ))}
            </motion.div>
          )}
          {tab === "achievements" && (
            <motion.div key="ach" exit={{ opacity: 0 }} className="space-y-2">
              {achievements.map((a, i) => (
                <Row
                  key={a.title}
                  i={i}
                  period={a.period}
                  fallback="★"
                  title={a.title}
                  description={a.description}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
