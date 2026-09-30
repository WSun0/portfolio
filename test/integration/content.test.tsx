import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Writing from '@/app/writing/page';
import Resources from '@/app/resources/page';
import SocialLinks from '@/components/SocialLinks';
import BackButton from '@/components/BackButton';
import SmallChanges from '@/app/writing/small-changes-for-health-improvements/page';
import Detoxifying from '@/app/writing/detoxifying-life/page';
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
      '/writing/small-changes-for-health-improvements', '/writing/detoxifying-life',
    ]);
  });
  it('provides ordinary links to resource directories', () => {
    render(<Resources />);
    expect(screen.getByRole('link', { name: 'cooking/' })).toHaveAttribute('href', '/cooking');
    expect(screen.getByRole('link', { name: 'poker/' })).toHaveAttribute('href', '/poker');
  });
  it('uses the intended social profiles with safe new-tab links', () => {
    render(<SocialLinks />);
    expect(screen.getByRole('link', { name: /linkedin/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/william1sun/');
    expect(screen.getByRole('link', { name: /github/ })).toHaveAttribute('href', 'https://github.com/WSun0');
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
  it('updates legacy article back links to writing', () => {
    render(<BackButton href="/blog" label="Back to Blog" />);
    expect(screen.getByRole('link', { name: /Back to writing/ })).toHaveAttribute('href', '/writing');
  });
  it.each([
    [SmallChanges, /Small Changes For Health Improvements/i],
    [Detoxifying, /Detoxifying Life/i],
  ])('preserves article content and a route back to writing (%#)', (Page, title) => {
    const { container } = render(<Page />);
    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to writing/ })).toHaveAttribute('href', '/writing');
    expect(container.querySelectorAll('p').length).toBeGreaterThan(2);
  });
  it.each([Wagyu, Christmas, Breakfast])('preserves cooking photos and navigation (%#)', Page => {
    render(<Page />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Back to Cooking/ })).toHaveAttribute('href', '/cooking');
    const photos = screen.getAllByRole('img');
    expect(photos.length).toBeGreaterThan(0);
    for (const photo of photos) {
      expect(photo.getAttribute('alt')?.trim()).toBeTruthy();
      expect(photo.getAttribute('src')).toMatch(/^\//);
    }
  });
});
