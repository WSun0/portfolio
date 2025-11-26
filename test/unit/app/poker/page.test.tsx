import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../../utils'
import PokerPage from '@/app/poker/page'

describe('Poker Page', () => {
  it('renders the main heading', () => {
    renderWithProviders(<PokerPage />)

    const heading = screen.getByRole('heading', { name: /Poker/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders link to casinos page', () => {
    renderWithProviders(<PokerPage />)

    const link = screen.getByRole('link', { name: /here/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/poker/casinos')
  })

  it('renders descriptive text about casinos', () => {
    renderWithProviders(<PokerPage />)

    expect(screen.getByText(/see where I've played poker at/i)).toBeInTheDocument()
  })

  it('casino link navigates correctly', () => {
    renderWithProviders(<PokerPage />)

    const link = screen.getByRole('link', { name: /here/i })
    // Verify link exists and has correct href
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/poker/casinos')
  })
})
