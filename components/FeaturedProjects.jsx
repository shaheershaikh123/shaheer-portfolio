"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects({ projects = [] }) {
  const platforms = ["All", ...new Set(projects.map((p) => p.platform))];
  const [platform, setPlatform] = useState("All");

  const filtered = (
    platform === "All" ? projects : projects.filter((p) => p.platform === platform)
  ).slice(0, 6);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2.5">
        {platforms.map((c) => (
          <button
            key={c}
            onClick={() => setPlatform(c)}
            className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition-all ${
              platform === c
                ? "border-white bg-white text-black"
                : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProjectCard key={p.id || p.url} project={p} index={i} />
        ))}
      </div>
    </>
  );
}
