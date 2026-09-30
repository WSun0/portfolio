import Link from 'next/link';
export const metadata = { title: 'Resources · William Sun' };
export default function ResourcesPage() {
  return <><h1>resources</h1><p className="muted">notes and collections to come back to.</p>
    <ul className="resource-list"><li><Link href="/cooking">cooking/</Link><p>meals, experiments, and notes from the kitchen.</p></li><li><Link href="/poker">poker/</Link><p>places i’ve played and thoughts on the game.</p></li></ul>
  </>;
}
