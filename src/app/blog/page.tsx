import Link from 'next/link';
import { blog } from '@/lib/filesystem';
export const metadata = { title: 'Blog · William Sun' };
export default function BlogPage() {
  return <><h1>blog</h1><p className="muted">personal thoughts, observations, anecdotes, and things i&apos;m working through</p>
    <ol className="writing-list" aria-label="Posts, newest first">{blog.map(post => <li key={post.path}><time dateTime={post.date}>{post.date}</time><Link href={post.href}>{post.title}</Link></li>)}</ol>
  </>;
}
