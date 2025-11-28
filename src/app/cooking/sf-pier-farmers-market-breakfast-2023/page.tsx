import Image from "next/image";
import BackButton from "@/components/BackButton";

const images = [
  "/cooking/sf-pier-farmers-market-breakfast-2023/finished.JPG",
  "/cooking/sf-pier-farmers-market-breakfast-2023/ingredients.JPG",
  "/cooking/sf-pier-farmers-market-breakfast-2023/market.JPG",
];

export default function SFPierFarmersMarketBreakfastPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <BackButton href="/cooking" label="Back to Cooking" />
      <section>
        <h1 className="text-2xl font-bold mb-4">SF Pier Farmer&apos;s Market Breakfast 2023</h1>
        <p className="text-base text-gray-600 mb-8">
          Got ingredients from the farmer&apos;s market at the San Francisco pier stands and took them back to the Airbnb to make breakfast!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {images.map((src, idx) => (
            <div key={idx} className="w-full h-64 relative rounded-lg overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`SF Pier Farmer&apos;s Market Breakfast ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder="blur"
                blurDataURL="/cooking/sf-pier-farmers-market-breakfast-2023/img1.jpg"
              />
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Menu</h2>
          <ul className="list-disc list-inside text-base text-gray-600 space-y-1">
            <li>Toasted Artisan Ube Sourdough Bread</li>
            <li>Roasted Farmer&apos;s Market Tomatoes</li>
            <li>Farmer&apos;s Market Artisan Burrata</li>
            <li>Fresh Cilantro and Black Pepper</li>
          </ul>
        </div>
      </section>
    </div>
  );
} 