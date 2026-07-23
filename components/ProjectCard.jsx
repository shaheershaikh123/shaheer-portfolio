"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TECH = {
  WordPress: ["WordPress", "Elementor", "HTML5", "CSS3"],
  Shopify: ["Shopify", "Liquid", "CSS3", "Apps"],
  GoHighLevel: ["GoHighLevel", "Funnels", "Automation", "CRM"],
  Other: ["HTML5", "CSS3", "JavaScript"],
};

export default function ProjectCard({ project, index = 0 }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06]"
    >
      {/* screenshot window — image scrolls down on hover */}
      <div className="relative h-[300px] overflow-hidden border-b border-white/10 bg-white">
        <img
          src={project.image}
          alt={`${project.name} website screenshot`}
          loading="lazy"
          className="card-shot absolute left-0 top-0 w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
          {project.category}
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-black backdrop-blur-sm">
          {project.platform}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            {project.name}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-white/50">
            {project.description}
          </p>
        </div>
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
          ↗
        </span>
      </div>

      {/* tech stack chips */}
      <div className="flex flex-wrap gap-2 px-5 pb-4">
        {(TECH[project.platform] || TECH.Other).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] text-white/60"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="px-5 pb-5">
        <span className="flex items-center justify-between rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-widest text-white/70 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
          View Project
          <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
        </span>
      </div>
    </motion.a>
  );
}
