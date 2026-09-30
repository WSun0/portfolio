'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { directoryForRoute, displayPath, entryForRoute, filesystem, runCommand, MAX_COMMAND_LENGTH, SiteEntry } from '@/lib/filesystem';
import PlatformLogo from './PlatformLogo';
import TerminalPanel from './TerminalPanel';
type Transcript = { prompt?: string; output: string };

export default function NotebookShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [folders, setFolders] = useState<Record<string, boolean>>({ '/writing': true, '/resources': true });
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [input, setInput] = useState('');
  const [transcript, setTranscript] = useState<Transcript[]>([{ output: 'Welcome. Type "help" to explore.' }]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const draft = useRef('');
  const commandInput = useRef<HTMLInputElement>(null);
  const output = useRef<HTMLDivElement>(null);
  const reader = useRef<HTMLElement>(null);
  const terminalButton = useRef<HTMLButtonElement>(null);
  const entry = entryForRoute(pathname);
  const cwd = directoryForRoute(pathname);
  const changeTheme = useCallback((value: 'light' | 'dark') => {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    try { localStorage.setItem('portfolio-theme', value); } catch { /* Storage may be unavailable. */ }
  }, []);

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 720px)');
    setSidebarOpen(!narrow.matches);
    const resize = () => setSidebarOpen(!narrow.matches);
    narrow.addEventListener('change', resize);
    const saved = document.documentElement.dataset.theme;
    if (saved === 'light' || saved === 'dark') setTheme(saved);
    return () => narrow.removeEventListener('change', resize);
  }, []);
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && !event.altKey && (key === 'j' || key === 'b')) {
        event.preventDefault();
        if (!event.repeat) {
          if (key === 'j') setTerminalOpen(open => !open);
          else setSidebarOpen(open => !open);
        }
      }
    };
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, []);
  useEffect(() => {
    reader.current?.scrollTo({ top: 0 });
    if (window.matchMedia('(max-width: 720px)').matches) setSidebarOpen(false);
    if (entry) setFolders(previous => {
      const next = { ...previous };
      for (const part of ['/writing', '/resources', '/resources/cooking', '/resources/poker']) {
        if (entry.path.startsWith(part + '/') || entry.path === part) next[part] = true;
      }
      return next;
    });
  }, [pathname, entry]);
  useEffect(() => { if (terminalOpen) commandInput.current?.focus(); }, [terminalOpen]);
  useEffect(() => { if (output.current) output.current.scrollTop = output.current.scrollHeight; }, [transcript, terminalOpen]);
  function closeTerminal() { setTerminalOpen(false); terminalButton.current?.focus(); }
  function submit(event: FormEvent) {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    const result = runCommand(command, cwd);
    setHistory(previous => [...previous, command].slice(-100));
    setHistoryIndex(-1); draft.current = ''; setInput('');
    setTranscript(previous => result.clear ? [] : [...previous, { prompt: `${displayPath(cwd)} $ ${command}`, output: result.output }].slice(-200));
    if (result.href) router.push(result.href);
    if (result.theme) changeTheme(result.theme);
    if (result.close) closeTerminal();
  }
  function tree(items: SiteEntry[], depth = 0) {
    return <ul className="file-tree" style={{ paddingLeft: depth ? 18 : 0 }}>
      {items.map((item, index) => <li key={item.path}>
        <div className="tree-row">
          <span className="tree-stem" aria-hidden="true">{index === items.length - 1 ? '└─' : '├─'}</span>
          {item.children && <button type="button" className="folder-toggle" aria-label={`${folders[item.path] ? 'Collapse' : 'Expand'} ${item.name}`} aria-expanded={!!folders[item.path]} aria-controls={`folder-${item.name}`} onClick={() => setFolders(previous => ({ ...previous, [item.path]: !previous[item.path] }))}>{folders[item.path] ? '−' : '+'}</button>}
          <Link href={item.href} aria-current={entry?.path === item.path ? 'page' : undefined} className={item.children ? 'folder-link' : 'file-link'} onClick={() => { if (window.matchMedia('(max-width: 720px)').matches) setSidebarOpen(false); }}>{item.name}{item.children ? '/' : ''}</Link>
        </div>
        {item.children && <div id={`folder-${item.name}`} hidden={!folders[item.path]}>{tree(item.children, depth + 1)}</div>}
      </li>)}
    </ul>;
  }
  return <div className="notebook-shell">
    <a href="#page-content" className="skip-link">Skip to content</a>
    <header className="toolbar">
      <button type="button" aria-expanded={sidebarOpen} aria-controls="site-directory" aria-keyshortcuts="Meta+b Control+b" title="Toggle directory (Cmd+B / Ctrl+B)" onClick={() => setSidebarOpen(open => !open)}>{sidebarOpen ? '← hide directory' : '→ show directory'}</button>
      <div className="toolbar-actions">
        <button type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => changeTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? 'dark' : 'light'}</button>
        <button ref={terminalButton} type="button" aria-expanded={terminalOpen} aria-controls="site-terminal" aria-keyshortcuts="Meta+j Control+j" onClick={() => setTerminalOpen(open => !open)}>terminal</button>
      </div>
    </header>
    <div className={`workspace ${sidebarOpen ? '' : 'sidebar-closed'}`}>
      <aside id="site-directory" className="sidebar" hidden={!sidebarOpen} aria-label="Site directory">
        <Link className="site-name" href="/">wsun.one/</Link>
        <nav aria-label="Files and folders">{tree(filesystem.children!)}</nav>
        <div className="shortcut-hints">
          <button type="button" className="shortcut-hint" aria-label="Toggle directory: Cmd+B or Ctrl+B" onClick={() => setSidebarOpen(open => !open)}>
            <span className="shortcut-label">directory</span>
            <span><PlatformLogo platform="apple" /> <kbd>⌘ + b</kbd></span>
            <span><PlatformLogo platform="windows" /> <kbd>ctrl + b</kbd></span>
          </button>
          <button type="button" className="shortcut-hint" aria-label="Toggle terminal: Cmd+J or Ctrl+J" onClick={() => setTerminalOpen(open => !open)}>
            <span className="shortcut-label">terminal</span>
            <span><PlatformLogo platform="apple" /> <kbd>⌘ + j</kbd></span>
            <span><PlatformLogo platform="windows" /> <kbd>ctrl + j</kbd></span>
          </button>
        </div>
      </aside>
      <main className="reading-pane" id="page-content" tabIndex={-1} ref={reader}>
        <div className="reading-column">
          <p className="file-path">{entry ? displayPath(entry.path) + (entry.children ? '/' : '') : pathname}</p>
          <div className="document">{children}</div>
        </div>
      </main>
    </div>
    <TerminalPanel open={terminalOpen} location={displayPath(cwd)} onClose={closeTerminal}>
      <div className="terminal-scroll" ref={output} onClick={event => { if (event.target === event.currentTarget) commandInput.current?.focus(); }}>
      <div className="terminal-output" role="log" aria-label="Terminal output" aria-live="polite" aria-relevant="additions text">
        {transcript.map((line, index) => <div className="terminal-entry" key={index}>{line.prompt && <div className="terminal-echo">{line.prompt}</div>}{line.output && <pre>{line.output}</pre>}</div>)}
      </div>
      <form className="terminal-form" onSubmit={submit}>
        <label htmlFor="terminal-command" className="terminal-prompt">{displayPath(cwd)} <span aria-hidden="true">$</span></label>
        <input ref={commandInput} id="terminal-command" maxLength={MAX_COMMAND_LENGTH} aria-label="Terminal command" autoComplete="off" autoCapitalize="off" spellCheck={false} value={input} onChange={event => { setInput(event.target.value); setHistoryIndex(-1); }} onKeyDown={event => {
          if (event.key === 'Escape') { event.preventDefault(); closeTerminal(); }
          if (event.key === 'ArrowUp' && history.length) {
            event.preventDefault(); if (historyIndex === -1) draft.current = input;
            const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(next); setInput(history[next]);
          }
          if (event.key === 'ArrowDown' && historyIndex !== -1) {
            event.preventDefault(); const next = historyIndex + 1;
            setHistoryIndex(next >= history.length ? -1 : next); setInput(next >= history.length ? draft.current : history[next]);
          }
        }} />
        <button type="submit" className="run-command" aria-label="Run command">↵</button>
      </form>
      </div>
    </TerminalPanel>
  </div>;
}
