import { describe, expect, it } from 'vitest';
import { directoryForRoute, entries, resolvePath, runCommand, writing } from '@/lib/filesystem';

describe('website terminal', () => {
  it('resolves home, absolute, relative, parent, and repeated slash paths', () => {
    expect(resolvePath('~/writing', '/resources/cooking')).toBe('/writing');
    expect(resolvePath('../poker', '/resources/cooking')).toBe('/resources/poker');
    expect(resolvePath('../../../../', '/writing')).toBe('/');
    expect(resolvePath('/resources//./cooking/', '/writing')).toBe('/resources/cooking');
  });
  it('visits directories and opens files using the same routes as the sidebar', () => {
    expect(runCommand('cd ~/writing', '/')).toMatchObject({ href: '/writing' });
    expect(runCommand('cd ..', '/resources/cooking')).toMatchObject({ href: '/resources' });
    expect(runCommand('open small-changes.md', '/writing')).toMatchObject({ href: '/writing/small-changes-for-health-improvements' });
    for (const entry of entries) expect(runCommand(`open ~${entry.path}`, '/').href).toBe(entry.href);
  });
  it('lists the current or requested directory without navigating', () => {
    expect(runCommand('ls', '/writing').output).toContain('small-changes.md');
    expect(runCommand('ls ~/resources', '/writing')).toEqual({ output: 'cooking/\npoker/' });
    expect(runCommand('ls ~/README.md', '/')).toEqual({ output: 'README.md' });
  });
  it('rejects invalid commands and paths without emitting a navigation target', () => {
    for (const command of ['cd missing', 'cd README.md', 'open javascript:alert(1)', 'rm -rf /', 'open', 'light extra']) {
      expect(runCommand(command, '/').href).toBeUndefined();
      expect(runCommand(command, '/').output.length).toBeGreaterThan(0);
    }
  });
  it('uses a file’s parent as the terminal working directory', () => {
    expect(directoryForRoute('/writing/detoxifying-life')).toBe('/writing');
    expect(directoryForRoute('/poker/casinos')).toBe('/resources/poker');
    expect(directoryForRoute('/resources')).toBe('/resources');
  });
  it('returns explicit theme and panel actions', () => {
    expect(runCommand('dark', '/').theme).toBe('dark');
    expect(runCommand('light', '/').theme).toBe('light');
    expect(runCommand('clear', '/').clear).toBe(true);
    expect(runCommand('exit', '/').close).toBe(true);
    expect(runCommand('help', '/').output).toContain('cd ~/writing');
  });
  it('orders writing newest first', () => {
    expect(writing.map(post => post.date)).toEqual(['2026-01-10', '2025-12-15']);
  });
});


describe('path and command edge cases', () => {
  it.each([
    ['~', '/resources/poker', '/'],
    ['.', '/writing', '/writing'],
    ['..', '/', '/'],
    ['cooking/../poker', '/resources', '/resources/poker'],
    ['~/writing/../resources', '/', '/resources'],
  ])('resolves %s from %s', (input, cwd, expected) => {
    expect(resolvePath(input, cwd)).toBe(expected);
  });
  it.each(['cd', 'cd ~', 'cd /', 'home'])('%s returns home', input => {
    expect(runCommand(input, '/writing').href).toBe('/');
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
    expect(runCommand('  cd   ~/writing  ', '/').href).toBe('/writing');
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
    expect(runCommand('x'.repeat(100000), '/')).toEqual({ output: 'Command is too long (maximum 512 characters).' });
  });
  it('removes the unpublished hands page from terminal navigation', () => {
    expect(runCommand('open ~/resources/poker/hands.md', '/').href).toBeUndefined();
    expect(runCommand('ls ~/resources/poker', '/').output).not.toMatch(/hands.md|journey.md/);
  });
});
