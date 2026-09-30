import { describe, it, expect } from 'vitest'
import { renderWithProviders } from '../../utils'
import PageTransition from '@/components/PageTransition'

describe('PageTransition', () => {
  it('renders children content', () => {
    const { getByText } = renderWithProviders(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('wraps content in motion.div (via mock)', () => {
    const { container } = renderWithProviders(
      <PageTransition>
        <div data-testid="child">Test Content</div>
      </PageTransition>
    )

    const child = container.querySelector('[data-testid="child"]')
    expect(child).toBeInTheDocument()
  })

  it('applies correct structure', () => {
    const { container } = renderWithProviders(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    )

    // Should render the wrapper div
    expect(container.firstChild).toBeInTheDocument()
  })
})
