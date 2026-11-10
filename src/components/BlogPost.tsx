import './BlogPost.css';
import { Children, isValidElement, type ReactNode } from 'react';

export type BlogSection = {
  id: string;
  title: string;
  navTitle?: string;
  content: ReactNode;
};

// Article copy uses native JSX elements and fragments, so nested emphasis and
// links count too. Navigation labels are deliberately excluded from the estimate.
function textContent(node: ReactNode): string {
  return Children.toArray(node).map(child => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (isValidElement<{ children?: ReactNode }>(child)) return textContent(child.props.children);
    return '';
  }).join(' ');
}

export default function BlogPost({ title, sections, intro, draft = false, sectionStart = 1 }: {
  title: string;
  sections: BlogSection[];
  intro?: ReactNode;
  draft?: boolean;
  sectionStart?: number;
}) {
  const copy = [title, textContent(intro), ...sections.map(section => `${section.title} ${textContent(section.content)}`)].join(' ');
  const minutes = Math.max(1, Math.ceil(copy.trim().split(/\s+/).length / 225));

  return <article className="blog-post">
    <header>
      {draft && <p className="post-status">draft / outline</p>}
      <h1>{title}</h1>
      <div className="post-tools">
        <span className="post-read-time" aria-label={`Estimated reading time: ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><circle cx="8" cy="8" r="6" /><path d="M8 4v4l2.5 1.5" /></svg>
          {minutes} min read
        </span>
        {sections.length > 0 && <nav className="post-sections" aria-label="Post sections">
          {sections.map((section, index) => <a key={section.id} href={`#${section.id}`}>
            <span className="section-number" aria-hidden="true">{String(index + sectionStart).padStart(2, '0')}</span>
            {section.navTitle ?? section.title}
          </a>)}
        </nav>}
      </div>
    </header>
    {intro}
    {sections.map((section, index) => <section key={section.id} aria-labelledby={section.id}>
      <h2 id={section.id} tabIndex={-1}><span className="section-number" aria-hidden="true">{String(index + sectionStart).padStart(2, '0')} / </span>{section.title}</h2>
      {section.content}
    </section>)}
  </article>;
}
