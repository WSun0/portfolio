"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          style={{ textDecoration: "none" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative w-[140px] h-[32px] overflow-hidden">
            <AnimatePresence mode="wait">
              {!hovered ? (
                <motion.div 
                  key="william"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center"
                  style={{ fontFamily: "Inter, Arial, sans-serif" }}
                >
                  William Sun
                </motion.div>
              ) : (
                <motion.div 
                  key="wsun1"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.05 }}
                  className="absolute inset-0 flex items-center text-indigo-600"
                  style={{ fontFamily: "Inter, Arial, sans-serif" }}
                >
                  wsun1
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>
        <div className="flex gap-2 text-base font-normal">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`glass-btn nav-link ${pathname === href ? "font-semibold bg-white/90" : "hover:bg-white/50"}`}
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