import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import TerminalPanel, { formatSessionTime } from '@/components/TerminalPanel';

const close = vi.fn();
function panel(open = true) { return <TerminalPanel open={open} location="~" onClose={close}><input aria-label="Draft" defaultValue="ls" /></TerminalPanel>; }
beforeEach(() => {
  Object.defineProperty(window, 'innerHeight', { configurable: true, writable: true, value: 800 });
  vi.stubGlobal('PointerEvent', MouseEvent);
  close.mockClear();
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
describe('terminal panel controls', () => {
  it('resizes with arrows, clamps the range, and resets on double click', () => {
    render(panel());
    const handle = screen.getByRole('separator', { name: 'Resize terminal' });
    expect(handle).toHaveAttribute('aria-valuenow', '256');
    fireEvent.keyDown(handle, { key: 'ArrowUp' });
    expect(handle).toHaveAttribute('aria-valuenow', '276');
    fireEvent.keyDown(handle, { key: 'End' });
    fireEvent.keyDown(handle, { key: 'ArrowUp' });
    expect(handle).toHaveAttribute('aria-valuenow', '626');
    fireEvent.keyDown(handle, { key: 'Home' });
    fireEvent.keyDown(handle, { key: 'ArrowDown' });
    expect(handle).toHaveAttribute('aria-valuenow', '160');
    fireEvent.doubleClick(handle);
    expect(handle).toHaveAttribute('aria-valuenow', '256');
  });
  it('drags upward to grow, stops on cancellation, and preserves the input', () => {
    render(panel());
    const handle = screen.getByRole('separator');
    fireEvent.pointerDown(handle, { button: 0, clientY: 544 });
    fireEvent.pointerMove(handle, { clientY: 444 });
    expect(handle).toHaveAttribute('aria-valuenow', '356');
    fireEvent.pointerCancel(handle);
    fireEvent.pointerMove(handle, { clientY: 200 });
    expect(handle).toHaveAttribute('aria-valuenow', '356');
    expect(screen.getByRole('textbox')).toHaveValue('ls');
  });
  it('preserves room for the page when the window shrinks', () => {
    render(panel());
    const handle = screen.getByRole('separator');
    fireEvent.keyDown(handle, { key: 'End' });
    window.innerHeight = 400;
    fireEvent(window, new Event('resize'));
    expect(handle).toHaveAttribute('aria-valuenow', '226');
    expect(handle).toHaveAttribute('aria-valuemax', '226');
  });
  it('limits text size and retains adjustments after reopening', () => {
    const { rerender } = render(panel());
    const increase = screen.getByRole('button', { name: 'Increase terminal text size' });
    const decrease = screen.getByRole('button', { name: 'Decrease terminal text size' });
    for (let n = 0; n < 15; n++) fireEvent.click(increase);
    expect(increase).toBeDisabled();
    expect(screen.getByRole('region').style.getPropertyValue('--terminal-font-size')).toBe('22px');
    for (let n = 0; n < 15; n++) fireEvent.click(decrease);
    expect(decrease).toBeDisabled();
    rerender(panel(false));
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    rerender(panel());
    expect(screen.getByRole('region').style.getPropertyValue('--terminal-font-size')).toBe('11px');
  });
  it('updates the live clock once a second and stops when closed', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-30T03:05:00Z'));
    const { rerender, unmount } = render(panel());
    expect(screen.getByText('Sep 29, 2026, 11:05:00 PM EDT')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText('Sep 29, 2026, 11:05:01 PM EDT')).toBeInTheDocument();
    rerender(panel(false));
    expect(vi.getTimerCount()).toBe(0);
    rerender(panel());
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
  it('keeps the requested EDT offset across dates and visitor locales', () => {
    expect(formatSessionTime(new Date('2026-01-01T02:00:00Z'))).toBe('Dec 31, 2025, 10:00:00 PM EDT');
  });
  it('places text controls before close and calls the close handler', () => {
    render(panel());
    expect(screen.getAllByRole('button').map(button => button.getAttribute('aria-label'))).toEqual([
      'Increase terminal text size', 'Decrease terminal text size', 'Close terminal',
    ]);
    fireEvent.click(screen.getByRole('button', { name: 'Close terminal' }));
    expect(close).toHaveBeenCalledOnce();
  });
});
