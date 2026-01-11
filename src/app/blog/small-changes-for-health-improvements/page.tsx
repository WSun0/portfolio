import BackButton from "@/components/BackButton";

export default function SmallChangesForHealthImprovementsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 pb-20 px-10">
      <BackButton href="/blog" label="Back to Blog" />
      <section>
        <h1 className="text-2xl font-bold mb-4">Small Changes For Health Improvements</h1>
        <br />
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Mountain Spring Valley Water</h2>
            <div className="text-base text-gray-600 leading-relaxed space-y-4">
              <p>
                I&apos;ve been buying a lot of {" "}
                <a
                  href="https://www.wholefoodsmarket.com/product/mountain-valley-water-spring-water-12-pack-1-lt-b07gjpg6hw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 underline decoration-gray-600 hover:decoration-indigo-600 underline-offset-2 transition-colors"
                >
                  Mountain Spring Valley Water
                </a>
                {" "}on repeat recently. I&apos;ve already gone through 8 packs of 12 1-Liter bottles, and plan on buying my 9th pack soon. 
                While they aren&apos;t necessarily cheap at $34.99 for 12 bottles, they&apos;re solving a problem I&apos;ve had my entire life: 
                being chronically dehydrated without being fully aware of it.
              </p>
              <p>
                According to{" "}
                <a
                  href="https://www.health.harvard.edu/staying-healthy/how-much-water-should-you-drink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 underline decoration-gray-600 hover:decoration-indigo-600 underline-offset-2 transition-colors"
                >
                  Harvard Medical School
                </a>
                , adult males are supposed to drink 3.7 liters of water per day. Two months ago, I would&apos;ve been lucky if I drank more than one liter a day. 
                The problem with drinking water is that unless you have a very convenient source and actively make an effort to drink it often, it&apos;s very easy to forget 
                unless you become physically thirsty. Even the smallest things can add friction to one&apos;s water drinking process — having a water source that&apos;s far away 
                from where you work, or having to boil water and wait for it to cool down. The difference between having a source of water readily available at all times and not 
                is night and day. With a bottle of Mountain Spring Valley Water next to me at all times, I find myself passively drinking water throughout the day, which helps me 
                stay hydrated and hit my water intake targets effortlessly.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                There are tons of invisible problems that build up over time from not drinking enough water (kidney stones, skin problems, etc.), but the short-term 
                noticeable problem that forced me to make this change was getting inexplicable nosebleeds during winter. Growing up, I was one of the kids who always 
                witnessed other kids getting nosebleeds in class and never got them myself, but starting from last winter, I began getting random nosebleeds in the morning. 
                At first, I didn&apos;t think much of it, but after consistent daily nosebleeds over the course of a few weeks, I decided to do some troubleshooting. I found that 
                they were a product of Boston&apos;s particularly dry winter seasons combined with me not drinking enough water. I tried buying humidifiers to improve the water 
                content in the air in my room, but found that they exhausted their water supplies too quickly. If I went a day without filling them up, I would wake up with 
                nosebleeds the next day. Finally, I decided to start drinking more water on top of using humidifiers, and the nosebleeds stopped.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Mouth Tape</h2>
            <p className="text-base text-gray-600 leading-relaxed">I&apos;ve been taping my mouth shut every night before I go to bed. Something I&apos;ve come to realize recently is that 
              swimming for 5 years throughtout elementary to middle school has taught my body to subconsciously accept mouth breathing as a form of oxygen intake. Long-term, this is incredibly 
              damaging. Nasal breathing is objectively superior to mouth breathing as it filters, warms, and humidifies air that enters your lungs. The nasal passage also produces nitric oxide which 
              dialates blood vessels, improves oxygen uptake, and supports immune function, a process that is completely forgone via mouth breathing. Nasal breathing also encourages slower and deeper breaths, 
              which has both positive physiological and psychological effects on your body. On the other hand, mouth breathing promotes rapid, shallow breaths which has a variety of negative physiological and 
              psychological effects on your body. Furthermore, mouth breathing makes your mouth dry by evaporating saliva. Saliva neutralizes acids from bacteria and food, remineralizes enamel by delivering minerals,
              and protects tissue in your mouth from ulcers. Finally, it also increases snoring, sleep apnea, and fragmented sleep. 
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Paying Attention to Sources of Fiber</h2>
            <p className="text-base text-gray-600 leading-relaxed">Content coming soon</p>
          </div>
        </div>
      </section>
    </div>
  );
}

