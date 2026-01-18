import Link from "next/link";

export default function CookingPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-2 pb-20 px-10">
      <section className="glass-panel-static py-8 px-2">
        <h1 className="text-2xl font-bold mb-4">Cooking</h1>
        <p className="text-base opacity-80 mb-8">A collection of some home-cooked meals. I&apos;ve never been trained, but I&apos;ve wasted hundreds of hours watching
          YouTube videos about food and cooking, and I enjoy eating out a lot, so naturally I&apos;ve been inspired to experiment in the kitchen.
        </p>
        <ul className="space-y-2">
          <li>
            <Link href="/cooking/first-time-cooking-wagyu-2025" className="accent-link">
              First Time Cooking Wagyu 2025
            </Link>
          </li>
          <li>
            <Link href="/cooking/christmas-dinner" className="accent-link">
              Christmas Dinner 2024
            </Link>
          </li>
          <li>
            <Link href="/cooking/sf-pier-farmers-market-breakfast-2023" className="accent-link">
              SF Pier Farmer&apos;s Market Breakfast 2023
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 