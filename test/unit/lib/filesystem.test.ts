import { describe, expect, it } from 'vitest';
import { directoryForRoute, entries, resolvePath, runCommand, blog } from '@/lib/filesystem';

describe('website terminal', () => {
  it('resolves home, absolute, relative, parent, and repeated slash paths', () => {
    expect(resolvePath('~/blog', '/other/cooking')).toBe('/blog');
    expect(resolvePath('../poker', '/other/cooking')).toBe('/other/poker');
    expect(resolvePath('../../../../', '/blog')).toBe('/');
    expect(resolvePath('/other//./cooking/', '/blog')).toBe('/other/cooking');
  });
  it('visits directories and opens files using the same routes as the sidebar', () => {
    expect(runCommand('cd ~/blog', '/')).toMatchObject({ href: '/blog' });
    expect(runCommand('cd ..', '/other/cooking')).toMatchObject({ href: '/other' });
    expect(runCommand('open under-construction.md', '/blog')).toMatchObject({ href: '/blog/under-construction' });
    for (const entry of entries) expect(runCommand(`open ~${entry.path}`, '/').href).toBe(entry.href);
  });
  it('lists the current or requested directory without navigating', () => {
    expect(runCommand('ls', '/blog').output).toContain('under-construction.md');
    expect(runCommand('ls ~/other', '/blog')).toEqual({ output: 'job-recruiting/\npoker/\ncooking/' });
    expect(runCommand('ls ~/README.md', '/')).toEqual({ output: 'readme.md' });
  });
  it('rejects invalid commands and paths without emitting a navigation target', () => {
    for (const command of ['cd missing', 'cd README.md', 'open javascript:alert(1)', 'rm -rf /', 'open', 'light extra']) {
      expect(runCommand(command, '/').href).toBeUndefined();
      expect(runCommand(command, '/').output.length).toBeGreaterThan(0);
    }
  });
  it('uses a file’s parent as the terminal working directory', () => {
    expect(directoryForRoute('/blog/under-construction')).toBe('/blog');
    expect(directoryForRoute('/poker/casinos')).toBe('/other/poker');
    expect(directoryForRoute('/other')).toBe('/other');
  });
  it('returns explicit theme and panel actions', () => {
    expect(runCommand('dark', '/').theme).toBe('dark');
    expect(runCommand('light', '/').theme).toBe('light');
    expect(runCommand('clear', '/').clear).toBe(true);
    expect(runCommand('exit', '/').close).toBe(true);
    expect(runCommand('help', '/').output).toContain('cd ~/blog');
  });
  it('orders blog newest first', () => {
    expect(blog.map(post => post.date)).toEqual(['2026-09-29']);
  });
});


describe('path and command edge cases', () => {
  it.each([
    ['~', '/other/poker', '/'],
    ['.', '/blog', '/blog'],
    ['..', '/', '/'],
    ['cooking/../poker', '/other', '/other/poker'],
    ['~/blog/../other', '/', '/other'],
  ])('resolves %s from %s', (input, cwd, expected) => {
    expect(resolvePath(input, cwd)).toBe(expected);
  });
  it.each(['cd', 'cd ~', 'cd /', 'home'])('%s returns home', input => {
    expect(runCommand(input, '/blog').href).toBe('/');
  });
  it.each(['cd https://example.com', 'open //example.com', 'open ../../missing', 'cd a b', 'dark yes', 'pwd more', 'sudo', 'ls missing'])('rejects %s without side effects', input => {
    const result = runCommand(input, '/');
    expect(result.output).not.toBe('');
    expect(result.href).toBeUndefined();
    expect(result.theme).toBeUndefined();
    expect(result.close).toBeUndefined();
    expect(result.clear).toBeUndefined();
  });
  it('accepts whitespace and does nothing for empty commands', () => {
    expect(runCommand('  cd   ~/blog  ', '/').href).toBe('/blog');
    expect(runCommand('  ', '/')).toEqual({ output: '' });
  });
  it('keeps paths unique and every child under its parent', () => {
    expect(new Set(entries.map(entry => entry.path)).size).toBe(entries.length);
    for (const entry of entries) for (const child of entry.children ?? []) {
      expect(child.path).toBe(`${entry.path === '/' ? '' : entry.path}/${child.name}`);
      expect(child.href.startsWith('/')).toBe(true);
    }
  });
});


describe('terminal input boundaries', () => {
  it.each(['open javascript:alert(1)', 'open https://evil.example', 'cd ../../.env', 'cat /etc/passwd', 'ls;whoami', '$(id)', '<img src=x onerror=alert(1)>'])('does not execute or navigate for %s', command => {
    expect(runCommand(command, '/')).toEqual({ output: expect.any(String) });
  });
  it('rejects oversized commands before parsing or retaining output', () => {
    expect(runCommand('x'.repeat(100000), '/')).toEqual({ output: 'command is too long (maximum 512 characters).' });
  });
  it('removes the unpublished hands page from terminal navigation', () => {
    expect(runCommand('open ~/other/poker/hands.md', '/').href).toBeUndefined();
    expect(runCommand('ls ~/other/poker', '/').output).not.toMatch(/hands.md|journey.md/);
  });
});
