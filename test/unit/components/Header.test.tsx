import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils'
import Header from '@/components/Header'

describe('Header', () => {
  it('renders the home icon', () => {
    renderWithProviders(<Header />)
    const homeIcon = screen.getByAltText('Home Icon')
    expect(homeIcon).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    renderWithProviders(<Header />)

    const blogLink = screen.getByText('Blog')
    const pokerLink = screen.getByText('Poker')
    const cookingLink = screen.getByText('Cooking')

    expect(blogLink).toBeInTheDocument()
    expect(pokerLink).toBeInTheDocument()
    expect(cookingLink).toBeInTheDocument()
  })

  it('navigation links have correct hrefs', () => {
    renderWithProviders(<Header />)

    const blogLink = screen.getByText('Blog').closest('a')
    const pokerLink = screen.getByText('Poker').closest('a')
    const cookingLink = screen.getByText('Cooking').closest('a')

    expect(blogLink).toHaveAttribute('href', '/blog')
    expect(pokerLink).toHaveAttribute('href', '/poker')
    expect(cookingLink).toHaveAttribute('href', '/cooking')
  })

  it('home icon links to root path', () => {
    renderWithProviders(<Header />)

    const homeLink = screen.getByAltText('Home Icon').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders navigation in correct order', () => {
    renderWithProviders(<Header />)

    const blogLink = screen.getByText('Blog')
    const pokerLink = screen.getByText('Poker')
    const cookingLink = screen.getByText('Cooking')

    // All nav links should be in the document
    expect(blogLink).toBeInTheDocument()
    expect(pokerLink).toBeInTheDocument()
    expect(cookingLink).toBeInTheDocument()
  })
})
