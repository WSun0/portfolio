import BackButton from "@/components/BackButton";

export default function JourneyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <BackButton href="/poker" label="Back to Poker" />
      <section>
        <h1 className="text-2xl font-bold mb-4">My Poker Journey</h1>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          Coming soon
        </p>
      </section>
    </div>
  );
}
