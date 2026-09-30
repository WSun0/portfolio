import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
describe('Notebook home', () => {
  it('shows an introduction while keeping social links on contact', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: 'william sun' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /linkedin|github/ })).not.toBeInTheDocument();
    expect(screen.queryByText(/expand the directory|recent writing|things worth keeping/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /email/ })).not.toBeInTheDocument();
  });
});
