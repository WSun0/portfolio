"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-[60vh]"
    >
      {children}
    </motion.div>
  );
} 