import Link from "next/link";

export default function PokerPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-2 pb-20 px-10">
      <section className="glass-panel-static py-8 px-2">
        <h1 className="text-2xl font-bold mb-6">Poker</h1>
        <p className="text-base opacity-80 leading-relaxed mb-6">
          I started playing poker in September 2023 at home games and immediately became obsessed. Since then, I have moved up from $0.10/$0.20 and
          mostly play $5/$10 live at Encore Boston Harbor or $2/$4/$8 online at ClubWPT Gold. I am the most studied on 6–9-max no-limit cash, with
          some experience in heads-up, SNGs, and MTTs. My favorite pros are Linus Loeliger, Chris Brewer, and Dan Cates.
        </p>
        <ul className="space-y-2 mt-8">
          <li>
            <Link href="/poker/casinos" className="accent-link">
              Casinos I&apos;ve Played At
            </Link>
          </li>
          <li>
            <Link href="/poker/hands" className="accent-link">
              Hand Histories
            </Link>
          </li>
          <li>
            <Link href="/poker/journey" className="accent-link">
              My Poker Journey
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 