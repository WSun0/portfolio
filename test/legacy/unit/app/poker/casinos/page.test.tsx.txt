import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../../../utils'
import CasinosPage from '@/app/poker/casinos/page'

describe('Casinos Page', () => {
  it('renders the main heading', () => {
    renderWithProviders(<CasinosPage />)

    const heading = screen.getByRole('heading', { name: /Casinos I've Played Poker At/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders in-person casinos section', () => {
    renderWithProviders(<CasinosPage />)

    const heading = screen.getByRole('heading', { name: /In-Person Casinos/i })
    expect(heading).toBeInTheDocument()
  })

  it('lists all in-person casino locations', () => {
    renderWithProviders(<CasinosPage />)

    expect(screen.getByText(/Encore Boston Harbor/i)).toBeInTheDocument()
    expect(screen.getByText(/Parx Casino/i)).toBeInTheDocument()
    expect(screen.getByText(/Chasers Poker Room/i)).toBeInTheDocument()
    expect(screen.getByText(/Metro Casino/i)).toBeInTheDocument()
    expect(screen.getByText(/Caesars New Orleans/i)).toBeInTheDocument()
    expect(screen.getByText(/Playground Card Room/i)).toBeInTheDocument()
  })

  it('renders online poker rooms section', () => {
    renderWithProviders(<CasinosPage />)

    const heading = screen.getByRole('heading', { name: /Online Poker Rooms/i })
    expect(heading).toBeInTheDocument()
  })

  it('lists all online poker rooms', () => {
    renderWithProviders(<CasinosPage />)

    expect(screen.getByText('Club WPT Gold')).toBeInTheDocument()
    expect(screen.getByText('Ignition')).toBeInTheDocument()
    expect(screen.getByText('ACR')).toBeInTheDocument()
  })

  it('renders thoughts section', () => {
    renderWithProviders(<CasinosPage />)

    const heading = screen.getByRole('heading', { name: /Thoughts on Each Location/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders map description', () => {
    renderWithProviders(<CasinosPage />)

    expect(screen.getByText(/A map of where I have played poker in-person/i)).toBeInTheDocument()
  })

  it('renders poker map container', () => {
    const { container } = renderWithProviders(<CasinosPage />)

    // Verify map wrapper exists
    const mapWrapper = container.querySelector('[style*="height: 500px"]')
    expect(mapWrapper).toBeInTheDocument()
  })

  it('has proper list structure for casinos', () => {
    const { container } = renderWithProviders(<CasinosPage />)

    const lists = container.querySelectorAll('ul')
    expect(lists.length).toBeGreaterThanOrEqual(2) // At least in-person and online lists
  })
})
