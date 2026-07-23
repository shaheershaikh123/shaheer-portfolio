"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

const CAT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function PortfolioGrid({ projects = [] }) {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const platforms = ["All", ...new Set(projects.map((p) => p.platform))];

  const [active, setActive] = useState("All");
  const [platform, setPlatform] = useState("All");

  const countFor = (cat) =>
    projects.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (platform === "All" || p.platform === platform)
    ).length;

  const filtered = projects.filter(
    (p) =>
      (active === "All" || p.category === active) &&
      (platform === "All" || p.platform === platform)
  );

  return (
    <div className="mt-12 items-start gap-8 lg:grid lg:grid-cols-[260px_1fr]">
      {/* ===== sidebar (desktop) ===== */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="px-2 pb-3 pt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Category
            </p>
            <nav className="space-y-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    active === c
                      ? "bg-white font-semibold text-black"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {CAT_ICON}
                  <span className="flex-1 truncate">{c === "All" ? "All categories" : c}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      active === c ? "bg-black text-white" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {countFor(c)}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="px-2 pb-3 pt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Platform
            </p>
            <div className="flex flex-wrap gap-2 px-1 pb-1">
              {platforms.map((c) => (
                <button
                  key={c}
                  onClick={() => setPlatform(c)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                    platform === c
                      ? "border-white bg-white font-semibold text-black"
                      : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ===== mobile filter chips ===== */}
      <div className="mb-8 space-y-4 lg:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] uppercase tracking-widest text-white/40">
            Platform
          </span>
          {platforms.map((c) => (
            <button
              key={c}
              onClick={() => setPlatform(c)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-all ${
                platform === c
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] uppercase tracking-widest text-white/40">
            Category
          </span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-xs transition-all ${
                active === c
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/60"
              }`}
            >
              {c} ({countFor(c)})
            </button>
          ))}
        </div>
      </div>

      {/* ===== grid ===== */}
      <div>
        <p className="mb-5 text-sm text-white/40">
          Showing <span className="text-white">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "project" : "projects"}
          {active !== "All" && <> in <span className="text-white">{active}</span></>}
          {platform !== "All" && <> on <span className="text-white">{platform}</span></>}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id || p.url} project={p} index={i} />
          ))}
        </div>
        {!filtered.length && (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-white/40">
            No projects match these filters.
          </p>
        )}
      </div>
    </div>
  );
}
