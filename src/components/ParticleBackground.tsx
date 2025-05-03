"use client";
import { useEffect, useState } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10"
      options={{
        fullScreen: false,
        background: { color: { value: "#fff" } },
        fpsLimit: 60,
        particles: {
          number: { value: 20, density: { enable: true } },
          color: { value: "#bdbdbd" },
          opacity: { value: 0.12 },
          size: { value: 2 },
          move: { enable: true, speed: 0.15, direction: "none", outModes: "out" },
          links: { enable: true, distance: 120, color: "#bdbdbd", opacity: 0.08, width: 1 },
        },
        detectRetina: true,
      }}
    />
  );
} 