import Image from "next/image";

const images = [
  "/cooking/sf-pier-farmers-market-breakfast-2023/finished.JPG",
  "/cooking/sf-pier-farmers-market-breakfast-2023/ingredients.JPG",
  "/cooking/sf-pier-farmers-market-breakfast-2023/market.JPG",
];

export default function SFPierFarmersMarketBreakfastPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">SF Pier Farmer&apos;s Market Breakfast 2023</h1>
        <p className="text-base text-gray-800 mb-8">
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
        <article className="prose max-w-none">
          <h2>Menu and/or Ingredients</h2>
          <ul>
            <li>Toasted Artisan Ube Sourdough Bread</li>
            <li>Roasted Farmer&apos;s Market Tomatoes</li>
            <li>Farmer&apos;s Market Artisan Burrata</li>
            <li>Fresh Cilantro and Black Pepper</li>
          </ul>
        </article>
      </section>
    </div>
  );
} 