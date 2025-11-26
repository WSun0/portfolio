import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../../utils'
import CookingPage from '@/app/cooking/page'

describe('Cooking Page', () => {
  it('renders the main heading', () => {
    renderWithProviders(<CookingPage />)

    const heading = screen.getByRole('heading', { name: /Cooking/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders introduction text', () => {
    renderWithProviders(<CookingPage />)

    expect(screen.getByText(/home-cooked meals and special occasions/i)).toBeInTheDocument()
  })

  it('renders all cooking adventure links', () => {
    renderWithProviders(<CookingPage />)

    expect(screen.getByRole('link', { name: /First Time Cooking Wagyu 2025/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Christmas Dinner 2024/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /SF Pier Farmer's Market Breakfast 2023/i })).toBeInTheDocument()
  })

  it('cooking adventure links have correct hrefs', () => {
    renderWithProviders(<CookingPage />)

    const wagyuLink = screen.getByRole('link', { name: /First Time Cooking Wagyu 2025/i })
    const christmasLink = screen.getByRole('link', { name: /Christmas Dinner 2024/i })
    const sfLink = screen.getByRole('link', { name: /SF Pier Farmer's Market Breakfast 2023/i })

    expect(wagyuLink).toHaveAttribute('href', '/cooking/first-time-cooking-wagyu-2025')
    expect(christmasLink).toHaveAttribute('href', '/cooking/christmas-dinner')
    expect(sfLink).toHaveAttribute('href', '/cooking/sf-pier-farmers-market-breakfast-2023')
  })

  it('has proper list structure', () => {
    const { container } = renderWithProviders(<CookingPage />)

    const list = container.querySelector('ul')
    expect(list).toBeInTheDocument()

    const listItems = container.querySelectorAll('li')
    expect(listItems.length).toBe(3) // Three cooking adventures
  })
})
