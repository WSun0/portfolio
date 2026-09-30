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
