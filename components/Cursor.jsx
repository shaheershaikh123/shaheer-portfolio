"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let x = -100, y = -100, rx = -100, ry = -100;
    let hovering = false;
    let raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target;
      hovering = Boolean(
        t.closest && t.closest("a, button, [role=button], input, textarea, select, label")
      );
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      const scale = hovering ? 2.2 : 1;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${scale})`;
      ring.style.opacity = hovering ? "0.9" : "0.5";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 rounded-full bg-white mix-blend-difference md:block"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border border-white opacity-50 mix-blend-difference transition-opacity duration-200 md:block"
        style={{ transitionProperty: "opacity" }}
      />
    </>
  );
}
