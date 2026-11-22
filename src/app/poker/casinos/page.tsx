"use client";
import dynamic from "next/dynamic";
import { casinos } from "@/lib/casinos";
import BlogPost from "@/components/BlogPost";

const PokerMap = dynamic(() => import("@/components/PokerMap"), {
  ssr: false,
  loading: () => <p className="muted" role="status">loading map…</p>,
});

export default function CasinosPage() {
  return <>
    <BlogPost title="casinos i've played poker at" sections={[
      {
        id: 'in-person', title: 'in-person casinos', navTitle: 'in person',
        content: <>
          <dl className="post-directory" aria-label="Casinos and locations">
            {casinos.map(casino => <div key={casino.name}>
              <dt>{casino.name}</dt>
              <dd>{casino.region}</dd>
            </div>)}
          </dl>
          <p className="post-aside">and plenty of home games around Boston and NYC</p>
        </>,
      },
      {
        id: 'online', title: 'online poker rooms', navTitle: 'online',
        content: <>
          <ul><li>Club WPT Gold</li><li>Ignition</li><li>ACR</li></ul>
          <p className="post-aside">and plenty of private games on pokernow.club</p>
        </>,
      },
      {
        id: 'map', title: 'where i’ve played in person', navTitle: 'map',
        content: <div className="post-map" style={{ height: 'min(500px, 65svh)', minHeight: '280px', width: '100%', position: 'relative', zIndex: 1 }}><PokerMap /></div>,
      },
    ]} />
  </>;
}
