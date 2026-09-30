export type SiteEntry = { name: string; path: string; href: string; title: string; date?: string; children?: SiteEntry[] };
export const writing: SiteEntry[] = [
  { name: 'under-construction.md', path: '/writing/under-construction.md', href: '/writing/under-construction', title: 'under construction', date: '2026-09-29' },
].sort((a, b) => b.date!.localeCompare(a.date!));
export const filesystem: SiteEntry = { name: '~', path: '/', href: '/', title: 'home', children: [
  { name: 'readme.md', path: '/readme.md', href: '/', title: 'William Sun' },
  { name: 'writing', path: '/writing', href: '/writing', title: 'writing', children: writing },
  { name: 'resources', path: '/resources', href: '/resources', title: 'resources', children: [
    { name: 'cooking', path: '/resources/cooking', href: '/cooking', title: 'cooking', children: [
      { name: 'wagyu.md', path: '/resources/cooking/wagyu.md', href: '/cooking/first-time-cooking-wagyu-2025', title: 'First Time Cooking Wagyu 2025' },
      { name: 'christmas-dinner.md', path: '/resources/cooking/christmas-dinner.md', href: '/cooking/christmas-dinner', title: 'Christmas Dinner 2024' },
      { name: 'farmers-market.md', path: '/resources/cooking/farmers-market.md', href: '/cooking/sf-pier-farmers-market-breakfast-2023', title: 'SF Pier Farmer’s Market Breakfast 2023' },
    ] },
    { name: 'poker', path: '/resources/poker', href: '/poker', title: 'poker', children: [
      { name: 'casinos.md', path: '/resources/poker/casinos.md', href: '/poker/casinos', title: 'Casinos I’ve Played At' },
    ] },
  ] },
  { name: 'contact.md', path: '/contact.md', href: '/contact', title: 'contact' },
] };
function flatten(entry: SiteEntry): SiteEntry[] { return [entry, ...(entry.children?.flatMap(flatten) ?? [])]; }
export const entries = flatten(filesystem);
export function entryForRoute(route: string) {
  return entries.find(entry => route === '/' ? entry.name === 'readme.md' : entry.href === route);
}
export function parentPath(path: string) { return path.slice(0, path.lastIndexOf('/')) || '/'; }
export function directoryForRoute(route: string) {
  const entry = entryForRoute(route);
  return entry?.children ? entry.path : parentPath(entry?.path ?? '/');
}
export function displayPath(path: string) { return path === '/' ? '~' : `~${path}`; }
export function resolvePath(input: string, cwd: string) {
  const absolute = input.startsWith('/') || input === '~' || input.startsWith('~/');
  const path = input.replace(/^~(?=\/|$)/, '');
  const resolved: string[] = [];
  for (const part of (absolute ? path : `${cwd}/${path}`).split('/')) {
    if (part === '..') resolved.pop();
    else if (part && part !== '.') resolved.push(part);
  }
  const result = '/' + resolved.join('/');
  return result === '/README.md' ? '/readme.md' : result;
}
export type CommandResult = { output: string; href?: string; theme?: 'light' | 'dark'; clear?: boolean; close?: boolean };
export const MAX_COMMAND_LENGTH = 512;
export function runCommand(input: string, cwd: string): CommandResult {
  if (input.length > MAX_COMMAND_LENGTH) return { output: "command is too long (maximum 512 characters)." };
  const [command, ...args] = input.trim().split(/\s+/);
  if (!command) return { output: '' };
  if (args.length > 1) return { output: `${command}: too many arguments` };
  const argument = args[0];
  if (['cd', 'ls', 'open'].includes(command)) {
    if (command === 'open' && !argument) return { output: 'usage: open <file or directory>' };
    const path = resolvePath(argument ?? (command === 'cd' ? '~' : '.'), cwd);
    const entry = entries.find(item => item.path === path);
    if (!entry) return { output: `${command}: no such file or directory: ${argument}` };
    if (command === 'ls') return { output: entry.children ? entry.children.map(child => child.name + (child.children ? '/' : '')).join('\n') : entry.name };
    if (command === 'cd' && !entry.children) return { output: `cd: not a directory: ${argument}. use open to read a file.` };
    return { output: displayPath(entry.path), href: entry.href };
  }
  if (argument) return { output: `${command}: takes no arguments` };
  switch (command) {
    case 'help': return { output: 'ls [path]    list files and folders\ncd [path]    visit a directory (try cd ~/writing)\nopen <path>  read a file or visit a directory\npwd          show the current directory\nhome         return to readme.md\nlight        use light mode\ndark         use dark mode\nclear        clear the terminal\nexit         close the terminal\n\npaths support ~, /, .. and relative names.\n↑ / ↓ recall commands. ⌘/ctrl + b toggles the directory.\n⌘/ctrl + j toggles this panel.' };
    case 'pwd': return { output: displayPath(cwd) };
    case 'home': return { output: '~/readme.md', href: '/' };
    case 'light': case 'dark': return { output: `${command} mode`, theme: command };
    case 'clear': return { output: '', clear: true };
    case 'exit': return { output: '', close: true };
    default: return { output: `command not found: ${command}. type help to see available commands.` };
  }
}
