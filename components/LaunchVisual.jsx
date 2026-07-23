"use client";

import { motion } from "framer-motion";

function BrowserFrame({ shot, url, className, delay = 0, tilt = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`overflow-hidden rounded-xl border border-white/15 bg-[#111] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.05] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-2 flex-1 truncate rounded-md bg-black/50 px-2.5 py-0.5 text-[9px] tracking-wide text-white/40">
          {url}
        </span>
      </div>
      <div className="group relative h-full overflow-hidden bg-white">
        <img src={shot} alt="" loading="lazy" className="card-shot w-full" />
      </div>
    </motion.div>
  );
}

function FloatChip({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`animate-floaty absolute z-20 ${className}`}
      style={{ animationDelay: `${delay * 2}s` }}
    >
      <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/85 px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_40px_-10px_rgba(255,255,255,0.2)] backdrop-blur-sm">
        {children}
      </span>
    </motion.div>
  );
}

/* Creative animated visual for the launch CTA — layered browser mockups,
   floating tool chips and glow, all in the site's monochrome branding */
export default function LaunchVisual() {
  return (
    <div className="relative mx-auto aspect-[5/4.4] w-full max-w-xl select-none sm:aspect-[5/4]">
      {/* glow + decorative rings */}
      <div className="animate-breathe absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-[90px]" />
      <div className="animate-spin-slow absolute -right-4 -top-4 h-36 w-36 rounded-full border border-dashed border-white/15" />
      <div className="absolute -left-6 bottom-10 h-20 w-20 rounded-full border border-white/10" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* main browser */}
      <BrowserFrame
        shot="/shots/d1techcreative.webp"
        url="yourbusiness.com"
        tilt={-2}
        className="absolute left-0 top-6 z-10 h-[68%] w-[76%]"
      />

      {/* secondary browser */}
      <BrowserFrame
        shot="/shots/millicollections.webp"
        url="yourstore.com"
        tilt={4}
        delay={0.2}
        className="absolute bottom-0 right-0 z-10 h-[52%] w-[58%]"
      />

      {/* floating chips */}
      <FloatChip className="left-[4%] top-[2%]" delay={0.35}>
        <img src="/icons/wordpress.svg" alt="" className="h-4 w-4" /> WordPress
      </FloatChip>
      <FloatChip className="right-[2%] top-[34%]" delay={0.5}>
        <img src="/icons/ghl.png" alt="" className="h-4 w-4 rounded-sm" /> GoHighLevel
      </FloatChip>
      <FloatChip className="bottom-[36%] left-[2%]" delay={0.65}>
        <img src="/icons/shopify.svg" alt="" className="h-4 w-4" /> Shopify
      </FloatChip>
      <FloatChip className="bottom-[4%] left-[16%]" delay={0.8}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
        Loads in &lt;2s
      </FloatChip>

      {/* stat badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute right-[6%] top-[6%] z-20 rounded-2xl border border-white/15 bg-black/85 px-5 py-3.5 text-center shadow-[0_15px_50px_-15px_rgba(255,255,255,0.25)] backdrop-blur-sm"
      >
        <p className="font-[family-name:var(--font-display)] text-2xl font-bold">500+</p>
        <p className="text-[9px] uppercase tracking-widest text-white/50">Sites launched</p>
      </motion.div>
    </div>
  );
}
