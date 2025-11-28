"use client";
import ParticleBackground from "@/components/ParticleBackground";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-4xl mx-auto pt-4 pb-24 px-10 font-sans"
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
          <h2 className="text-2xl font-bold mb-6 tracking-tighter text-gray-900">William Sun</h2>
          <p className="mb-6 text-base text-gray-600 leading-relaxed">
            I&apos;m a student at Northeastern University studying CS & Math graduating in December 2025.
          </p>
          <p className="mb-6 text-base text-gray-600 leading-relaxed">
            My current interests include quantitative trading, game theory (particularly zero-sum), and deep reinforcement learning. For fun, I enjoy playing poker, cooking and eating out, traveling,{" "}
            <a
              href="https://tracker.gg/valorant/profile/riot/WSun1%23aly/overview?platform=pc&playlist=competitive&season=4539cac3-47ae-90e5-3d01-b3812ca3274e"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 underline decoration-gray-600 hover:decoration-indigo-600 underline-offset-2 transition-colors"
            >
              first-person shooters
            </a>
            , and{" "}
            <a
              href="https://www.smogon.com/forums/members/will.485997/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 underline decoration-gray-600 hover:decoration-indigo-600 underline-offset-2 transition-colors"
            >
              battling Pokémon competitively
            </a>
            .
          </p>
          <p className="mb-0 text-base text-gray-600 leading-relaxed">
            Feel free to reach out at <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm text-gray-800">sun[dot]wil[at]northeastern[dot]edu</code>!
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
}