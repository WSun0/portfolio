import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../utils'
import SFPierFarmersMarketBreakfastPage from '@/app/cooking/sf-pier-farmers-market-breakfast-2023/page'
import FirstTimeCookingWagyu2025Page from '@/app/cooking/first-time-cooking-wagyu-2025/page'
import ChristmasDinnerPage from '@/app/cooking/christmas-dinner/page'

describe('Cooking Subpage Back Button Integration', () => {
  describe('SF Pier Farmers Market Breakfast Page Back Button', () => {
    it('renders back button on sf pier page', () => {
      renderWithProviders(<SFPierFarmersMarketBreakfastPage />)

      const backButton = screen.getByText(/Back to Cooking/i)
      expect(backButton).toBeInTheDocument()
    })

    it('back button links to cooking page', () => {
      renderWithProviders(<SFPierFarmersMarketBreakfastPage />)

      const backLink = screen.getByText(/Back to Cooking/i).closest('a')
      expect(backLink).toHaveAttribute('href', '/cooking')
    })

    it('back button appears above the title', () => {
      const { container } = renderWithProviders(<SFPierFarmersMarketBreakfastPage />)

      const backButton = screen.getByText(/Back to Cooking/i)
      const title = screen.getByRole('heading', { name: /SF Pier Farmer's Market Breakfast 2023/i })

      // BackButton should come before the title in the DOM
      const backButtonIndex = Array.from(container.querySelectorAll('*')).indexOf(backButton.closest('a')!)
      const titleIndex = Array.from(container.querySelectorAll('*')).indexOf(title)

      expect(backButtonIndex).toBeLessThan(titleIndex)
    })
  })

  describe('First Time Cooking Wagyu Page Back Button', () => {
    it('renders back button on wagyu page', () => {
      renderWithProviders(<FirstTimeCookingWagyu2025Page />)

      const backButton = screen.getByText(/Back to Cooking/i)
      expect(backButton).toBeInTheDocument()
    })

    it('back button links to cooking page', () => {
      renderWithProviders(<FirstTimeCookingWagyu2025Page />)

      const backLink = screen.getByText(/Back to Cooking/i).closest('a')
      expect(backLink).toHaveAttribute('href', '/cooking')
    })

    it('back button appears above the title', () => {
      const { container } = renderWithProviders(<FirstTimeCookingWagyu2025Page />)

      const backButton = screen.getByText(/Back to Cooking/i)
      const title = screen.getByRole('heading', { name: /First Time Cooking Wagyu 2025/i })

      // BackButton should come before the title in the DOM
      const backButtonIndex = Array.from(container.querySelectorAll('*')).indexOf(backButton.closest('a')!)
      const titleIndex = Array.from(container.querySelectorAll('*')).indexOf(title)

      expect(backButtonIndex).toBeLessThan(titleIndex)
    })
  })

  describe('Christmas Dinner Page Back Button', () => {
    it('renders back button on christmas dinner page', () => {
      renderWithProviders(<ChristmasDinnerPage />)

      const backButton = screen.getByText(/Back to Cooking/i)
      expect(backButton).toBeInTheDocument()
    })

    it('back button links to cooking page', () => {
      renderWithProviders(<ChristmasDinnerPage />)

      const backLink = screen.getByText(/Back to Cooking/i).closest('a')
      expect(backLink).toHaveAttribute('href', '/cooking')
    })

    it('back button appears above the title', () => {
      const { container } = renderWithProviders(<ChristmasDinnerPage />)

      const backButton = screen.getByText(/Back to Cooking/i)
      const title = screen.getByRole('heading', { name: /Christmas Dinner 2024/i })

      // BackButton should come before the title in the DOM
      const backButtonIndex = Array.from(container.querySelectorAll('*')).indexOf(backButton.closest('a')!)
      const titleIndex = Array.from(container.querySelectorAll('*')).indexOf(title)

      expect(backButtonIndex).toBeLessThan(titleIndex)
    })
  })

  describe('Back Button Consistency Across Cooking Subpages', () => {
    it('all cooking subpages use the same back button styling', () => {
      const { container: sfContainer } = renderWithProviders(<SFPierFarmersMarketBreakfastPage />)
      const sfBackButton = screen.getByText(/Back to Cooking/i).closest('a')

      const { container: wagyuContainer } = renderWithProviders(<FirstTimeCookingWagyu2025Page />)
      const wagyuBackButton = screen.getByText(/Back to Cooking/i).closest('a')

      const { container: christmasContainer } = renderWithProviders(<ChristmasDinnerPage />)
      const christmasBackButton = screen.getByText(/Back to Cooking/i).closest('a')

      // All should have the same classes
      expect(sfBackButton?.className).toBe(wagyuBackButton?.className)
      expect(wagyuBackButton?.className).toBe(christmasBackButton?.className)
    })

    it('all cooking subpages link back to /cooking', () => {
      renderWithProviders(<SFPierFarmersMarketBreakfastPage />)
      expect(screen.getByText(/Back to Cooking/i).closest('a')).toHaveAttribute('href', '/cooking')

      renderWithProviders(<FirstTimeCookingWagyu2025Page />)
      expect(screen.getByText(/Back to Cooking/i).closest('a')).toHaveAttribute('href', '/cooking')

      renderWithProviders(<ChristmasDinnerPage />)
      expect(screen.getByText(/Back to Cooking/i).closest('a')).toHaveAttribute('href', '/cooking')
    })
  })
})
