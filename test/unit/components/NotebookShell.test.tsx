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
  it('toggles the directory with Cmd+B and Ctrl+B without changing terminal input', () => {
    render(<NotebookShell>Home</NotebookShell>);
    const toggle = screen.getByRole('button', { name: /hide directory/ });
    fireEvent.keyDown(window, { key: 'b', metaKey: true });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.keyDown(window, { key: 'b', ctrlKey: true, repeat: true });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(screen.getByRole('button', { name: 'terminal' }));
    const input = screen.getByRole('textbox', { name: 'Terminal command' });
    fireEvent.change(input, { target: { value: 'cd ~/writing' } });
    fireEvent.keyDown(input, { key: 'b', ctrlKey: true });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveValue('cd ~/writing');
    expect(input).toHaveFocus();
  });
  it('separates folder disclosure from directory links', () => {
    render(<NotebookShell>Home</NotebookShell>);
    fireEvent.click(screen.getByRole('button', { name: 'Collapse writing' }));
    expect(screen.queryByRole('link', { name: 'small-changes.md' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'writing/' })).toHaveAttribute('href', '/writing');
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
    command('cd ~/writing');
    expect(push).toHaveBeenCalledWith('/writing');
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
    fireEvent.click(screen.getByRole('button', { name: 'terminal' }));
    route.pathname = '/writing/detoxifying-life';
    rerender(<NotebookShell>Article</NotebookShell>);
    expect(screen.getByRole('link', { name: 'detoxifying-life.md' })).toHaveAttribute('aria-current', 'page');
    command('pwd');
    expect(within(screen.getByRole('log')).getByText('~/writing')).toBeInTheDocument();
    command('open small-changes.md');
    expect(push).toHaveBeenCalledWith('/writing/small-changes-for-health-improvements');
  });
  it('starts collapsed on mobile and closes after selecting a directory', () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList);
    render(<NotebookShell>Home</NotebookShell>);
    const toggle = screen.getByRole('button', { name: /show directory/ });
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole('link', { name: 'writing/' }));
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
    expect(screen.getByRole('button', { name: /hide directory/ })).toHaveAttribute('aria-expanded', 'true');
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
