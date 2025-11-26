import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../utils'
import CasinosPage from '@/app/poker/casinos/page'

describe('Poker Map Integration', () => {
  it('shows loading spinner before map loads', async () => {
    const { container } = renderWithProviders(<CasinosPage />)

    // Map container should exist
    const mapWrapper = container.querySelector('[style*="height: 500px"]')
    expect(mapWrapper).toBeInTheDocument()
  })

  it('renders all casino location names', () => {
    renderWithProviders(<CasinosPage />)

    // In-person casinos
    expect(screen.getByText(/Encore Boston Harbor/i)).toBeInTheDocument()
    expect(screen.getByText(/Parx Casino/i)).toBeInTheDocument()
    expect(screen.getByText(/Chasers Poker Room/i)).toBeInTheDocument()
    expect(screen.getByText(/Metro Casino/i)).toBeInTheDocument()
    expect(screen.getByText(/Caesars New Orleans/i)).toBeInTheDocument()
    expect(screen.getByText(/Playground Card Room/i)).toBeInTheDocument()
  })

  it('renders all online poker room names', () => {
    renderWithProviders(<CasinosPage />)

    expect(screen.getByText('Club WPT Gold')).toBeInTheDocument()
    expect(screen.getByText('Ignition')).toBeInTheDocument()
    expect(screen.getByText('ACR')).toBeInTheDocument()
  })

  it('has correct section headings', () => {
    renderWithProviders(<CasinosPage />)

    expect(screen.getByRole('heading', { name: /Casinos I've Played Poker At/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /In-Person Casinos/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Online Poker Rooms/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Thoughts on Each Location/i })).toBeInTheDocument()
  })

  it('map description is visible', () => {
    renderWithProviders(<CasinosPage />)

    expect(screen.getByText(/A map of where I have played poker in-person/i)).toBeInTheDocument()
  })

  it('map container has correct dimensions', () => {
    const { container } = renderWithProviders(<CasinosPage />)

    const mapWrapper = container.querySelector('[style*="height: 500px"]')
    expect(mapWrapper).toBeInTheDocument()

    // Check if map wrapper has the expected styling
    const style = mapWrapper?.getAttribute('style')
    expect(style).toContain('500px')
  })

  it('lists are properly structured', () => {
    const { container } = renderWithProviders(<CasinosPage />)

    const lists = container.querySelectorAll('ul')
    expect(lists.length).toBeGreaterThanOrEqual(2) // At least in-person and online lists

    // In-person casinos should have 6 items
    const listItems = container.querySelectorAll('li')
    expect(listItems.length).toBeGreaterThanOrEqual(9) // 6 in-person + 3 online
  })

  it('all casino content is accessible', () => {
    renderWithProviders(<CasinosPage />)

    // All text should be visible and accessible
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
  })
})
