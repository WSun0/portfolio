import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../../utils'
import BlogPage from '@/app/blog/page'

describe('Blog Page', () => {
  it('renders the main heading', () => {
    renderWithProviders(<BlogPage />)

    const heading = screen.getByRole('heading', { name: /Blog/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders coming soon message', () => {
    renderWithProviders(<BlogPage />)

    expect(screen.getByText(/Coming soon/i)).toBeInTheDocument()
  })

  it('renders description text', () => {
    renderWithProviders(<BlogPage />)

    expect(screen.getByText(/personal thoughts/i)).toBeInTheDocument()
  })
})
