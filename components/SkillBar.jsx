"use client";

import { motion } from "framer-motion";

export default function SkillBar({ skill, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition-all hover:-translate-y-1 hover:border-white/30"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.06] p-3">
        <img
          src={skill.icon}
          alt={`${skill.name} logo`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <p className="mt-3 font-[family-name:var(--font-display)] font-semibold">
        {skill.name}
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: "easeOut" }}
          className="h-full rounded-full bg-white"
        />
      </div>
      <p className="mt-2 text-xs text-white/40">{skill.level}%</p>
    </motion.div>
  );
}
