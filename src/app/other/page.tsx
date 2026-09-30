import Link from 'next/link';
export const metadata = { title: 'Other · William Sun' };
export default function OtherPage() {
  return <><h1>other</h1><p className="muted">collections of thoughts on categorized hobbies</p>
    <ul className="resource-list">
      <li><Link href="/other/job-recruiting">job recruiting/</Link><p>resources for people looking to break into the modern day cs job market</p></li>
      <li><Link href="/poker">poker/</Link><p>places i’ve played and thoughts on the game</p></li>
      <li><Link href="/cooking">cooking/</Link><p>meals, experiments, and notes from the kitchen</p></li>
    </ul>
  </>;
}
