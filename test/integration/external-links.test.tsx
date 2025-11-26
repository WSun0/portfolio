import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../utils'
import Home from '@/app/page'
import Footer from '@/components/Footer'

describe('External Links Security and Behavior', () => {
  describe('Homepage External Links', () => {
    it('Valorant tracker link opens in new tab with security attributes', () => {
      renderWithProviders(<Home />)

      const fpsLink = screen.getByText('first-person shooters')
      expect(fpsLink).toHaveAttribute('target', '_blank')
      expect(fpsLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(fpsLink).toHaveAttribute('href')
      expect(fpsLink.getAttribute('href')).toContain('tracker.gg/valorant')
    })

    it('Pokemon Smogon link opens in new tab with security attributes', () => {
      const { container } = renderWithProviders(<Home />)

      const pokemonLink = Array.from(container.querySelectorAll('a')).find(
        link => link.textContent?.includes('Pokémon')
      )

      expect(pokemonLink).toBeTruthy()
      expect(pokemonLink).toHaveAttribute('target', '_blank')
      expect(pokemonLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(pokemonLink?.getAttribute('href')).toBe('https://www.smogon.com/forums/members/will.485997/')
    })

    it('all external links have proper security attributes', () => {
      const { container } = renderWithProviders(<Home />)

      const externalLinks = Array.from(container.querySelectorAll('a')).filter(
        link => link.getAttribute('href')?.startsWith('http')
      )

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })

      // Should have exactly 2 external links on home page
      expect(externalLinks.length).toBe(2)
    })
  })

  describe('Footer External Links', () => {
    it('LinkedIn link opens in new tab with correct URL', () => {
      renderWithProviders(<Footer />)

      const linkedinLink = screen.getByText('LinkedIn')
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/william1sun/')
      expect(linkedinLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('GitHub link opens in new tab with correct URL', () => {
      renderWithProviders(<Footer />)

      const githubLink = screen.getByText('GitHub')
      expect(githubLink).toHaveAttribute('href', 'https://github.com/wsun0')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('both footer links have hover states', () => {
      renderWithProviders(<Footer />)

      const linkedinLink = screen.getByText('LinkedIn')
      const githubLink = screen.getByText('GitHub')

      // Links should have transition class for hover effect
      const linkedinClasses = linkedinLink.className
      const githubClasses = githubLink.className

      expect(linkedinClasses).toContain('transition')
      expect(githubClasses).toContain('transition')
    })
  })

  describe('Link Accessibility', () => {
    it('external links are keyboard accessible', () => {
      renderWithProviders(<Footer />)

      const linkedinLink = screen.getByText('LinkedIn')
      const githubLink = screen.getByText('GitHub')

      // Links should be anchor tags and naturally keyboard accessible
      expect(linkedinLink.tagName).toBe('A')
      expect(githubLink.tagName).toBe('A')
    })

    it('external links have descriptive text', () => {
      renderWithProviders(<Home />)

      const fpsLink = screen.getByText('first-person shooters')
      const pokemonLink = screen.getByText(/battling Pokémon competitively/i)

      // Link text should be descriptive, not just "click here"
      expect(fpsLink.textContent).toBe('first-person shooters')
      expect(pokemonLink.textContent).toContain('battling Pokémon competitively')
    })
  })
})
