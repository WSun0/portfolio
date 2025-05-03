"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/poker", label: "Poker" },
    { href: "/cooking", label: "Cooking" },
    { href: "/blog", label: "Blog" },
  ];
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur border-b border-gray-200 header-shadow">
      <nav className="max-w-4xl mx-auto flex items-center justify-between px-10 py-2">
        <Link
          href="/"
          className="text-2xl font-normal tracking-tight text-gray-900 relative group focus:outline-none"
          style={{ textDecoration: "none" }}
        >
          William Sun
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full"></span>
        </Link>
        <div className="flex gap-2 text-base font-normal">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`glass-btn ${pathname === href ? "font-semibold bg-white/90" : ""}`}
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