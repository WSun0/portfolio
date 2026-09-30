import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import NotebookShell from '@/components/NotebookShell';
const { push } = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock('next/navigation', () => ({ usePathname: () => '/', useRouter: () => ({ push }) }));
beforeEach(() => {
  vi.clearAllMocks();
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
