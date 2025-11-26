import Link from "next/link";

export default function PokerPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Poker</h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Click{" "}
          <Link
            href="/poker/casinos"
            className="text-gray-600 hover:text-indigo-600 underline decoration-gray-600 hover:decoration-indigo-600 underline-offset-2 transition-colors"
          >
            here
          </Link>
          {" "}to see where I&apos;ve played poker at and my thoughts on each place.
        </p>
      </section>
    </div>
  );
} 