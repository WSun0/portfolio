export type SiteEntry = { name: string; path: string; href: string; title: string; date?: string; children?: SiteEntry[] };
export const blog: SiteEntry[] = [
  { name: 'under-construction', path: '/blog/under-construction', href: '/blog/under-construction', title: 'under construction', date: '2026-09-29' },
].sort((a, b) => b.date!.localeCompare(a.date!));
export const filesystem: SiteEntry = { name: '~', path: '/', href: '/', title: 'home', children: [
  { name: 'blog', path: '/blog', href: '/blog', title: 'blog', children: blog },
  { name: 'other', path: '/other', href: '/other', title: 'other', children: [
    { name: 'job-recruiting', path: '/other/job-recruiting', href: '/other/job-recruiting', title: 'job recruiting', children: [
      { name: 'under-construction', path: '/other/job-recruiting/under-construction', href: '/other/job-recruiting/under-construction', title: 'under construction' },
    ] },
    { name: 'poker', path: '/other/poker', href: '/poker', title: 'poker', children: [
      { name: 'casinos', path: '/other/poker/casinos', href: '/poker/casinos', title: 'casinos i’ve played at' },
      { name: 'online-vs-in-person', path: '/other/poker/online-vs-in-person', href: '/poker/online-vs-in-person', title: 'thoughts on online versus in-person' },
    ] },
    { name: 'cooking', path: '/other/cooking', href: '/cooking', title: 'cooking', children: [
      { name: 'wagyu', path: '/other/cooking/wagyu', href: '/cooking/first-time-cooking-wagyu-2025', title: 'first time cooking wagyu 2025' },
      { name: 'christmas-dinner', path: '/other/cooking/christmas-dinner', href: '/cooking/christmas-dinner', title: 'Christmas dinner 2024' },
      { name: 'farmers-market', path: '/other/cooking/farmers-market', href: '/cooking/sf-pier-farmers-market-breakfast-2023', title: 'SF pier farmer’s market breakfast 2023' },
    ] },
  ] },
  { name: 'contact', path: '/contact', href: '/contact', title: 'contact' },
] };
function flatten(entry: SiteEntry): SiteEntry[] { return [entry, ...(entry.children?.flatMap(flatten) ?? [])]; }
export const entries = flatten(filesystem);
export function entryForRoute(route: string) {
  return entries.find(entry => entry.href === route);
}
export function parentPath(path: string) { return path.slice(0, path.lastIndexOf('/')) || '/'; }
export function parentForRoute(route: string) {
  const entry = entryForRoute(route);
  if (!entry || entry.path === '/') return undefined;
  return entries.find(parent => parent.path === parentPath(entry.path));
}
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
  // The homepage is the root; keep older terminal commands as aliases.
  return /^\/readme(?:\.md)?$/i.test(result) ? '/' : result;
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
    if (command === 'open' && !argument) return { output: 'usage: open <page or folder>' };
    const path = resolvePath(argument ?? (command === 'cd' ? '~' : '.'), cwd);
    // Keep old .md commands working without showing extensions in navigation.
    const entry = entries.find(item => item.path === path || (!item.children && `${item.path}.md` === path));
    if (!entry) return { output: `${command}: no such page or folder: ${argument}` };
    if (command === 'ls') return { output: entry.children ? entry.children.map(child => child.name).join('\n') : entry.name };
    return { output: displayPath(entry.path), href: entry.href };
  }
  if (argument) return { output: `${command}: takes no arguments` };
  switch (command) {
    case 'help': return { output: 'ls [path]    list pages and folders\ncd [path]    visit a page or folder (try cd ~/blog)\nopen <path>  same as cd\npwd          show the current directory\nhome         return to the root (~)\nlight        use light mode\ndark         use dark mode\nclear        clear the terminal\nexit         close the terminal\n\npaths support ~, /, .. and relative names.\n↑ / ↓ recall commands. ⌘/ctrl + b toggles the directory.\n⌘/ctrl + j toggles this panel.' };
    case 'pwd': return { output: displayPath(cwd) };
    case 'home': return { output: '~', href: '/' };
    case 'light': case 'dark': return { output: `${command} mode`, theme: command };
    case 'clear': return { output: '', clear: true };
    case 'exit': return { output: '', close: true };
    default: return { output: `command not found: ${command}. type help to see available commands.` };
  }
}
