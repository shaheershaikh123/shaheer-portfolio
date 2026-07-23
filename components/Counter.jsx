"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/* Animated count-up: accepts values like "500+", "3+", "24/7", "4" */
export default function Counter({ value, duration = 1.6, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = /^(\d+)(.*)$/.exec(String(value));
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  if (target === null) {
    return <span ref={ref} className={className}>{value}</span>;
  }
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}
