import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('renders social links', () => {
    renderWithProviders(<Footer />)

    const linkedInLink = screen.getByText('LinkedIn')
    const githubLink = screen.getByText('GitHub')

    expect(linkedInLink).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
  })

  it('social links have correct hrefs', () => {
    renderWithProviders(<Footer />)

    const linkedInLink = screen.getByText('LinkedIn').closest('a')
    const githubLink = screen.getByText('GitHub').closest('a')

    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/william1sun/')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/wsun0')
  })

  it('social links open in new tab', () => {
    renderWithProviders(<Footer />)

    const linkedInLink = screen.getByText('LinkedIn').closest('a')
    const githubLink = screen.getByText('GitHub').closest('a')

    expect(linkedInLink).toHaveAttribute('target', '_blank')
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders copyright with current year', () => {
    renderWithProviders(<Footer />)

    const currentYear = new Date().getFullYear()
    const copyright = screen.getByText(`© ${currentYear} William Sun`)

    expect(copyright).toBeInTheDocument()
  })

  it('renders separator between social links', () => {
    renderWithProviders(<Footer />)

    const separators = screen.getAllByText('·')
    expect(separators.length).toBeGreaterThan(0)
  })
})
