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
    <div className="w-full max-w-4xl mx-auto pt-2 pb-20 px-10">
      <BackButton href="/poker" label="Back to Poker" />
      <section className="glass-panel-static py-8 px-2">
        <h1 className="text-2xl font-bold mb-6">Casinos I&apos;ve Played Poker At</h1>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-3">In-Person Casinos</h2>
            <ul className="text-base opacity-80 space-y-2">
              <li>Encore Boston Harbor (Massachusetts)</li>
              <li>Parx Casino (Pennsylvania)</li>
              <li>Chasers Poker Room (New Hampshire)</li>
              <li>Metro Casino (Puerto Rico)</li>
              <li>Caesars New Orleans (Louisiana)</li>
              <li>Playground Card Room (Montreal)</li>
              <li className="opacity-60">... and plenty of home games around Boston and NYC</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-3">Online Poker Rooms</h2>
            <ul className="text-base opacity-80 space-y-2">
              <li>Club WPT Gold</li>
              <li>Ignition</li>
              <li>ACR</li>
              <li className="opacity-60">... and plenty of private games on pokernow.club</li>
            </ul>
          </div>
        </div>

        <div className="glass-card p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">Thoughts on Online vs. In-Person</h2>
          <div className="text-base opacity-80 leading-relaxed space-y-4">
            <p>While online poker is great because you can play from the comfort of your room and hands move much faster,
              I&apos;ve discovered through personal experience that there is a severe problem with gameplay integrity. It&apos;s almost trivial to cheat online in ways that
              are practically undetectable. There&apos;s a whole spectrum of cheating, from softplaying against friends, to colluding with other players, to running a solver in real time.</p>
            <p>I&apos;ve witnessed cheating firsthand on both commercial platforms like ClubWPT Gold and in private online games.
              I once saw someone check AK down all the way from preflop through the river in position despite flopping top pair, turning trips, and getting a clean river. Their opponent?
              An account with only ~500 hands played. For context, most players at those stakes were regs with tens of thousands of hands played. I&apos;ve also dealt with people openly admitting to softplaying
              against their friends in private online games, knowing they will not face any consequences or real repercussions because it&apos;s a random online circle, and nobody knows them in real life.
              I&apos;ve even seen players scam others out of thousands of dollars by simply refusing to pay out losses, espceially in heads-up online matches.</p>
            <p>In-person poker isn&apos;t perfect either. At Encore Boston Harbor, one of the larger poker rooms, a big portion of the 5/10 player pool
              consists of the same recurring regulars. I see the same group nearly every session. I&apos;ve also learned that some of these players coach each other away from the casino in their downtime.
              While I don&apos;t have hard evidence of collusion, it would be very easy for people to set up communication systems that let them collude in real time through coordinated bet sizing or physical tells.
              And since Encore is one of the larger casinos, these issues are almost certainly worse in smaller player pools.
            </p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">A map of where I have played poker in-person:</h2>
        <div className="glass-image-container" style={{ height: "500px", width: "100%", zIndex: 1, position: "relative" }}>
          <PokerMap />
        </div>
      </section>
    </div>
  );
}
