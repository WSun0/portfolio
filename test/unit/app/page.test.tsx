import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils'
import Home from '@/app/page'

describe('Home Page', () => {
  it('renders the main heading', () => {
    const { container } = renderWithProviders(<Home />)

    // Check for heading by text content
    expect(container.textContent).toContain('William Sun')
  })

  it('renders the about section', () => {
    const { container } = renderWithProviders(<Home />)

    expect(container.textContent).toContain('Northeastern University')
    expect(container.textContent).toContain('CS & Math')
  })

  it('renders interests and hobbies', () => {
    const { container } = renderWithProviders(<Home />)

    expect(container.textContent).toContain('quantitative trading')
    expect(container.textContent).toContain('game theory')
    expect(container.textContent).toContain('deep reinforcement learning')
  })

  it('renders hyperlinks for FPS and Pokemon', () => {
    const { container } = renderWithProviders(<Home />)

    const links = container.querySelectorAll('a')
    const linkTexts = Array.from(links).map(link => link.textContent)

    expect(linkTexts).toContain('first-person shooters')
    expect(linkTexts.some(text => text?.includes('Pokémon'))).toBe(true)
  })

  it('FPS link has correct href', () => {
    const { container } = renderWithProviders(<Home />)

    const fpsLink = Array.from(container.querySelectorAll('a')).find(
      link => link.textContent === 'first-person shooters'
    )
    expect(fpsLink?.getAttribute('href')).toContain('tracker.gg/valorant')
  })

  it('Pokemon link has correct href', () => {
    const { container } = renderWithProviders(<Home />)

    const pokemonLink = Array.from(container.querySelectorAll('a')).find(
      link => link.textContent?.includes('Pokémon')
    )
    expect(pokemonLink?.getAttribute('href')).toBe('https://www.smogon.com/forums/members/will.485997/')
  })

  it('renders contact email in code block', () => {
    const { container } = renderWithProviders(<Home />)

    const codeElement = container.querySelector('code')
    expect(codeElement).toBeInTheDocument()
    expect(codeElement?.textContent).toContain('sun[dot]wil[at]northeastern[dot]edu')
  })

  it('external links open in new tab', () => {
    const { container } = renderWithProviders(<Home />)

    const externalLinks = Array.from(container.querySelectorAll('a')).filter(
      link => link.getAttribute('href')?.startsWith('http')
    )

    externalLinks.forEach(link => {
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    })
  })

  it('renders particle background', () => {
    const { container } = renderWithProviders(<Home />)

    // ParticleBackground should be rendered (via our mock)
    const particles = container.querySelector('[data-testid="particles"]')
    expect(particles).toBeInTheDocument()
  })
})
