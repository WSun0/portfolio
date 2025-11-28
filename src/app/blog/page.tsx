import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Blog</h1>
        <ul className="space-y-4">
          <li>
            <Link href="/blog/recent-obsessions" className="text-base text-gray-800 underline hover:text-indigo-600 hover:decoration-indigo-600 underline-offset-2 transition-colors">
              Recent Obsessions
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 