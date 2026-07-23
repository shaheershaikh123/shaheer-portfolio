"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight"
        >
          SHAHEER<span className="text-white/40">.</span>
        </Link>

        {/* desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`relative text-sm uppercase tracking-widest transition-colors hover:text-white ${
                  pathname === l.href ? "text-white" : "text-white/50 underline-grow"
                }`}
              >
                {l.label}
                {pathname === l.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="/Shaheer-CV.pdf"
          download="Shaheer-Shaikh-CV.pdf"
          className="btn-shine hidden rounded-full border border-white/30 px-5 py-2 text-xs uppercase tracking-widest transition-all hover:bg-white hover:text-black md:block"
        >
          Hire Me
        </a>

        {/* mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span
            className={`block h-px w-6 bg-white transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/10 bg-black/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block py-3 font-[family-name:var(--font-display)] text-2xl font-medium ${
                      pathname === l.href ? "text-white" : "text-white/50"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/Shaheer-CV.pdf"
                  download="Shaheer-Shaikh-CV.pdf"
                  className="mt-2 block rounded-full border border-white/30 px-5 py-3 text-center text-xs uppercase tracking-widest"
                >
                  Hire Me — Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
