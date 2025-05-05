"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/poker", label: "Poker" },
    { href: "/cooking", label: "Cooking" },
    { href: "/blog", label: "Blog" },
  ];
  const [hovered, setHovered] = useState(false);
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-gray-200 header-shadow">
      <nav className="max-w-4xl mx-auto flex items-center justify-between px-10 py-2">
        <Link
          href="/"
          className="text-xl font-normal text-gray-900 relative group focus:outline-none font-sans"
          style={{ textDecoration: "none", perspective: 600, fontFamily: 'Inter, Arial, sans-serif' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span className="block w-[140px] h-[32px] relative" style={{ perspective: 600 }}>
            <motion.span
              className="inline-block absolute left-0 top-0 w-full h-full font-sans"
              style={{
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                fontFamily: 'Inter, Arial, sans-serif',
              }}
              animate={{ rotateY: hovered ? -90 : 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
            >
              William Sun
            </motion.span>
            <motion.span
              className="inline-block absolute left-0 top-0 w-full h-full text-indigo-600 font-sans"
              style={{
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                fontFamily: 'Inter, Arial, sans-serif',
              }}
              animate={{ rotateY: hovered ? 0 : 90 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
            >
              wsun1
            </motion.span>
          </span>
        </Link>
        <div className="flex gap-2 text-base font-normal">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`glass-btn nav-link ${pathname === href ? "font-semibold bg-white/90" : ""}`}
              style={{ textDecoration: "none" }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
} 