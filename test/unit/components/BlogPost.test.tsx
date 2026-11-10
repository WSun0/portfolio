import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import BlogPost from '@/components/BlogPost';
import CasinosPage from '@/app/poker/casinos/page';
import { casinos } from '@/lib/casinos';

vi.mock('next/dynamic', () => ({ default: () => () => <div aria-label="Casino map" /> }));

describe('article formatting', () => {
  it('links each casino section to a unique focusable heading', () => {
    render(<CasinosPage />);
    const links = within(screen.getByRole('navigation', { name: 'Post sections' })).getAllByRole('link');
    expect(links).toHaveLength(4);
    for (const link of links) {
      const target = document.querySelectorAll(link.getAttribute('href')!);
      expect(target).toHaveLength(1);
      expect(target[0].tagName).toBe('H2');
      expect(target[0]).toHaveAttribute('tabindex', '-1');
    }
    expect(screen.getByRole('link', { name: /back to poker/ })).toHaveAttribute('href', '/poker');
  });

  it('pairs every venue with its location without crowding it into the name', () => {
    render(<CasinosPage />);
    const directory = screen.getByLabelText('Casinos and locations');
    expect(directory.querySelectorAll('dt')).toHaveLength(casinos.length);
    for (const casino of casinos) {
      const term = within(directory).getByText(casino.name);
      expect(term.tagName).toBe('DT');
      expect(term.nextElementSibling?.textContent).toBe(casino.region);
    }
    expect(screen.getByText('and plenty of home games around Boston and NYC')).toBeInTheDocument();
    expect(screen.getByText('ACR')).toBeInTheDocument();
    expect(screen.getByLabelText('Casino map')).toBeInTheDocument();
  });

  it('estimates reading time from nested prose, excluding section navigation labels', () => {
    render(<BlogPost title="Title" intro={<p>{'word '.repeat(225)}</p>} sections={[
      { id: 'notes', title: 'Notes', navTitle: 'navigation '.repeat(500), content: <p>some <strong>nested words</strong></p> },
    ]} />);
    expect(screen.getByLabelText('Estimated reading time: 2 minutes')).toBeInTheDocument();
  });

  it('supports a short post with no section navigation', () => {
    render(<BlogPost title="A short post" intro={<p>hello</p>} sections={[]} />);
    expect(screen.getByLabelText('Estimated reading time: 1 minute')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
