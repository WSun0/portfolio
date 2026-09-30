import Link from "next/link";

export default function CookingPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-2 pb-20 px-10">
      <section className="glass-panel-static py-8 px-2">
        <h1 className="text-2xl font-bold mb-4">Cooking</h1>
        <p className="text-base opacity-80 mb-8">a collection of home-cooked meals. i&apos;ve never received training, but i&apos;ve wasted hundreds of hours watching food and cooking videos on YouTube, and i enjoy eating out a lot, so i&apos;ve naturally been inspired to try.
        </p>
        <ul className="space-y-2">
          <li>
            <Link href="/cooking/first-time-cooking-wagyu-2025" className="accent-link">
              first time cooking wagyu 2025
            </Link>
          </li>
          <li>
            <Link href="/cooking/christmas-dinner" className="accent-link">
              Christmas dinner 2024
            </Link>
          </li>
          <li>
            <Link href="/cooking/sf-pier-farmers-market-breakfast-2023" className="accent-link">
              SF pier farmer&apos;s market breakfast 2023
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 