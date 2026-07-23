"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import ProjectCard from "./ProjectCard";

/* Full-width auto-playing featured-work carousel with arrows and dots */
export default function ProjectCarousel({ projects = [], count = 12 }) {
  const items = projects.slice(0, count);
  const trackRef = useRef(null);
  const resumeTimer = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setPages(Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* width of one card + the gap between cards */
  const cardStep = () => {
    const el = trackRef.current;
    const card = el?.firstElementChild;
    return card ? card.getBoundingClientRect().width + 24 : el?.clientWidth || 0;
  };

  /* autoplay — advances ONE card every few seconds, loops back to start */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 20;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: cardStep(), behavior: "smooth" });
    }, 3000);
    return () => clearInterval(id);
  }, [paused]);

  /* pause on touch, resume a few seconds after the user lets go */
  const touchPause = () => {
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 6000);
  };
  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  /* arrows also move one card at a time */
  const go = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white/70 transition-all hover:border-white hover:bg-white hover:text-black";

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={touchPause}
    >
      <div className="mx-auto mt-10 flex max-w-7xl items-center justify-end gap-3 px-6">
        <button aria-label="Previous projects" onClick={() => go(-1)} className={arrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button aria-label="Next projects" onClick={() => go(1)} className={arrow}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* full-bleed track — cards peek at the screen edges */}
      <div
        ref={trackRef}
        onScroll={measure}
        className="scrollbar-none mt-6 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 md:px-10"
      >
        {items.map((p, i) => (
          <div
            key={p.id || p.url}
            className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[23.5%]"
          >
            <ProjectCard project={p} index={i} />
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              const el = trackRef.current;
              if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
            }}
            className={`h-2 rounded-full transition-all ${
              i === page ? "w-8 bg-white" : "w-2 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
