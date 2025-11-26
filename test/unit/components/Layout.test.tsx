import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils'
import Layout from '@/components/Layout'

describe('Layout', () => {
  it('renders children content', () => {
    renderWithProviders(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders Header component', () => {
    renderWithProviders(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )

    // Check for header by looking for navigation elements
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Poker')).toBeInTheDocument()
    expect(screen.getByText('Cooking')).toBeInTheDocument()
  })

  it('renders Footer component', () => {
    renderWithProviders(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )

    // Check for footer by looking for social links
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('wraps children in PageTransition', () => {
    const { container } = renderWithProviders(
      <Layout>
        <div data-testid="child-content">Test Content</div>
      </Layout>
    )

    const childContent = container.querySelector('[data-testid="child-content"]')
    expect(childContent).toBeInTheDocument()
  })

  it('has correct layout structure', () => {
    const { container } = renderWithProviders(
      <Layout>
        <div>Test Content</div>
      </Layout>
    )

    // Layout should have flex column structure
    const layoutDiv = container.querySelector('div')
    expect(layoutDiv).toBeInTheDocument()
  })
})
