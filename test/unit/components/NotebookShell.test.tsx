import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import NotebookShell from '@/components/NotebookShell';
const { push, route } = vi.hoisted(() => ({ push: vi.fn(), route: { pathname: '/' } }));
vi.mock('next/navigation', () => ({ usePathname: () => route.pathname, useRouter: () => ({ push }) }));
beforeEach(() => {
  vi.clearAllMocks();
  route.pathname = "/";
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })) });
  HTMLElement.prototype.scrollTo = vi.fn();
});
function command(value: string) {
  const input = screen.getByRole('textbox', { name: 'Terminal command' });
  fireEvent.change(input, { target: { value } });
  fireEvent.submit(input.closest('form')!);
}
describe('Notebook shell', () => {
  it('starts home with the sidebar hidden and every folder collapsed', () => {
    const { container } = render(<NotebookShell>Home</NotebookShell>);
    expect(screen.getByRole('button', { name: /show directory/ })).toHaveAttribute('aria-expanded', 'false');
    for (const toggle of container.querySelectorAll('.folder-toggle')) expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(screen.getByRole('button', { name: /show directory/ }));
    expect(screen.getByRole('link', { name: 'blog/' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'under-construction.md' })).not.toBeInTheDocument();
  });
  it.each([
    ['/blog', [], 'blog/'],
    ['/blog/under-construction', ['blog'], 'under-construction.md'],
    ['/poker/casinos', ['other', 'poker'], 'casinos.md'],
    ['/other/job-recruiting/under-construction', ['other', 'job-recruiting'], 'under-construction.md'],
    ['/contact', [], 'contact.md'],
  ])('reveals only the ancestors needed for a direct visit to %s', (pathname, expanded, selected) => {
    route.pathname = pathname as string;
    const { container } = render(<NotebookShell>Page</NotebookShell>);
    expect(screen.getByRole('button', { name: /hide directory/ })).toHaveAttribute('aria-expanded', 'true');
    const openFolders = [...container.querySelectorAll('.folder-toggle[aria-expanded="true"]')].map(button => button.getAttribute('aria-label')?.replace('Collapse ', ''));
    expect(openFolders.sort()).toEqual([...expanded].sort());
    expect(screen.getByRole('link', { name: selected as string })).toHaveAttribute('aria-current', 'page');
  });
  it('also reveals a direct article path on mobile', () => {
    route.pathname = '/poker/casinos';
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList);
    render(<NotebookShell>Article</NotebookShell>);
    expect(screen.getByRole('link', { name: 'casinos.md' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Collapse poker' })).toHaveAttribute('aria-expanded', 'true');
  });
  it('toggles the directory with Cmd+B and Ctrl+B without changing terminal input', () => {
    render(<NotebookShell>Home</NotebookShell>);
    fireEvent.click(screen.getByRole('button', { name: /show directory/ }));
    const toggle = screen.getByRole('button', { name: /hide directory/ });
    fireEvent.keyDown(window, { key: 'b', metaKey: true });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.keyDown(window, { key: 'b', ctrlKey: true, repeat: true });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(screen.getByRole('button', { name: 'terminal' }));
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    fireEvent.change(input, { target: { value: 'cd ~/blog' } });
    fireEvent.keyDown(input, { key: 'b', ctrlKey: true });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveValue('cd ~/blog');
    expect(input).toHaveFocus();
  });
  it('separates folder disclosure from directory links', () => {
    render(<NotebookShell>Home</NotebookShell>);
    fireEvent.click(screen.getByRole('button', { name: /show directory/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Expand blog' }));
    expect(screen.getByRole('link', { name: 'under-construction.md' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Collapse blog' }));
    expect(screen.queryByRole('link', { name: 'under-construction.md' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'blog/' })).toHaveAttribute('href', '/blog');
    expect(push).not.toHaveBeenCalled();
  });
  it('opens with either shortcut, focuses input, and closes without repeat toggles', () => {
    render(<NotebookShell>Home</NotebookShell>);
    fireEvent.keyDown(window, { key: 'j', metaKey: true });
    expect(screen.getByRole('textbox', { name: 'Terminal command' })).toHaveFocus();
    fireEvent.keyDown(window, { key: 'j', metaKey: true, repeat: true });
    expect(screen.getByRole('region', { name: 'Website terminal' })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'j', ctrlKey: true });
    expect(screen.queryByRole('region', { name: 'Website terminal' })).not.toBeInTheDocument();
  });
  it('navigates, changes theme, and retains terminal output across closing', () => {
    render(<NotebookShell>Home</NotebookShell>);
    fireEvent.click(screen.getByRole('button', { name: 'terminal' }));
    command('cd ~/blog');
    expect(push).toHaveBeenCalledWith('/blog');
    command('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    fireEvent.click(screen.getByRole('button', { name: 'Close terminal' }));
    fireEvent.click(screen.getByRole('button', { name: 'terminal' }));
    expect(within(screen.getByRole('log')).getByText('dark mode')).toBeInTheDocument();
    command('clear');
    expect(screen.getByRole('log')).toBeEmptyDOMElement();
  });
  it('recalls command history and restores an unfinished draft', () => {
    render(<NotebookShell>Home</NotebookShell>);
    fireEvent.click(screen.getByRole('button', { name: 'terminal' }));
    command('help');
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    fireEvent.change(input, { target: { value: 'cd res' } });
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('help');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('cd res');
  });
});


describe('notebook regression cases', () => {
  it('tracks the working directory and active file after navigation', () => {
    const { rerender } = render(<NotebookShell>Home</NotebookShell>);
    fireEvent.click(screen.getByRole('button', { name: /show directory/ }));
    fireEvent.click(screen.getByRole('button', { name: 'terminal' }));
    route.pathname = '/blog/under-construction';
    rerender(<NotebookShell>Article</NotebookShell>);
    expect(screen.getByRole('link', { name: 'under-construction.md' })).toHaveAttribute('aria-current', 'page');
    command('pwd');
    expect(within(screen.getByRole('log')).getByText('~/blog')).toBeInTheDocument();
    command('open under-construction.md');
    expect(push).toHaveBeenCalledWith('/blog/under-construction');
  });
  it('starts collapsed on mobile and closes after selecting a directory', () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList);
    render(<NotebookShell>Home</NotebookShell>);
    const toggle = screen.getByRole('button', { name: /show directory/ });
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole('link', { name: 'blog/' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
  it('restores the saved theme and persists toolbar changes', () => {
    document.documentElement.dataset.theme = 'dark';
    render(<NotebookShell>Home</NotebookShell>);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }));
    expect(localStorage.getItem('portfolio-theme')).toBe('light');
    expect(document.documentElement.dataset.theme).toBe('light');
  });
  it('can change theme when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage blocked'); });
    render(<NotebookShell>Home</NotebookShell>);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
  it.each(['Escape', 'exit'])('returns focus when closing with %s', action => {
    render(<NotebookShell>Home</NotebookShell>);
    const trigger = screen.getByRole('button', { name: 'terminal' });
    fireEvent.click(trigger);
    if (action === 'exit') command('exit');
    else fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });
    expect(screen.queryByRole('region', { name: 'Website terminal' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
  it('ignores unmodified shortcuts and Alt-modified shortcuts', () => {
    render(<NotebookShell>Home</NotebookShell>);
    for (const key of ['b', 'j']) {
      fireEvent.keyDown(window, { key });
      fireEvent.keyDown(window, { key, ctrlKey: true, altKey: true });
    }
    expect(screen.getByRole('button', { name: /show directory/ })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
  it('ignores empty input and renders unknown commands as text', () => {
    render(<NotebookShell>Home</NotebookShell>);
    fireEvent.click(screen.getByRole('button', { name: 'terminal' }));
    const log = screen.getByRole('log');
    const initial = log.textContent;
    command('   ');
    expect(log.textContent).toBe(initial);
    command('<script>alert(1)</script>');
    expect(log.textContent).toContain('command not found');
    expect(log.querySelector('script')).toBeNull();
    expect(push).not.toHaveBeenCalled();
  });
  it('bounds command history and restores the draft after multiple recalled commands', () => {
    render(<NotebookShell>Home</NotebookShell>);
    fireEvent.click(screen.getByRole('button', { name: 'terminal' }));
    command('ls'); command('pwd');
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'draft' } });
    for (let n = 0; n < 3; n++) fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveValue('ls');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('pwd');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveValue('draft');
  });
});
