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
      className="fixed inset-0 z-0"
      options={{
        fullScreen: false,
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        particles: {
          number: { 
            value: 40, 
            density: { 
              enable: true 
            } 
          },
          color: { value: "#6366f1" },
          opacity: { value: 0.3 },
          size: { value: 3 },
          move: { 
            enable: true, 
            speed: 0.5, 
            direction: "none", 
            outModes: { default: "out" } 
          },
          links: { 
            enable: true, 
            distance: 150, 
            color: "#6366f1", 
            opacity: 0.2, 
            width: 1 
          },
        },
        detectRetina: true,
      }}
    />
  );
}