import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <div className="relative w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <ParticleBackground />
      <div className="text-left">
        <section className="mb-12">
          <h2 className="text-2xl text-gray-900 mb-4">About</h2>
          <p className="mb-4 text-base text-gray-800">
            I'm a student studying Computer Science and Math at Northeastern University.
          </p>
          <p className="mb-4 text-base text-gray-800">
            I enjoy programming, mathematics, and exploring creative projects in my free time.
          </p>
        </section>
        <section>
          <h2 className="text-2xl text-gray-900 mb-4">Updates</h2>
          <div className="text-gray-500 text-sm mb-2">2024</div>
          <ul className="space-y-2">
            <li>
              <span className="text-gray-400 mr-2">Dec 24, 2024</span>
              Launched my new personal website.
            </li>
            <li>
              <span className="text-gray-400 mr-2">Aug 30, 2024</span>
              Started a new project in mathematics and computer science.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
