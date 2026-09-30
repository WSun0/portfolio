import Image from "next/image";
import BackButton from "@/components/BackButton";

const images = [
  "/cooking/first-time-cooking-wagyu-2025/after.jpg",
  "/cooking/first-time-cooking-wagyu-2025/afterrice.jpg",
  "/cooking/first-time-cooking-wagyu-2025/before.jpg",
];

export default function FirstTimeCookingWagyu2025Page() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-2 pb-20 px-10">
      <BackButton href="/cooking" label="back to cooking" />
      <section className="glass-panel-static py-8 px-2">
        <h1 className="text-2xl font-bold mb-4">First Time Cooking Wagyu 2025</h1>
        <p className="text-base opacity-80 mb-8">
          kept seeing Japanese a5 wagyu at Maruichi market in Brookline so i finally decided to buy some to try cooking it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {images.map((src, idx) => (
            <div key={idx} className="glass-image-container w-full h-64 relative">
              <Image
                src={src}
                alt={`first time cooking wagyu 2025 ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 33vw"
                placeholder="blur"
                blurDataURL="/cooking/first-time-cooking-wagyu-2025/img1.jpg"
              />
            </div>
          ))}
        </div>
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-3">Menu</h2>
          <ul className="text-base opacity-80 space-y-2">
            <li>Japanese a5 wagyu ribeye with sea salt</li>
            <li>overeasy egg with cracked chili and black pepper</li>
            <li>steamed white rice</li>
          </ul>
        </div>
      </section>
    </div>
  );
} 