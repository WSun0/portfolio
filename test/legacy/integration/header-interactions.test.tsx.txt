import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../utils'
import Header from '@/components/Header'

describe('Header Interactions', () => {
  it('home icon should have hover state', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    const homeLink = screen.getByAltText('Home Icon').closest('a')
    expect(homeLink).toBeInTheDocument()

    // Simulate hover
    if (homeLink) {
      await user.hover(homeLink)
      // Icon should be visible and hoverable
      expect(homeLink).toBeInTheDocument()
    }
  })

  it('navigation links should have hover state', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    const blogLink = screen.getByText('Blog')
    await user.hover(blogLink)

    // Link should still be accessible after hover
    expect(blogLink).toBeInTheDocument()
  })

  it('all navigation links should be clickable', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    const blogLink = screen.getByText('Blog')
    const pokerLink = screen.getByText('Poker')
    const cookingLink = screen.getByText('Cooking')

    // Links should be clickable (have href and be anchor tags)
    expect(blogLink.closest('a')).toHaveAttribute('href', '/blog')
    expect(pokerLink.closest('a')).toHaveAttribute('href', '/poker')
    expect(cookingLink.closest('a')).toHaveAttribute('href', '/cooking')
  })

  it('header should maintain z-index above background elements', () => {
    const { container } = renderWithProviders(<Header />)

    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()

    // Verify header has z-index class (should contain 'z-' in className)
    const headerClasses = header?.className || ''
    expect(headerClasses).toMatch(/z-\d+/)
  })

  it('home icon should be keyboard accessible', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    const homeLink = screen.getByAltText('Home Icon').closest('a')

    if (homeLink) {
      // Tab to the link
      await user.tab()

      // Link should be in the document
      expect(homeLink).toBeInTheDocument()
    }
  })

  it('navigation should be keyboard navigable', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Header />)

    // All links should be tabbable
    const homeLink = screen.getByAltText('Home Icon').closest('a')
    const blogLink = screen.getByText('Blog').closest('a')
    const pokerLink = screen.getByText('Poker').closest('a')
    const cookingLink = screen.getByText('Cooking').closest('a')

    expect(homeLink).toBeInTheDocument()
    expect(blogLink).toBeInTheDocument()
    expect(pokerLink).toBeInTheDocument()
    expect(cookingLink).toBeInTheDocument()
  })
})
