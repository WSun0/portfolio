import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-2 pb-20 px-10">
      <section className="glass-panel-static py-8 px-2">
        <h1 className="text-2xl font-bold mb-6">Blog</h1>
        <ul className="space-y-4">
          <li className="flex items-center gap-6 text-base">
            <span className="w-24 shrink-0 text-sm opacity-50">12.15.2025</span>
            <Link href="/blog/detoxifying-life" className="accent-link">
              Detoxifying Life
            </Link>
          </li>
          <li className="flex items-center gap-6 text-base">
            <span className="w-24 shrink-0 text-sm opacity-50">1.10.2026</span>
            <Link href="/blog/small-changes-for-health-improvements" className="accent-link">
              Small Changes for Health Improvements
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 