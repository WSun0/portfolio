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
          color: { value: ["#6366f1", "#818cf8", "#a78bfa"] },
          opacity: { 
            value: .5,
            animation: {
              enable: true,
              speed: 2
            }
          },
          size: { 
            value: { min: 0.5, max: 3 },
            animation: {
              enable: true,
              speed: 5
            }
          },
          move: { 
            enable: true, 
            speed: 1, 
            direction: "none", 
            outModes: { default: "out" }
          },
          links: { 
            enable: true, 
            distance: 200, 
            color: "#818cf8", 
            opacity: 0.375, 
            width: 1.5
          },
        },
        detectRetina: true,
      }}
    />
  );
}