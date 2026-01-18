import BackButton from "@/components/BackButton";

export default function HandsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-2 pb-20 px-10">
      <BackButton href="/poker" label="Back to Poker" />
      <section className="glass-panel-static py-8 px-2">
        <h1 className="text-2xl font-bold mb-4">Hand Histories</h1>
        <p className="text-base opacity-80 leading-relaxed mb-8">
          A collection of interesting hands I&apos;ve played, with analysis and thought processes.
        </p>

        <div className="space-y-4">
          <div className="glass-card p-6 border-l-4 border-indigo-500">
            <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
            <p className="text-sm opacity-60">More hand histories to be added</p>
          </div>
        </div>
      </section>
    </div>
  );
}
