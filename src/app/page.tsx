"use client";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <div className="relative w-full max-w-2xl mx-auto pt-6 pb-24 px-6 font-sans">
      <ParticleBackground />
      <div className="relative z-10">
        <section className="mb-16">
          <h2 className="text-lg text-[#1a1a1a] font-semibold mb-2 tracking-tight">About</h2>
          <p className="mb-4 text-base text-gray-800">
            I'm a student studying Computer Science and Math at Northeastern University.
          </p>
          <p className="mb-4 text-base text-gray-800">
            I enjoy programming, mathematics, and exploring creative projects in my free time.
          </p>
        </section>
        <section>
          <h2 className="text-lg text-[#1a1a1a] font-semibold mb-2 tracking-tight">Updates</h2>
          <div className="text-gray-500 text-sm mb-2">2024</div>
          <ul className="space-y-2">
            <li>
              <span className="text-gray-400 mr-2 font-semibold uppercase">Dec 24, 2024</span>
              Launched my new personal website.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}