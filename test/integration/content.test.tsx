import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Writing from '@/app/writing/page';
import Resources from '@/app/resources/page';
import SocialLinks from '@/components/SocialLinks';
import BackButton from '@/components/BackButton';
import UnderConstruction from '@/app/writing/under-construction/page';
import Contact from '@/app/contact/page';
import Poker from '@/app/poker/page';
import Wagyu from '@/app/cooking/first-time-cooking-wagyu-2025/page';
import Christmas from '@/app/cooking/christmas-dinner/page';
import Breakfast from '@/app/cooking/sf-pier-farmers-market-breakfast-2023/page';

describe('published content', () => {
  it('renders dated writing links in descending order', () => {
    render(<Writing />);
    const list = screen.getByRole('list', { name: 'Posts, newest first' });
    const dates = Array.from(list.querySelectorAll('time')).map(time => time.dateTime);
    expect(dates.length).toBeGreaterThan(0);
    expect(dates).toEqual([...dates].sort().reverse());
    expect(within(list).getAllByRole('link').map(link => link.getAttribute('href'))).toEqual([
      '/writing/under-construction',
    ]);
  });
  it('provides ordinary links to resource directories', () => {
    render(<Resources />);
    expect(screen.getByRole('link', { name: 'cooking/' })).toHaveAttribute('href', '/cooking');
    expect(screen.getByRole('link', { name: 'poker/' })).toHaveAttribute('href', '/poker');
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
  it('updates legacy article back links to writing', () => {
    render(<BackButton href="/blog" label="Back to Blog" />);
    expect(screen.getByRole('link', { name: /back to writing/i })).toHaveAttribute('href', '/writing');
  });
  it('shows only the construction notice on the replacement post', () => {
    const { container } = render(<UnderConstruction />);
    expect(screen.getByRole('heading', { name: 'under construction' })).toBeInTheDocument();
    expect(container.textContent).toBe('under construction');
  });
  it('uses the requested writing and contact copy', () => {
    const { unmount } = render(<Writing />);
    expect(screen.getByText("personal thoughts, observations, anecdotes, and things i'm working through")).toBeInTheDocument();
    expect(screen.getByText('2026-09-29')).toBeInTheDocument();
    unmount();
    render(<Contact />);
    expect(screen.getByRole('heading', { name: 'contact me' })).toBeInTheDocument();
    expect(screen.getByText('love to meet new people and chat, feel free to reach out below')).toBeInTheDocument();
  });
  it('retains proper names in lowercase poker prose and includes Alex Foxen', () => {
    render(<Poker />);
    expect(screen.getByText(/my favorite pros are Linus Loeliger, Chris Brewer, Dan Cates, and Alex Foxen/)).toBeInTheDocument();
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
