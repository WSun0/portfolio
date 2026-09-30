import Link from "next/link";

export default function PokerPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-2 pb-20 px-10">
      <section className="glass-panel-static py-8 px-2">
        <h1 className="text-2xl font-bold mb-6">Poker</h1>
        <p className="text-base opacity-80 leading-relaxed mb-6">
          i started playing poker in September 2023 at home games and immediately became obsessed. since then, i have moved up from $0.10/$0.20 and
          mostly play $5/$10 live at Encore Boston Harbor or $2/$4/$8 online at ClubWPT Gold. i am the most studied on 6–9-max no-limit cash, with
          some experience in heads-up, sngs, and mtts. my favorite pros are Linus Loeliger, Chris Brewer, Dan Cates, and Alex Foxen.
        </p>
        <ul className="space-y-2 mt-8">
          <li>
            <Link href="/poker/casinos" className="accent-link">
              casinos i&apos;ve played at
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 