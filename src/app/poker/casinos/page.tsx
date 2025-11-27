"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import BackButton from "@/components/BackButton";

function Spinner() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      minHeight: 200,
    }}>
      <Image
        src="/HomeButtonIcon.png"
        alt="Loading..."
        width={48}
        height={48}
        className="animate-spin"
        style={{
          animationDuration: '1.6s',
          animationTimingFunction: 'steps(8, end)'
        }}
      />
    </div>
  );
}

const PokerMap = dynamic(() => import("@/components/PokerMap"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function CasinosPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <BackButton href="/poker" label="Back to Poker" />
      <section>
        <h1 className="text-2xl font-bold mb-4">Casinos I&apos;ve Played Poker At</h1>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">In-Person Casinos</h2>
          <ul className="list-disc list-inside text-base text-gray-600 space-y-1">
            <li>Encore Boston Harbor (Massachusetts)</li>
            <li>Parx Casino (Pennsylvania)</li>
            <li>Chasers Poker Room (New Hampshire)</li>
            <li>Metro Casino (Puerto Rico)</li>
            <li>Caesars New Orleans (Louisiana)</li>
            <li>Playground Card Room (Montreal)</li>
            <li>... and plenty of home games hosted around Boston and NYC</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Online Poker Rooms</h2>
          <ul className="list-disc list-inside text-base text-gray-600 space-y-1">
            <li>Club WPT Gold</li>
            <li>Ignition</li>
            <li>ACR</li>
            <li>... and plenty of online private games hosted through various Discord servers on pokernow.club</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Thoughts on Online vs. In-Person</h2>
          <p className="text-base text-gray-600 leading-relaxed">While online poker is great because you can play from the comfort of your room and hands go by a lot faster, 
            I have discovered through many personal experiences that there is a severe issue with ensuring gameplay integrity. It is almost trivial to cheat online in ways that 
            are practically undetectable, and there is a whole spectrum of ways to cheat, from softplaying against friends to colluding with other players to using a solver in real time during a hand.</p>
            <br />
            <p className="text-base text-gray-600 leading-relaxed">I&apos;ve witnessed cheating firsthand on both commercial online Poker platforms like ClubWPT Gold and in private online games. 
              I&apos;ve witnessed someone check AK down all the way from preflop through the river in-position despite flopping pair, turning trips, and getting a clean river. The person they were playing against? 
              An account with only ~500 hands played. For some context, most players players at the stakes I was playing during that hand were usually regs and had tens of thousands of hands played.
              I have also had to deal withpeople blatantly admitting to softplaying against their friends in private online games, knowing they will not face any real repercussions or consequencesbecause 
              it&apos;s a random online circle. I&apos;ve also seen people con others out of thousands of dollars in private online games by simply refusing to pay out losses. This happens the most in heads-up, from what I&apos;ve seen.</p>
              <br />
              <p className="text-base text-gray-600 leading-relaxed">Meanwhile, in-person isn&apos;t perfect either. At Encore Boston Harbor, which is actually one of the larger casinos for poker, a large portion of the universe of players at 5/10 are repeating regulars. I see the same circle of players around
                every time, and I have also learned that some players were coaching other players (at the same tables) outside of encore in their down time. While I have no hard evidence of collusion or cheating, it would be very easy for people to set up 
                a communication system that allows them to collude in real time and go undetected, such as bet sizing tells or physical live tells. The reason I mentioned that Encore Boston Harbor is actually a larger casino as far as they go is because these problems are 
                definitely only worse at casinos with smaller player pools.
              </p>
        </div>

        <p className="text-base text-gray-800 mb-2">A map of where I have played poker in-person:</p>
        <div style={{ height: "500px", width: "100%", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", zIndex: 1, position: "relative" }}>
          <PokerMap />
        </div>
      </section>
    </div>
  );
}
