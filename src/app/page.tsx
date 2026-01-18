"use client";
import ParticleBackground from "@/components/ParticleBackground";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-4xl mx-auto pt-2 pb-24 px-10 font-sans"
    >
      <ParticleBackground />
      <div className="relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel-static py-8 px-2"
        >
          <h2 className="text-2xl font-bold mb-6 tracking-tighter">William Sun</h2>
          <p className="mb-6 text-base opacity-80 leading-relaxed">
            I&apos;m a student at Northeastern University studying CS & Math graduating in December 2025.
          </p>
          <p className="mb-6 text-base opacity-80 leading-relaxed">
            My current interests include quantitative trading, game theory (particularly zero-sum), and deep reinforcement learning. For fun, I enjoy playing poker, cooking and eating out, traveling,{" "}
            <a
              href="https://tracker.gg/valorant/profile/riot/WSun1%23aly/overview?platform=pc&playlist=competitive&season=4539cac3-47ae-90e5-3d01-b3812ca3274e"
              target="_blank"
              rel="noopener noreferrer"
              className="accent-link font-medium opacity-100"
            >
              first-person shooters
            </a>
            , and{" "}
            <a
              href="https://www.smogon.com/forums/members/will.485997/"
              target="_blank"
              rel="noopener noreferrer"
              className="accent-link font-medium opacity-100"
            >
              battling Pokémon competitively
            </a>
            .
          </p>
          <p className="mb-0 text-base opacity-80 leading-relaxed">
            Feel free to reach out at <code className="glass-code text-sm">sun[dot]wil[at]northeastern[dot]edu</code>!
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
}