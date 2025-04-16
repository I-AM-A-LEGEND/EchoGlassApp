import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../app/page';

// Mock the useWebSocket hook to control its return values in tests
jest.mock('../hooks/useWebSocket', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isConnected: false, // Default mock state
    lastMessage: null,
    error: null,
    sendMessage: jest.fn(),
  })),
}));

// Mock the Header component as it's complex and tested separately
jest.mock('../components/header', () => ({
    __esModule: true,
    default: () => <header>Mock Header</header>,
}));

// Mock the components rendered within HomePage that might interfere
jest.mock('../components/RealTimeCaptionOverlay', () => ({
    __esModule: true,
    default: ({ caption }: { caption: string }) => <div>Mock Overlay: {caption}</div>,
}));
jest.mock('../components/ContextualAlert', () => ({
    __esModule: true,
    default: ({ message }: { message: string }) => <div>Mock Alert: {message}</div>,
}));

describe('HomePage Component', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /EchoGlass/i })).toBeInTheDocument();
  });

  it('renders connection status initially as disconnected (based on mock)', () => {
    render(<HomePage />);
    expect(screen.getByText(/Disconnected/i)).toBeInTheDocument();
    // Check that the test WS message button is disabled
    expect(screen.getByRole('button', { name: /Send Test WS Message/i})).toBeDisabled();
  });

  // You could add more tests here, for example, mocking a connection
  // and checking if the status text updates and button becomes enabled.
}); 