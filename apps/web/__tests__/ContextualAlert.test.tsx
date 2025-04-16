import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContextualAlert from '../components/ContextualAlert';

describe('ContextualAlert Component', () => {
  it('renders the alert message', () => {
    render(<ContextualAlert message="Test Info Message" type="info" />);
    expect(screen.getByText('Test Info Message')).toBeInTheDocument();
  });

  it('renders the correct icon based on type', () => {
    const { rerender } = render(<ContextualAlert message="Test Info" type="info" />);
    // Check for info icon (actual check depends on how icons are implemented, e.g., SVG title/role)
    // This is a basic check based on the text, more robust checks might target SVG properties
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-100');

    rerender(<ContextualAlert message="Test Warning" type="warning" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-yellow-100');

    rerender(<ContextualAlert message="Test Error" type="error" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-100');

    rerender(<ContextualAlert message="Test Success" type="success" />);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-100');
  });

  it('does not render if message is empty', () => {
    const { container } = render(<ContextualAlert message="" type="info" />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });

  it('renders close button if onClose is provided', () => {
    const handleClose = jest.fn();
    render(<ContextualAlert message="Test Message" type="info" onClose={handleClose} />);
    expect(screen.getByLabelText('Close alert')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<ContextualAlert message="Test Message" type="warning" onClose={handleClose} />);
    const closeButton = screen.getByLabelText('Close alert');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not render close button if onClose is not provided', () => {
    render(<ContextualAlert message="Test Message" type="error" />);
    expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
  });
}); 