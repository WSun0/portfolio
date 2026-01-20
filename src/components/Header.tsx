"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [hovered, setHovered] = useState(false);

  return (
    <header className="w-full relative z-20 sticky top-0">
      <nav className="glass-nav">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-10 py-4">
          <Link
            href="/"
            className="relative group focus:outline-none font-sans glass-btn glass-btn-no-shimmer !p-2 !rounded-xl"
            style={{ textDecoration: "none" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <motion.img
              src="/HomeButtonIcon.png"
              alt="Home Icon"
              className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity"
              animate={hovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/blog" className="glass-btn !py-2 !px-4">
              Blog
            </Link>
            <Link href="/poker" className="glass-btn !py-2 !px-4">
              Poker
            </Link>
            <Link href="/cooking" className="glass-btn !py-2 !px-4">
              Cooking
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}