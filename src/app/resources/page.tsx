import Link from 'next/link';
export const metadata = { title: 'Resources · William Sun' };
export default function ResourcesPage() {
  return <><h1>resources</h1><p className="muted">Notes and collections to come back to.</p>
    <ul className="resource-list"><li><Link href="/cooking">cooking/</Link><p>Meals, experiments, and notes from the kitchen.</p></li><li><Link href="/poker">poker/</Link><p>Places I’ve played, hand histories, and my poker journey.</p></li></ul>
  </>;
}
