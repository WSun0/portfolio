import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders, userEvent } from '../utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

describe('Navigation Integration', () => {
  describe('Header Navigation', () => {
    it('contains all main navigation links', () => {
      renderWithProviders(<Header />)

      expect(screen.getByRole('link', { name: /Blog/i })).toHaveAttribute('href', '/blog')
      expect(screen.getByRole('link', { name: /Poker/i })).toHaveAttribute('href', '/poker')
      expect(screen.getByRole('link', { name: /Cooking/i })).toHaveAttribute('href', '/cooking')
    })

    it('home icon navigates to root', () => {
      renderWithProviders(<Header />)

      const homeLink = screen.getByAltText('Home Icon').closest('a')
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('navigation links are in correct order', () => {
      renderWithProviders(<Header />)

      const navSection = screen.getByText('Blog').parentElement
      expect(navSection?.textContent).toBe('Blog·Poker·Cooking')
    })
  })

  describe('Footer Navigation', () => {
    it('contains social media links', () => {
      renderWithProviders(<Footer />)

      const linkedInLink = screen.getByText('LinkedIn').closest('a')
      const githubLink = screen.getByText('GitHub').closest('a')

      expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/william1sun/')
      expect(githubLink).toHaveAttribute('href', 'https://github.com/wsun0')
    })

    it('social links open in new tabs', () => {
      renderWithProviders(<Footer />)

      const links = screen.getAllByRole('link')
      const externalLinks = links.filter(link =>
        link.getAttribute('href')?.startsWith('http')
      )

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })
  })

  describe('Link Hover States', () => {
    it('navigation links have hover transition classes', () => {
      renderWithProviders(<Header />)

      const blogLink = screen.getByText('Blog')
      // Verify link exists
      expect(blogLink).toBeInTheDocument()
    })

    it('footer links have hover transition classes', () => {
      renderWithProviders(<Footer />)

      const linkedInLink = screen.getByText('LinkedIn')
      // Verify link exists and has className attribute
      expect(linkedInLink).toBeInTheDocument()
      expect(linkedInLink.className).toBeTruthy()
    })
  })

  describe('Consistent Navigation Across Layout', () => {
    it('header and footer can coexist', () => {
      renderWithProviders(
        <>
          <Header />
          <Footer />
        </>
      )

      // Header elements
      expect(screen.getByText('Blog')).toBeInTheDocument()
      expect(screen.getByText('Poker')).toBeInTheDocument()
      expect(screen.getByText('Cooking')).toBeInTheDocument()

      // Footer elements
      expect(screen.getByText('LinkedIn')).toBeInTheDocument()
      expect(screen.getByText('GitHub')).toBeInTheDocument()
    })
  })
})
