import Link from 'next/link';
import { writing } from '@/lib/filesystem';
export const metadata = { title: 'Writing · William Sun' };
export default function WritingPage() {
  return <><h1>writing</h1><p className="muted">personal thoughts, observations, anecdotes, and things i&apos;m working through</p>
    <ol className="writing-list" aria-label="Posts, newest first">{writing.map(post => <li key={post.path}><time dateTime={post.date}>{post.date}</time><Link href={post.href}>{post.title}</Link></li>)}</ol>
  </>;
}
