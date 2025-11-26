import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithProviders, waitFor } from '../../utils'
import ParticleBackground from '@/components/ParticleBackground'

// Mock the tsparticles modules
vi.mock('@tsparticles/react', () => ({
  Particles: ({ id, options }: any) => (
    <div data-testid="particles" data-particle-id={id} data-particle-options={JSON.stringify(options)}>
      Particles Component
    </div>
  ),
  initParticlesEngine: vi.fn(() => Promise.resolve()),
}))

vi.mock('@tsparticles/slim', () => ({
  loadSlim: vi.fn(),
}))

describe('ParticleBackground', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders particles component', () => {
    const { container } = renderWithProviders(<ParticleBackground />)

    const particles = container.querySelector('[data-testid="particles"]')
    expect(particles).toBeInTheDocument()
  })

  it('displays particles content', () => {
    const { container } = renderWithProviders(<ParticleBackground />)

    const particles = container.querySelector('[data-testid="particles"]')
    expect(particles).toHaveTextContent('Particles Component')
  })
})
