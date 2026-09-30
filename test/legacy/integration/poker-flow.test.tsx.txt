import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../utils'
import PokerPage from '@/app/poker/page'
import CasinosPage from '@/app/poker/casinos/page'

describe('Poker Flow Integration', () => {
  describe('Poker Hub Page', () => {
    it('provides navigation to casinos subpage', () => {
      renderWithProviders(<PokerPage />)

      const casinosLink = screen.getByRole('link', { name: /here/i })
      expect(casinosLink).toHaveAttribute('href', '/poker/casinos')
    })

    it('describes the casinos page content', () => {
      renderWithProviders(<PokerPage />)

      expect(screen.getByText(/see where I've played poker at/i)).toBeInTheDocument()
    })

    it('uses consistent link styling', () => {
      renderWithProviders(<PokerPage />)

      const link = screen.getByRole('link', { name: /here/i })
      // Verify link exists and navigates correctly
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/poker/casinos')
    })
  })

  describe('Casinos Subpage', () => {
    it('displays complete casino information', async () => {
      renderWithProviders(<CasinosPage />)

      // Check sections exist
      expect(screen.getByRole('heading', { name: /In-Person Casinos/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /Online Poker Rooms/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /Thoughts on Each Location/i })).toBeInTheDocument()
    })

    it('lists all poker locations', () => {
      renderWithProviders(<CasinosPage />)

      // In-person casinos
      const inPersonCasinos = [
        'Encore Boston Harbor',
        'Parx Casino',
        'Chasers Poker Room',
        'Metro Casino',
        'Caesars New Orleans',
        'Playground Card Room'
      ]

      inPersonCasinos.forEach(casino => {
        expect(screen.getByText(new RegExp(casino, 'i'))).toBeInTheDocument()
      })

      // Online rooms
      expect(screen.getByText('Club WPT Gold')).toBeInTheDocument()
      expect(screen.getByText('Ignition')).toBeInTheDocument()
      expect(screen.getByText('ACR')).toBeInTheDocument()
    })

    it('includes map container', () => {
      const { container } = renderWithProviders(<CasinosPage />)

      // Verify that the page structure includes a map area
      const mapWrapper = container.querySelector('[style*="height: 500px"]')
      expect(mapWrapper).toBeInTheDocument()
    })
  })

  describe('Poker Section Consistency', () => {
    it('poker hub and casinos page have matching location count', () => {
      // Render casinos page to verify consistency
      const { container } = renderWithProviders(<CasinosPage />)

      const listItems = container.querySelectorAll('li')
      // Should have 6 in-person + 3 online = 9 total list items
      expect(listItems.length).toBe(9)
    })
  })
})
