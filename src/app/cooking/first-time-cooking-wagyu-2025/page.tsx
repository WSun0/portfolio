import Image from "next/image";
import BackButton from "@/components/BackButton";

const images = [
  "/cooking/first-time-cooking-wagyu-2025/after.jpg",
  "/cooking/first-time-cooking-wagyu-2025/afterrice.jpg",
  "/cooking/first-time-cooking-wagyu-2025/before.jpg",
];

export default function FirstTimeCookingWagyu2025Page() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <BackButton href="/cooking" label="Back to Cooking" />
      <section>
        <h1 className="text-2xl font-bold mb-4">First Time Cooking Wagyu 2025</h1>
        <p className="text-base text-gray-800 mb-8">
          I kept seeing Japanese A5 Wagyu at the local Maruichi market in Brookline so I finally decided to buy some and try it out!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {images.map((src, idx) => (
            <div key={idx} className="w-full h-64 relative rounded-lg overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`First Time Cooking Wagyu 2025 ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder="blur"
                blurDataURL="/cooking/first-time-cooking-wagyu-2025/img1.jpg"
              />
            </div>
          ))}
        </div>
        <article className="prose max-w-none">
          <h2>Menu and/or Ingredients</h2>
          <ul>
            <li>Japanese A5 Wagyu Ribeye with Sea Salt</li>
            <li>Overeasy Egg with Cracked Chili and Black Pepper</li>
            <li>Steamed White Rice</li>
          </ul>
        </article>
      </section>
    </div>
  );
} 