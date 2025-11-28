"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [hovered, setHovered] = useState(false);

  return (
    <header className="w-full relative z-20">
      <nav className="max-w-4xl mx-auto flex items-center justify-between px-10 py-6">
        <Link
          href="/"
          className="relative group focus:outline-none font-sans"
          style={{ textDecoration: "none" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.img
            src="/HomeButtonIcon.png"
            alt="Home Icon"
            className="w-8 h-8 opacity-60 hover:opacity-100 transition-opacity"
            animate={hovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </Link>
        <div className="flex items-center gap-2 text-base text-gray-600">
          <Link href="/blog" className="hover:text-gray-900 transition">
            Blog
          </Link>
          <span>·</span>
          <Link href="/poker" className="hover:text-gray-900 transition">
            Poker
          </Link>
          <span>·</span>
          <Link href="/cooking" className="hover:text-gray-900 transition">
            Cooking
          </Link>
        </div>
      </nav>
    </header>
  );
}