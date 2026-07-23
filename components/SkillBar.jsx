"use client";

import { motion } from "framer-motion";

export default function SkillBar({ skill, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-colors hover:border-white/30"
    >
      {/* subtle glow that fades in on hover */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(120px_120px_at_50%_0%,rgba(255,255,255,0.10),transparent_70%)]" />

      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-white/[0.06] p-3.5 transition-transform duration-300 group-hover:scale-110">
        <img
          src={skill.icon}
          alt={`${skill.name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <p className="relative mt-4 font-[family-name:var(--font-display)] font-semibold">
        {skill.name}
      </p>
    </motion.div>
  );
}
