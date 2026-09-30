'use client';
import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

// EDT is UTC−4 year-round, as requested, independent of the visitor's timezone.
const sessionFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Etc/GMT+4', month: 'short', day: '2-digit', year: 'numeric',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
});
export function formatSessionTime(date: Date) { return `${sessionFormatter.format(date).replace('AM', 'am').replace('PM', 'pm')} EDT`; }

export default function TerminalPanel({ open, location, onClose, children }: {
  open: boolean; location: string; onClose: () => void; children: ReactNode;
}) {
  const panel = useRef<HTMLElement>(null);
  const drag = useRef<{ y: number; height: number; pointerId: number } | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [viewport, setViewport] = useState(800);
  const [fontSize, setFontSize] = useState(13);
  const [now, setNow] = useState<Date | null>(null);
  const maximum = Math.max(100, viewport - 174);
  const minimum = Math.min(160, maximum);
  const clamp = (value: number) => Math.min(maximum, Math.max(minimum, value));
  const actualHeight = height === null ? Math.min(maximum, Math.max(minimum, Math.min(330, viewport * .32))) : clamp(height);

  useEffect(() => {
    const resize = () => setViewport(window.innerHeight);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  useEffect(() => {
    if (!open) { drag.current = null; return; }
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [open]);

  if (!open) return null;
  return <section ref={panel} id="site-terminal" className="terminal-panel" aria-label="Website terminal"
    style={{ height: actualHeight, '--terminal-font-size': `${fontSize}px` } as CSSProperties}>
    <div className="terminal-resize-handle" role="separator" tabIndex={0}
      aria-label="Resize terminal" aria-orientation="horizontal" aria-controls="site-terminal"
      aria-valuemin={minimum} aria-valuemax={maximum} aria-valuenow={Math.round(actualHeight)}
      aria-valuetext={`${Math.round(actualHeight)} pixels high`}
      title="drag to resize · arrow keys to adjust · double-click to reset"
      onPointerDown={event => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.focus();
        drag.current = { y: event.clientY, height: panel.current?.getBoundingClientRect().height || actualHeight, pointerId: event.pointerId };
        event.currentTarget.setPointerCapture?.(event.pointerId);
      }}
      onPointerMove={event => {
        if (drag.current && drag.current.pointerId === event.pointerId) setHeight(clamp(drag.current.height + drag.current.y - event.clientY));
      }}
      onPointerUp={event => {
        drag.current = null;
        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { drag.current = null; }}
      onLostPointerCapture={() => { drag.current = null; }}
      onDoubleClick={() => setHeight(null)}
      onKeyDown={event => {
        const step = event.shiftKey ? 60 : 20;
        const next = event.key === 'ArrowUp' ? actualHeight + step : event.key === 'ArrowDown' ? actualHeight - step : event.key === 'Home' ? minimum : event.key === 'End' ? maximum : null;
        if (next !== null) { event.preventDefault(); setHeight(clamp(next)); }
      }} />
    <div className="terminal-toolbar">
      <div className="terminal-status">
        <span className="terminal-title">terminal <span className="terminal-location">{location}</span></span>
        <span className="terminal-session">current session: <time dateTime={now?.toISOString()}>{now ? formatSessionTime(now) : '—'}</time></span>
      </div>
      <div className="terminal-actions">
        <button type="button" aria-label="Increase terminal text size" title={`increase text size (${fontSize}px)`} disabled={fontSize >= 22} onClick={() => setFontSize(size => Math.min(22, size + 1))}>+</button>
        <button type="button" aria-label="Decrease terminal text size" title={`decrease text size (${fontSize}px)`} disabled={fontSize <= 11} onClick={() => setFontSize(size => Math.max(11, size - 1))}>−</button>
        <button type="button" className="terminal-close" onClick={onClose} aria-label="Close terminal">close ×</button>
      </div>
    </div>
    {children}
  </section>;
}
