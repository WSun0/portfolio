"use client";
import { useEffect, useState, useMemo } from "react";

// Intricate realistic snowflake SVG designs
const SnowflakeDesigns = [
  // Design 1: Classic dendrite snowflake with detailed branches
  () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {/* Main 6 arms */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="8" />
          {/* Primary branches */}
          <line x1="50" y1="20" x2="38" y2="28" />
          <line x1="50" y1="20" x2="62" y2="28" />
          <line x1="50" y1="32" x2="42" y2="38" />
          <line x1="50" y1="32" x2="58" y2="38" />
          {/* Tip detail */}
          <line x1="50" y1="8" x2="46" y2="14" />
          <line x1="50" y1="8" x2="54" y2="14" />
        </g>
      ))}
      <circle cx="50" cy="50" r="4" strokeWidth="1" />
    </svg>
  ),

  // Design 2: Stellar plate snowflake
  () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="12" />
          <line x1="50" y1="18" x2="42" y2="26" />
          <line x1="50" y1="18" x2="58" y2="26" />
          <line x1="50" y1="28" x2="44" y2="32" />
          <line x1="50" y1="28" x2="56" y2="32" />
        </g>
      ))}
      <polygon points="50,38 56,44 56,56 50,62 44,56 44,44" strokeWidth="1" />
    </svg>
  ),

  // Design 3: Fernlike stellar dendrite
  () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="6" />
          {/* Fern-like branches */}
          <line x1="50" y1="14" x2="40" y2="20" />
          <line x1="50" y1="14" x2="60" y2="20" />
          <line x1="50" y1="22" x2="43" y2="27" />
          <line x1="50" y1="22" x2="57" y2="27" />
          <line x1="50" y1="30" x2="45" y2="34" />
          <line x1="50" y1="30" x2="55" y2="34" />
          <line x1="50" y1="38" x2="47" y2="41" />
          <line x1="50" y1="38" x2="53" y2="41" />
          {/* Sub-branches */}
          <line x1="40" y1="20" x2="36" y2="18" />
          <line x1="40" y1="20" x2="38" y2="25" />
          <line x1="60" y1="20" x2="64" y2="18" />
          <line x1="60" y1="20" x2="62" y2="25" />
        </g>
      ))}
      <circle cx="50" cy="50" r="3" strokeWidth="1" />
    </svg>
  ),

  // Design 4: Sectored plate
  () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="15" />
          <line x1="50" y1="22" x2="44" y2="28" />
          <line x1="50" y1="22" x2="56" y2="28" />
        </g>
      ))}
      <circle cx="50" cy="50" r="8" strokeWidth="1" />
      <circle cx="50" cy="50" r="16" strokeWidth="0.8" />
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <line key={`inner-${angle}`} transform={`rotate(${angle} 50 50)`} x1="50" y1="42" x2="50" y2="34" strokeWidth="1" />
      ))}
    </svg>
  ),

  // Design 5: Simple stellar crystal
  () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="10" />
          <line x1="50" y1="16" x2="40" y2="26" />
          <line x1="50" y1="16" x2="60" y2="26" />
        </g>
      ))}
    </svg>
  ),

  // Design 6: Hollow column crystal
  () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="14" />
          <line x1="50" y1="14" x2="44" y2="20" />
          <line x1="50" y1="14" x2="56" y2="20" />
          <line x1="50" y1="26" x2="46" y2="30" />
          <line x1="50" y1="26" x2="54" y2="30" />
          <circle cx="50" cy="20" r="2" strokeWidth="0.8" />
        </g>
      ))}
      <circle cx="50" cy="50" r="5" strokeWidth="1" />
    </svg>
  ),

  // Design 7: Radiating needles
  () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line key={angle} transform={`rotate(${angle} 50 50)`} x1="50" y1="50" x2="50" y2={angle % 60 === 0 ? "12" : "24"} />
      ))}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={`branch-${angle}`} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="20" x2="44" y2="26" />
          <line x1="50" y1="20" x2="56" y2="26" />
        </g>
      ))}
    </svg>
  ),

  // Design 8: Delicate lace pattern
  () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="8" />
          <line x1="50" y1="15" x2="42" y2="22" />
          <line x1="50" y1="15" x2="58" y2="22" />
          <line x1="50" y1="25" x2="45" y2="30" />
          <line x1="50" y1="25" x2="55" y2="30" />
          <line x1="50" y1="35" x2="47" y2="38" />
          <line x1="50" y1="35" x2="53" y2="38" />
          <line x1="42" y1="22" x2="38" y2="20" />
          <line x1="42" y1="22" x2="40" y2="27" />
          <line x1="58" y1="22" x2="62" y2="20" />
          <line x1="58" y1="22" x2="60" y2="27" />
          <circle cx="50" cy="8" r="2" strokeWidth="0.8" />
        </g>
      ))}
      <circle cx="50" cy="50" r="4" strokeWidth="0.8" />
    </svg>
  ),
];

interface Snowflake {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  designIndex: number;
  drift: number;
}

function generateSnowflakes(count: number): Snowflake[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 20 + 14,
    opacity: Math.random() * 0.35 + 0.25,
    duration: Math.random() * 20 + 25,
    delay: -Math.random() * 35,
    designIndex: Math.floor(Math.random() * SnowflakeDesigns.length),
    drift: (Math.random() - 0.5) * 80,
  }));
}

export default function ParticleBackground() {
  const [mounted, setMounted] = useState(false);
  const snowflakes = useMemo(() => generateSnowflakes(40), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-5vh) rotate(0deg);
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
          }
        }
        .snowflake {
          position: fixed;
          top: 0;
          color: #9ca3af;
          pointer-events: none;
          z-index: 1;
          animation: snowfall linear infinite;
          filter: drop-shadow(0 1px 2px rgba(255,255,255,0.5));
        }
      `}</style>
      {snowflakes.map((flake) => {
        const SnowflakeComponent = SnowflakeDesigns[flake.designIndex];
        return (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.x}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
            }}
          >
            <SnowflakeComponent />
          </div>
        );
      })}
    </>
  );
}