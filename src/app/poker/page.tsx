import Link from "next/link";

export default function PokerPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Poker</h1>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          I started playing poker in September 2023 at home games and immediately became obsessed. Since then, I have moved up from $0.10/$0.20 and 
          mostly play $5/$10 live at Encore Boston Harbor or $2/$4/$8 online at ClubWPT Gold. I am the most studied in 6–9-max no-limit cash, with 
          some experience in heads-up, SNGs, and MTTs. My favorite pros are Linus Loeliger, Chris Brewer, and Dan Cates.
        </p>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          You can find a list of casinos I&apos;ve played poker at, as well as my thoughts on each {" "}
          <Link
            href="/poker/casinos"
            className="text-gray-600 hover:text-indigo-600 underline decoration-gray-600 hover:decoration-indigo-600 underline-offset-2 transition-colors"
          >
            here
          </Link>
          {" "}.
        </p>
        <p className="text-base text-gray-600 leading-relaxed">
          You can find some of my hand histories and my thoughts on them {" "}
          <Link
            href="/poker/hands"
            className="text-gray-600 hover:text-indigo-600 underline decoration-gray-600 hover:decoration-indigo-600 underline-offset-2 transition-colors"
          >
            here
          </Link>
          {" "}.
        </p>
      </section>
    </div>
  );
} 