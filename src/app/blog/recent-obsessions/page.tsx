import BackButton from "@/components/BackButton";

export default function RecentObsessionsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <BackButton href="/blog" label="Back to Blog" />
      <section>
        <h1 className="text-2xl font-bold mb-4">Recent Obsessions</h1>
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          Content coming soon
        </p>
      </section>
    </div>
  );
}
