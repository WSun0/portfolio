"use client";
import React, { useEffect, useState, useMemo } from "react";

// Seeded random number generator for consistent snowflakes
export function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate a random number in range using seed
export function randomInRange(min: number, max: number, seed: number): number {
  return min + seededRandom(seed) * (max - min);
}

// Branch that connects to the main arm
interface ArmBranch {
  distanceFromCenter: number; // How far along the main arm this branch starts
  length: number;
  angle: number; // Positive = right, negative = left
  thickness: number;
  subBranches: SubBranch[]; // Small branches at the tip
}

// Small sub-branch at the end of a main branch
interface SubBranch {
  length: number;
  angle: number; // Relative to parent branch
}

// Generate branches that connect to the main arm
function generateArmBranches(seed: number, armLength: number): ArmBranch[] {
  const branches: ArmBranch[] = [];
  const numBranchPairs = Math.floor(randomInRange(3, 6, seed));

  // Generate branch pairs at different distances along the arm
  for (let i = 0; i < numBranchPairs; i++) {
    const branchSeed = seed + i * 100;

    // Position along the arm (closer to tip = shorter branches)
    const minDist = 8 + (armLength - 15) * (i / numBranchPairs);
    const maxDist = 8 + (armLength - 10) * ((i + 1) / numBranchPairs);
    const distance = randomInRange(minDist, maxDist, branchSeed);

    // Branch length decreases toward the tip
    const maxBranchLength = Math.max(4, (armLength - distance) * 0.7);
    const branchLength = randomInRange(Math.min(5, maxBranchLength), maxBranchLength, branchSeed + 1);

    // Branch angle
    const angle = randomInRange(30, 60, branchSeed + 2);

    // Thickness decreases toward tip
    const thickness = Math.max(0.6, 1.4 - (distance / armLength) * 0.6);

    // Generate sub-branches at the tip
    const subBranches: SubBranch[] = [];
    const numSubBranches = Math.floor(randomInRange(0, 3, branchSeed + 3));

    for (let j = 0; j < numSubBranches; j++) {
      const subSeed = branchSeed + 50 + j;
      subBranches.push({
        length: randomInRange(2, branchLength * 0.5, subSeed),
        angle: randomInRange(-40, 40, subSeed + 1),
      });
    }

    // Add mirrored pair (left and right)
    branches.push({
      distanceFromCenter: distance,
      length: branchLength,
      angle: angle,
      thickness,
      subBranches,
    });

    branches.push({
      distanceFromCenter: distance,
      length: branchLength,
      angle: -angle,
      thickness,
      subBranches: subBranches.map(sb => ({ ...sb, angle: -sb.angle })),
    });
  }

  return branches;
}

// Render a single branch and its sub-branches
function renderArmBranch(branch: ArmBranch, armIndex: number): React.ReactElement[] {
  const elements: React.ReactElement[] = [];
  const baseKey = `arm${armIndex}-d${branch.distanceFromCenter.toFixed(1)}-a${branch.angle.toFixed(1)}`;

  // Calculate branch start point (on the main arm)
  const startX = 50;
  const startY = 50 - branch.distanceFromCenter;

  // Calculate branch end point
  const angleRad = (branch.angle * Math.PI) / 180;
  const endX = startX + Math.sin(angleRad) * branch.length;
  const endY = startY - Math.cos(angleRad) * branch.length;

  // Main branch line
  elements.push(
    <line
      key={baseKey}
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      strokeWidth={branch.thickness}
    />
  );

  // Sub-branches at the tip
  branch.subBranches.forEach((sub, idx) => {
    const subAngleRad = ((branch.angle + sub.angle) * Math.PI) / 180;
    const subEndX = endX + Math.sin(subAngleRad) * sub.length;
    const subEndY = endY - Math.cos(subAngleRad) * sub.length;

    elements.push(
      <line
        key={`${baseKey}-sub${idx}`}
        x1={endX}
        y1={endY}
        x2={subEndX}
        y2={subEndY}
        strokeWidth={branch.thickness * 0.6}
      />
    );
  });

  // Add small tip fork if no sub-branches
  if (branch.subBranches.length === 0 && branch.length > 4) {
    const tipLength = branch.length * 0.3;
    const tipAngle1 = ((branch.angle - 25) * Math.PI) / 180;
    const tipAngle2 = ((branch.angle + 25) * Math.PI) / 180;

    elements.push(
      <line
        key={`${baseKey}-tip1`}
        x1={endX}
        y1={endY}
        x2={endX + Math.sin(tipAngle1) * tipLength}
        y2={endY - Math.cos(tipAngle1) * tipLength}
        strokeWidth={branch.thickness * 0.5}
      />,
      <line
        key={`${baseKey}-tip2`}
        x1={endX}
        y1={endY}
        x2={endX + Math.sin(tipAngle2) * tipLength}
        y2={endY - Math.cos(tipAngle2) * tipLength}
        strokeWidth={branch.thickness * 0.5}
      />
    );
  }

  return elements;
}

// Procedurally generate a unique snowflake SVG
export function generateSnowflakeSVG(seed: number): React.ReactElement {
  const armLength = randomInRange(34, 44, seed);
  const armThickness = randomInRange(1.3, 1.8, seed + 1);
  const hasCenter = seededRandom(seed + 2) > 0.4;
  const centerSize = randomInRange(2, 4, seed + 3);

  // Generate branches for one arm (will be replicated 6 times)
  const branches = generateArmBranches(seed + 10, armLength);

  // Tip decoration style
  const tipStyle = Math.floor(randomInRange(0, 3, seed + 4));

  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeLinecap="round">
      {/* Render 6 arms with 60-degree rotation */}
      {[0, 60, 120, 180, 240, 300].map((rotation, armIndex) => (
        <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
          {/* Main arm - connected to center */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2={50 - armLength}
            strokeWidth={armThickness}
          />

          {/* Arm tip decoration */}
          {tipStyle === 0 && (
            <>
              <line
                x1="50"
                y1={50 - armLength}
                x2="46"
                y2={50 - armLength + 5}
                strokeWidth={armThickness * 0.6}
              />
              <line
                x1="50"
                y1={50 - armLength}
                x2="54"
                y2={50 - armLength + 5}
                strokeWidth={armThickness * 0.6}
              />
            </>
          )}
          {tipStyle === 1 && (
            <>
              <line
                x1="50"
                y1={50 - armLength}
                x2="44"
                y2={50 - armLength + 4}
                strokeWidth={armThickness * 0.5}
              />
              <line
                x1="50"
                y1={50 - armLength}
                x2="56"
                y2={50 - armLength + 4}
                strokeWidth={armThickness * 0.5}
              />
              <line
                x1="50"
                y1={50 - armLength}
                x2="50"
                y2={50 - armLength - 3}
                strokeWidth={armThickness * 0.5}
              />
            </>
          )}
          {tipStyle === 2 && (
            <>
              <line
                x1="50"
                y1={50 - armLength}
                x2="45"
                y2={50 - armLength + 3}
                strokeWidth={armThickness * 0.5}
              />
              <line
                x1="50"
                y1={50 - armLength}
                x2="55"
                y2={50 - armLength + 3}
                strokeWidth={armThickness * 0.5}
              />
              <line
                x1="50"
                y1={50 - armLength}
                x2="47"
                y2={50 - armLength - 2}
                strokeWidth={armThickness * 0.4}
              />
              <line
                x1="50"
                y1={50 - armLength}
                x2="53"
                y2={50 - armLength - 2}
                strokeWidth={armThickness * 0.4}
              />
            </>
          )}

          {/* Branches - all connected to main arm */}
          {branches.map((branch, idx) => renderArmBranch(branch, armIndex * 100 + idx))}
        </g>
      ))}

      {/* Center decoration */}
      {hasCenter && (
        <circle cx="50" cy="50" r={centerSize} strokeWidth="0.8" />
      )}
    </svg>
  );
}

interface Snowflake {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  seed: number;
}

function generateSnowflakes(count: number): Snowflake[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 22 + 16,
    opacity: Math.random() * 0.4 + 0.2,
    duration: Math.random() * 20 + 25,
    delay: -Math.random() * 35,
    seed: Math.floor(Math.random() * 100000),
  }));
}

interface ParticleBackgroundProps {
  visible?: boolean;
}

export default function ParticleBackground({ visible = true }: ParticleBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const snowflakes = useMemo(() => generateSnowflakes(15), []);
  const snowflakeSVGs = useMemo(
    () => snowflakes.map((flake) => generateSnowflakeSVG(flake.seed)),
    [snowflakes]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ display: visible ? 'block' : 'none' }}>
      {/* SVG gradient definition for snowflakes */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="snowflake-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c8be0" />
            <stop offset="40%" stopColor="#6366f1" />
            <stop offset="70%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>
        </defs>
      </svg>
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
          pointer-events: none;
          z-index: 1;
          animation: snowfall linear infinite;
          filter: drop-shadow(0 1px 3px rgba(99, 102, 241, 0.3));
        }
        .snowflake svg {
          stroke: url(#snowflake-gradient);
        }
      `}</style>
      {snowflakes.map((flake, idx) => (
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
          {snowflakeSVGs[idx]}
        </div>
      ))}
    </div>
  );
}
