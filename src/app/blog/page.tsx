import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Blog</h1>
        <ul className="space-y-4">
          <li className="text-base text-gray-600 flex gap-6">
            <span className="w-24 shrink-0">12.15.2025</span>
            <Link href="/blog/detoxifying-life" className="underline hover:text-indigo-600 hover:decoration-indigo-600 underline-offset-2 transition-colors">
              Detoxifying Life
            </Link>
          </li>
          <li className="text-base text-gray-600 flex gap-6">
            <span className="w-24 shrink-0">1.10.2026</span>
            <Link href="/blog/small-changes-for-health-improvements" className="underline hover:text-indigo-600 hover:decoration-indigo-600 underline-offset-2 transition-colors">
              Small Changes for Health Improvements
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 