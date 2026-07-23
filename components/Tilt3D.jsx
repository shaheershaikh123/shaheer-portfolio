"use client";

import { useRef } from "react";

/**
 * Mouse-reactive 3D tilt wrapper (pure CSS transforms — no WebGL).
 * Tilts its children toward the cursor in real 3D perspective and adds a
 * soft moving glare. Falls back gracefully and respects reduced-motion.
 *
 * Props:
 *  - max:   max tilt in degrees (default 10)
 *  - glare: show the moving highlight (default true)
 */
export default function Tilt3D({
  children,
  className = "",
  max = 10,
  glare = true,
  scale = 1.02,
}) {
  const ref = useRef(null);
  const glareRef = useRef(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e) => {
    const el = ref.current;
    if (!el || prefersReduced) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const rotX = (0.5 - py) * max * 2;
    const rotY = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), transparent 55%)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.25s cubic-bezier(0.21,0.47,0.32,0.98)" }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <span
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  );
}
