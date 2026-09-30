import Link from 'next/link';
export const metadata = { title: 'Job Recruiting · William Sun' };
export default function JobRecruitingPage() {
  return <>
    <h1>job recruiting</h1>
    <p className="muted">resources for people looking to break into the modern day cs job market</p>
    <ul className="resource-list"><li><Link href="/other/job-recruiting/under-construction">under construction</Link></li></ul>
  </>;
}
