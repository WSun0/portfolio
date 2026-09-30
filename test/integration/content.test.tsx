import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Blog from '@/app/blog/page';
import Other from '@/app/other/page';
import SocialLinks from '@/components/SocialLinks';
import BackButton from '@/components/BackButton';
import UnderConstruction from '@/app/blog/under-construction/page';
import JobRecruiting from '@/app/other/job-recruiting/page';
import Contact from '@/app/contact/page';
import Poker from '@/app/poker/page';
import Wagyu from '@/app/cooking/first-time-cooking-wagyu-2025/page';
import Christmas from '@/app/cooking/christmas-dinner/page';
import Breakfast from '@/app/cooking/sf-pier-farmers-market-breakfast-2023/page';

describe('published content', () => {
  it('renders dated blog links in descending order', () => {
    render(<Blog />);
    const list = screen.getByRole('list', { name: 'Posts, newest first' });
    const dates = Array.from(list.querySelectorAll('time')).map(time => time.dateTime);
    expect(dates.length).toBeGreaterThan(0);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(within(list).getAllByRole('link').map(link => link.getAttribute('href'))).toEqual([
      '/blog/under-construction',
    ]);
  });
  it('provides ordinary links to resource directories', () => {
    render(<Other />);
    expect(screen.getByRole('link', { name: 'cooking/' })).toHaveAttribute('href', '/cooking');
    expect(screen.getByRole('link', { name: 'poker/' })).toHaveAttribute('href', '/poker');
    expect(screen.getAllByRole('link').map(link => link.textContent)).toEqual(['job recruiting/', 'poker/', 'cooking/']);
  });
  it('opens the recruiting placeholder through an ordinary link', () => {
    render(<JobRecruiting />);
    expect(screen.getByText('resources for people looking to break into the modern day cs job market')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'under construction' })).toHaveAttribute('href', '/other/job-recruiting/under-construction');
  });
  it('uses the intended social profiles with safe new-tab links', () => {
    render(<SocialLinks />);
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', 'https://www.linkedin.com/in/william1sun/');
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/WSun0');
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
  it('updates legacy article back links to blog', () => {
    render(<BackButton href="/writing" label="Back to Blog" />);
    expect(screen.getByRole('link', { name: /back to blog/i })).toHaveAttribute('href', '/blog');
  });
  it('shows only the construction notice on the replacement post', () => {
    const { container } = render(<UnderConstruction />);
    expect(screen.getByRole('heading', { name: 'under construction' })).toBeInTheDocument();
    expect(container.textContent).toBe('under construction');
  });
  it('uses the requested blog and contact copy', () => {
    const { unmount } = render(<Blog />);
    expect(screen.getByText("personal thoughts, observations, anecdotes, and things i'm working through")).toBeInTheDocument();
    expect(screen.getByText('2026-09-29')).toBeInTheDocument();
    unmount();
    render(<Contact />);
    expect(screen.getByRole('heading', { name: 'contact me' })).toBeInTheDocument();
    expect(screen.getByText('i love to meet new people and chat; feel free to reach out below')).toBeInTheDocument();
  });
  it('retains proper names in lowercase poker prose and includes Alex Foxen', () => {
    render(<Poker />);
    expect(screen.getByText(/my favorite professional players are Linus Loeliger, Chris Brewer, Dan Cates, and Alex Foxen/)).toBeInTheDocument();
    expect(screen.getByText(/i started playing poker in September/)).toBeInTheDocument();
  });
  it.each([Wagyu, Christmas, Breakfast])('preserves cooking photos and navigation (%#)', Page => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to cooking/i })).toHaveAttribute('href', '/cooking');
    const photos = screen.getAllByRole('img');
    expect(photos.length).toBeGreaterThan(0);
    for (const photo of photos) {
      expect(photo.getAttribute('alt')?.trim()).toBeTruthy();
      expect(photo.getAttribute('src')).toMatch(/^\//);
    }
  });
});
