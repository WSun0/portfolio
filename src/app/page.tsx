"use client";
import ParticleBackground from "@/components/ParticleBackground";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-2xl mx-auto pt-6 pb-24 px-6 font-sans"
    >
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/10 via-white to-purple-50/5 -z-10" />
      <div className="relative z-10">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 tracking-tighter text-gray-900">About</h2>
          <p className="mb-6 text-base text-gray-600 leading-relaxed max-w-lg">
            I&apos;m a student studying Computer Science and Math at Northeastern University.
          </p>
          <p className="mb-0 text-base text-gray-600 leading-relaxed max-w-lg">
            I enjoy programming, mathematics, and exploring creative projects in my free time.
          </p>
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 tracking-tighter text-gray-900">Updates</h2>
          <ul className="space-y-3">
            <li className="text-gray-800 transition duration-150">
              <span className="text-gray-500 mr-3 font-medium text-sm">May 5, 2025</span>
              Launched this portfolio website.
            </li>
          </ul>
        </motion.section>
      </div>
    </motion.div>
  );
}