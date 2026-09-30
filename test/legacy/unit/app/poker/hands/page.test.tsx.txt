import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../../../utils'
import HandsPage from '@/app/poker/hands/page'

describe('Hand Histories Page', () => {
  it('renders the main heading', () => {
    renderWithProviders(<HandsPage />)

    const heading = screen.getByRole('heading', { name: /Hand Histories/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the page description', () => {
    renderWithProviders(<HandsPage />)

    expect(screen.getByText(/A collection of interesting hands/i)).toBeInTheDocument()
  })

  it('renders coming soon placeholder', () => {
    renderWithProviders(<HandsPage />)

    expect(screen.getByText(/Coming Soon/i)).toBeInTheDocument()
    expect(screen.getByText(/More hand histories to be added/i)).toBeInTheDocument()
  })

  it('has proper container styling', () => {
    const { container } = renderWithProviders(<HandsPage />)

    const mainDiv = container.querySelector('.w-full.max-w-4xl')
    expect(mainDiv).toBeInTheDocument()
  })

  it('renders back button', () => {
    renderWithProviders(<HandsPage />)

    const backLink = screen.getByText(/Back to Poker/i)
    expect(backLink).toBeInTheDocument()
    expect(backLink.closest('a')).toHaveAttribute('href', '/poker')
  })
})
