import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Layout from '@/components/Layout'
import WagyuPage from '@/app/cooking/first-time-cooking-wagyu-2025/page'

describe('Responsive Layout and Design', () => {
  describe('Header Responsive Behavior', () => {
    it('header maintains consistent structure', () => {
      const { container } = renderWithProviders(<Header />)

      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()

      // Nav should have flex layout
      const navClasses = nav?.className || ''
      expect(navClasses).toContain('flex')
      expect(navClasses).toContain('items-center')
      expect(navClasses).toContain('justify-between')
    })

    it('navigation links are horizontally laid out', () => {
      const { container } = renderWithProviders(<Header />)

      const linksContainer = container.querySelector('.flex.items-center.gap-2')
      expect(linksContainer).toBeInTheDocument()
    })

    it('header has responsive padding', () => {
      const { container } = renderWithProviders(<Header />)

      const nav = container.querySelector('nav')
      const navClasses = nav?.className || ''
      expect(navClasses).toContain('px-10')
      expect(navClasses).toContain('py-6')
    })
  })

  describe('Footer Responsive Behavior', () => {
    it('footer maintains consistent structure', () => {
      const { container } = renderWithProviders(<Footer />)

      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })

    it('footer has flex layout for social links', () => {
      const { container } = renderWithProviders(<Footer />)

      const linksContainer = container.querySelector('.flex')
      expect(linksContainer).toBeInTheDocument()
    })
  })

  describe('Layout Component Responsive Container', () => {
    it('main content has max-width constraint', () => {
      const { container } = renderWithProviders(
        <Layout>
          <div>Test</div>
        </Layout>
      )

      const main = container.querySelector('main')
      const mainClasses = main?.className || ''
      expect(mainClasses).toContain('max-w')
      expect(mainClasses).toContain('mx-auto')
    })

    it('layout uses flexbox with full height', () => {
      const { container } = renderWithProviders(
        <Layout>
          <div>Test</div>
        </Layout>
      )

      const wrapper = container.querySelector('.flex.flex-col.min-h-screen')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Image Grid Responsive Behavior', () => {
    it('cooking page images use responsive grid', () => {
      const { container } = renderWithProviders(<WagyuPage />)

      const grid = container.querySelector('.grid')
      const gridClasses = grid?.className || ''

      // Should have mobile-first responsive classes
      expect(gridClasses).toContain('grid-cols-1')
      expect(gridClasses).toMatch(/sm:grid-cols-2/)
      expect(gridClasses).toMatch(/md:grid-cols-3/)
    })

    it('image containers have responsive sizing', () => {
      const { container } = renderWithProviders(<WagyuPage />)

      const imageContainers = container.querySelectorAll('.w-full.h-64')
      expect(imageContainers.length).toBeGreaterThanOrEqual(3)

      imageContainers.forEach(imgContainer => {
        const classes = imgContainer.className
        expect(classes).toContain('w-full')
        expect(classes).toContain('h-64')
      })
    })
  })

  describe('Content Container Widths', () => {
    it('pages have consistent max-width containers', () => {
      const { container } = renderWithProviders(<WagyuPage />)

      const contentContainer = container.querySelector('.max-w-4xl')
      expect(contentContainer).toBeInTheDocument()
    })

    it('containers are centered with auto margins', () => {
      const { container } = renderWithProviders(<WagyuPage />)

      const contentContainer = container.querySelector('.mx-auto')
      expect(contentContainer).toBeInTheDocument()
    })

    it('containers have responsive padding', () => {
      const { container } = renderWithProviders(<WagyuPage />)

      const contentContainer = container.querySelector('.px-10')
      expect(contentContainer).toBeInTheDocument()
    })
  })

  describe('Mobile-Friendly Touch Targets', () => {
    it('navigation links have adequate spacing', () => {
      const { container } = renderWithProviders(<Header />)

      const linksContainer = container.querySelector('.gap-2')
      expect(linksContainer).toBeInTheDocument()
    })

    it('footer links have adequate spacing', () => {
      const { container } = renderWithProviders(<Footer />)

      const linksContainer = container.querySelector('.gap-2')
      expect(linksContainer).toBeInTheDocument()
    })

    it('home icon has adequate size for touch', () => {
      const { container } = renderWithProviders(<Header />)

      const homeIcon = container.querySelector('.w-8.h-8')
      expect(homeIcon).toBeInTheDocument()
    })
  })
})
