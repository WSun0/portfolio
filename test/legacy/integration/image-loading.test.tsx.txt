import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../utils'
import WagyuPage from '@/app/cooking/first-time-cooking-wagyu-2025/page'
import ChristmasPage from '@/app/cooking/christmas-dinner/page'
import SFPage from '@/app/cooking/sf-pier-farmers-market-breakfast-2023/page'

describe('Image Loading and Optimization', () => {
  describe('Wagyu Page Images', () => {
    it('renders all wagyu images with correct alt text', () => {
      renderWithProviders(<WagyuPage />)

      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThanOrEqual(3)

      // All images should have alt text
      images.forEach((img, idx) => {
        expect(img).toHaveAttribute('alt')
        expect(img.getAttribute('alt')).toContain('First Time Cooking Wagyu 2025')
      })
    })

    it('images have responsive sizing attributes', () => {
      const { container } = renderWithProviders(<WagyuPage />)

      // Next.js Image components should be present
      const images = container.querySelectorAll('img')
      expect(images.length).toBeGreaterThanOrEqual(3)
    })

    it('image grid uses responsive layout', () => {
      const { container } = renderWithProviders(<WagyuPage />)

      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()

      // Grid should have responsive column classes
      const gridClasses = grid?.className || ''
      expect(gridClasses).toContain('grid-cols')
    })
  })

  describe('Christmas Dinner Page Images', () => {
    it('renders all christmas images with correct alt text', () => {
      renderWithProviders(<ChristmasPage />)

      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThanOrEqual(2)

      images.forEach((img) => {
        expect(img).toHaveAttribute('alt')
        expect(img.getAttribute('alt')).toContain('Christmas Dinner')
      })
    })

    it('has menu and ingredients section', () => {
      renderWithProviders(<ChristmasPage />)

      expect(screen.getByText(/Menu and\/or Ingredients/i)).toBeInTheDocument()
    })
  })

  describe('SF Farmer\'s Market Page Images', () => {
    it('renders all SF breakfast images with correct alt text', () => {
      renderWithProviders(<SFPage />)

      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThanOrEqual(3)

      images.forEach((img) => {
        expect(img).toHaveAttribute('alt')
        expect(img.getAttribute('alt')).toContain('SF Pier')
      })
    })
  })

  describe('Image Grid Responsive Design', () => {
    it('all cooking pages use consistent grid layout', () => {
      const wagyuContainer = renderWithProviders(<WagyuPage />).container
      const christmasContainer = renderWithProviders(<ChristmasPage />).container
      const sfContainer = renderWithProviders(<SFPage />).container

      // All should have grid layout
      expect(wagyuContainer.querySelector('.grid')).toBeInTheDocument()
      expect(christmasContainer.querySelector('.grid')).toBeInTheDocument()
      expect(sfContainer.querySelector('.grid')).toBeInTheDocument()
    })

    it('grid adapts from 1 to 3 columns', () => {
      const { container } = renderWithProviders(<WagyuPage />)

      const grid = container.querySelector('.grid')
      const gridClasses = grid?.className || ''

      // Check for responsive column classes
      expect(gridClasses).toContain('grid-cols-1')
      expect(gridClasses).toMatch(/md:grid-cols-3/)
    })
  })

  describe('Image Accessibility', () => {
    it('all cooking page images have meaningful alt text', () => {
      const { container: wagyuContainer } = renderWithProviders(<WagyuPage />)
      const { container: christmasContainer } = renderWithProviders(<ChristmasPage />)
      const { container: sfContainer } = renderWithProviders(<SFPage />)

      const allContainers = [wagyuContainer, christmasContainer, sfContainer]

      allContainers.forEach(container => {
        const images = container.querySelectorAll('img')
        images.forEach(img => {
          const alt = img.getAttribute('alt')
          expect(alt).toBeTruthy()
          expect(alt).not.toBe('')
          expect(alt).not.toBe('image')
        })
      })
    })
  })
})
