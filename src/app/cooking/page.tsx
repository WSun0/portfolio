import Link from "next/link";

export default function CookingPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Cooking</h1>
        <p className="text-base text-gray-800 mb-8">Explore my home-cooked meals and special occasions. Click on an entry to read more.</p>
        <ul className="space-y-4">
          <li>
            <Link href="/cooking/christmas-dinner" className="text-lg text-indigo-700 hover:underline">
              Christmas Dinner 2024
            </Link>
          </li>
          <li>
            <Link href="/cooking/sf-pier-farmers-market-breakfast-2023" className="text-lg text-indigo-700 hover:underline">
              SF Pier Farmer&apos;s Market Breakfast 2023
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 