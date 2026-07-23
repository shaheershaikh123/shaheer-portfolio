"use client";

import { motion } from "framer-motion";

// Next.js re-mounts this template on every navigation, so each page
// smoothly fades and slides in — a subtle transition across the whole site.
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
