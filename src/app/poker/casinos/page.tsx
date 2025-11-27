"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

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
      <section>
        <h1 className="text-2xl font-bold mb-4">Casinos I've Played Poker At</h1>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">In-Person Casinos</h2>
          <ul className="list-disc list-inside text-base text-gray-600 space-y-1">
            <li>Encore Boston Harbor (Massachusetts)</li>
            <li>Parx Casino (Pennsylvania)</li>
            <li>Chasers Poker Room (New Hampshire)</li>
            <li>Metro Casino (Puerto Rico)</li>
            <li>Caesars New Orleans (Louisiana)</li>
            <li>Playground Card Room (Montreal)</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Online Poker Rooms</h2>
          <ul className="list-disc list-inside text-base text-gray-600 space-y-1">
            <li>Club WPT Gold</li>
            <li>Ignition</li>
            <li>ACR</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Thoughts on Each Location</h2>
          <p className="text-base text-gray-600 leading-relaxed">Coming soon</p>
        </div>

        <p className="text-base text-gray-800 mb-2">A map of where I have played poker in-person:</p>
        <div style={{ height: "500px", width: "100%", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", zIndex: 1, position: "relative" }}>
          <PokerMap />
        </div>
      </section>
    </div>
  );
}
