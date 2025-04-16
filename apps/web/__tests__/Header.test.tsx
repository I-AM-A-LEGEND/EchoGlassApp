import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/header';

describe('Header Component', () => {
  beforeEach(() => {
    // Render the header before each test
    render(<Header />);
  });

  it('renders the brand name/logo', () => {
    // Check if the main brand link exists and has the correct text
    const brandLink = screen.getByRole('link', { name: /EchoGlass/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('renders the Home navigation link', () => {
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the Dashboard navigation link', () => {
    const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
  });
}); 