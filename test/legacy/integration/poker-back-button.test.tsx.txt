import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../utils'
import CasinosPage from '@/app/poker/casinos/page'
import HandsPage from '@/app/poker/hands/page'

describe('Poker Subpage Back Button Integration', () => {
  describe('Casinos Page Back Button', () => {
    it('renders back button on casinos page', () => {
      renderWithProviders(<CasinosPage />)

      const backButton = screen.getByText(/Back to Poker/i)
      expect(backButton).toBeInTheDocument()
    })

    it('back button links to poker page', () => {
      renderWithProviders(<CasinosPage />)

      const backLink = screen.getByText(/Back to Poker/i).closest('a')
      expect(backLink).toHaveAttribute('href', '/poker')
    })

    it('back button appears above the title', () => {
      const { container } = renderWithProviders(<CasinosPage />)

      const backButton = screen.getByText(/Back to Poker/i)
      const title = screen.getByRole('heading', { name: /Casinos I've Played Poker At/i })

      // BackButton should come before the title in the DOM
      const backButtonIndex = Array.from(container.querySelectorAll('*')).indexOf(backButton.closest('a')!)
      const titleIndex = Array.from(container.querySelectorAll('*')).indexOf(title)

      expect(backButtonIndex).toBeLessThan(titleIndex)
    })
  })

  describe('Hand Histories Page Back Button', () => {
    it('renders back button on hands page', () => {
      renderWithProviders(<HandsPage />)

      const backButton = screen.getByText(/Back to Poker/i)
      expect(backButton).toBeInTheDocument()
    })

    it('back button links to poker page', () => {
      renderWithProviders(<HandsPage />)

      const backLink = screen.getByText(/Back to Poker/i).closest('a')
      expect(backLink).toHaveAttribute('href', '/poker')
    })

    it('back button appears above the title', () => {
      const { container } = renderWithProviders(<HandsPage />)

      const backButton = screen.getByText(/Back to Poker/i)
      const title = screen.getByRole('heading', { name: /Hand Histories/i })

      // BackButton should come before the title in the DOM
      const backButtonIndex = Array.from(container.querySelectorAll('*')).indexOf(backButton.closest('a')!)
      const titleIndex = Array.from(container.querySelectorAll('*')).indexOf(title)

      expect(backButtonIndex).toBeLessThan(titleIndex)
    })
  })

  describe('Back Button Consistency', () => {
    it('both poker subpages use the same back button styling', () => {
      const { container: casinosContainer } = renderWithProviders(<CasinosPage />)
      const casinosBackButton = screen.getByText(/Back to Poker/i).closest('a')

      const { container: handsContainer } = renderWithProviders(<HandsPage />)
      const handsBackButton = screen.getByText(/Back to Poker/i).closest('a')

      // Both should have the same classes
      expect(casinosBackButton?.className).toBe(handsBackButton?.className)
    })
  })
})
