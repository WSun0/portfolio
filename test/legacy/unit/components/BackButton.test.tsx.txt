import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils'
import BackButton from '@/components/BackButton'

describe('BackButton', () => {
  it('renders with correct label', () => {
    renderWithProviders(<BackButton href="/poker" label="Back to Poker" />)

    expect(screen.getByText(/Back to Poker/i)).toBeInTheDocument()
  })

  it('renders the back arrow', () => {
    renderWithProviders(<BackButton href="/cooking" label="Back to Cooking" />)

    expect(screen.getByText('←')).toBeInTheDocument()
  })

  it('has correct href attribute', () => {
    renderWithProviders(<BackButton href="/poker" label="Back to Poker" />)

    const link = screen.getByText(/Back to Poker/i).closest('a')
    expect(link).toHaveAttribute('href', '/poker')
  })

  it('applies correct styling classes', () => {
    renderWithProviders(<BackButton href="/test" label="Back" />)

    const link = screen.getByText(/Back/i).closest('a')
    expect(link).toHaveClass('inline-flex', 'items-center', 'text-sm')
  })

  it('renders as a link element', () => {
    renderWithProviders(<BackButton href="/poker" label="Back to Poker" />)

    const link = screen.getByText(/Back to Poker/i).closest('a')
    expect(link).toBeInTheDocument()
    expect(link?.tagName).toBe('A')
  })
})
