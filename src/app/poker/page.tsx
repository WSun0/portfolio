"use client";
import dynamic from "next/dynamic";

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
      <img
        src="/HomeButtonIcon.png"
        alt="Loading..."
        className="animate-spin w-12 h-12"
        style={{ animationDuration: '0.8s' }}
      />
    </div>
  );
}

const PokerMap = dynamic(() => import("@/components/PokerMap"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function PokerPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Poker</h1>
        <p className="text-base text-gray-800 mb-8">Explore poker rooms and casinos! Click on a pin for more info.</p>
        <div style={{ height: "500px", width: "100%", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", zIndex: 1, position: "relative" }}>
          <PokerMap />
        </div>
      </section>
    </div>
  );
} 