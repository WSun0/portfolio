import Link from "next/link";

export default function CookingPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Cooking</h1>
        <p className="text-base text-gray-600 mb-8">A collection of some home-cooked meals. I&apos;ve never been trained, but I&apos;ve wasted hundreds of hours watching
          YouTube videos about food and cooking, and I enjoy eating out a lot, so naturally I&apos;ve been inspired to experiment in the kitchen.
        </p>
        <ul className="space-y-4">
          <li>
            <Link href="/cooking/first-time-cooking-wagyu-2025" className="text-base text-gray-600 underline hover:text-indigo-600 hover:decoration-indigo-600 underline-offset-2 transition-colors">
              First Time Cooking Wagyu 2025
            </Link>
          </li>
          <li>
            <Link href="/cooking/christmas-dinner" className="text-base text-gray-600 underline hover:text-indigo-600 hover:decoration-indigo-600 underline-offset-2 transition-colors">
              Christmas Dinner 2024
            </Link>
          </li>
          <li>
            <Link href="/cooking/sf-pier-farmers-market-breakfast-2023" className="text-base text-gray-600 underline hover:text-indigo-600 hover:decoration-indigo-600 underline-offset-2 transition-colors">
              SF Pier Farmer&apos;s Market Breakfast 2023
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 