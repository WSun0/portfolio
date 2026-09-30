import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
describe('Notebook home', () => {
  it('shows an introduction and the requested social destinations', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'william sun' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/ })).toHaveAttribute('href', 'https://www.linkedin.com/in/william1sun/');
    expect(screen.getByRole('link', { name: /github/ })).toHaveAttribute('href', 'https://github.com/WSun0');
    expect(screen.queryByText(/expand the directory|recent writing|things worth keeping/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /email/ })).not.toBeInTheDocument();
  });
});
