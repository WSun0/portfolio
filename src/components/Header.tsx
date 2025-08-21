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
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-200 header-shadow">
      <nav className="max-w-4xl mx-auto flex items-center justify-between px-10 py-2">
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
            className="w-10 h-10"
            animate={hovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
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