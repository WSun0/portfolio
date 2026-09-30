import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import React from 'react';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

vi.mock('next/image', () => ({
  default: ({ fill, priority, blurDataURL, placeholder, ...props }: Record<string, unknown>) => React.createElement('img', props),
}));
// Preserve click handlers, accessibility attributes and ref behavior on real anchors.
vi.mock('next/link', () => ({
  default: ({ children, onClick, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => React.createElement('a', { ...props, onClick: (event: React.MouseEvent<HTMLAnchorElement>) => { onClick?.(event); event.preventDefault(); } }, children),
}));
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));
