import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => {
    return React.createElement('img', props)
  },
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => {
    return React.createElement('a', { href }, children)
  },
}))

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}))

// Mock Framer Motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
    img: (props: any) => React.createElement('img', props),
    section: ({ children, ...props }: any) => React.createElement('section', props, children),
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock ParticleBackground component
vi.mock('@/components/ParticleBackground', () => ({
  default: () => React.createElement('div', { 'data-testid': 'particles' }, 'Particles Component'),
}))

// Mock CSS imports
vi.mock('leaflet/dist/leaflet.css', () => ({}))
