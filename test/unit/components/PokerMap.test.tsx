import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

const map = vi.hoisted(() => ({ invalidateSize: vi.fn(), getContainer: vi.fn() }));
const tiles = vi.hoisted(() => ({ handlers: {} as Record<string, () => void> }));
vi.mock('react-leaflet', () => ({
  useMap: () => map,
  MapContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  TileLayer: ({ eventHandlers }: { eventHandlers: Record<string, () => void> }) => { tiles.handlers = eventHandlers; return null; },
  Marker: ({ title, children }: { title: string; children: ReactNode }) => <div role="button" aria-label={title}>{children}</div>,
  Popup: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
import PokerMap from '@/components/PokerMap';

afterEach(() => { vi.unstubAllGlobals(); vi.clearAllMocks(); });

describe('casino map', () => {
  function setup() {
    let resize = () => {};
    const observe = vi.fn();
    const disconnect = vi.fn();
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback: () => void) { resize = callback; }
      observe = observe;
      disconnect = disconnect;
    });
    const container = document.createElement('div');
    map.getContainer.mockReturnValue(container);
    const view = render(<PokerMap />);
    return { ...view, resize: () => resize(), observe, disconnect, container };
  }
  it('preserves all six casino pins and adds Bay 101', () => {
    setup();
    expect(screen.getAllByRole('button')).toHaveLength(7);
    for (const name of ['Encore Boston Harbor', 'Parx Casino', 'Chasers Poker Room', 'Metro Casino', 'Caesars New Orleans', 'Playground Card Room', 'Bay 101']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Bay 101' })).toHaveTextContent('San Jose, California');
  });
  it('updates the map when its container changes size and cleans up on navigation', () => {
    const view = setup();
    expect(view.observe).toHaveBeenCalledWith(view.container);
    act(view.resize);
    expect(map.invalidateSize).toHaveBeenCalledWith({ pan: false });
    view.unmount();
    expect(view.disconnect).toHaveBeenCalledOnce();
  });
  it('shows a useful fallback when tiles fail and clears it after recovery', () => {
    setup();
    act(() => tiles.handlers.tileerror());
    expect(screen.getByRole('status')).toHaveTextContent('the casino list is available above');
    act(() => tiles.handlers.tileload());
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
