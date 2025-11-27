import BackButton from "@/components/BackButton";

export default function HandsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <BackButton href="/poker" label="Back to Poker" />
      <section>
        <h1 className="text-2xl font-bold mb-4">Hand Histories</h1>
        <p className="text-base text-gray-600 leading-relaxed mb-8">
          A collection of interesting hands I&apos;ve played, with analysis and thought processes.
        </p>

        <div className="space-y-12">
          {/* Hand history entries will go here */}
          <div className="border-l-4 border-indigo-500 pl-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Coming Soon</h2>
            <p className="text-sm text-gray-500 mb-4">More hand histories to be added</p>
          </div>
        </div>
      </section>
    </div>
  );
}
