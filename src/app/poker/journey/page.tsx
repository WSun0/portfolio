import BackButton from "@/components/BackButton";

export default function JourneyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-2 pb-20 px-10">
      <BackButton href="/poker" label="Back to Poker" />
      <section className="glass-panel-static py-8 px-2">
        <h1 className="text-2xl font-bold mb-6">My Poker Journey</h1>
        <p className="text-base opacity-60 leading-relaxed">
          Coming soon
        </p>
      </section>
    </div>
  );
}
