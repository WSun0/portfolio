import Image from "next/image";
import BackButton from "@/components/BackButton";

const images = [
  "/cooking/christmas-dinner-2024/overview.png",
  "/cooking/christmas-dinner-2024/cat.png",
  "/cooking/christmas-dinner-2024/tt.jpg",
];

export default function ChristmasDinnerPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <BackButton href="/cooking" label="Back to Cooking" />
      <section>
        <h1 className="text-2xl font-bold mb-4">Christmas Dinner 2024</h1>
        <p className="text-base text-gray-600 mb-8">
          Christmas dinner 2024 with family and friends!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {images.map((src, idx) => (
            <div key={idx} className="w-full h-64 relative rounded-lg overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`Christmas Dinner ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder="blur"
                blurDataURL="/cooking/christmas-dinner/img1.jpg"
              />
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Menu</h2>
          <ul className="list-disc list-inside text-base text-gray-600 space-y-1">
            <li>Medium-Rare Prime Ribeye</li>
            <li>Garlic Mashed Potatoes</li>
            <li>Cajun Roasted Fingerling Potatoes</li>
            <li>Lemon Butter Asparagus</li>
            <li>Mushroom Cream Reduction Sauce</li>
          </ul>
        </div>
      </section>
    </div>
  );
} 