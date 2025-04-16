import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppPage from '../app/app/page';

// Mock the child components since they are tested separately
// and SettingsPanel uses Zustand which requires more setup for testing
jest.mock('../../components/dashboard/DeviceStatusCard', () => ({
  __esModule: true,
  default: ({ isDeviceConnected }: { isDeviceConnected: boolean }) => (
    <div>Mock Device Status: {isDeviceConnected ? 'Connected' : 'Disconnected'}</div>
  ),
}));
jest.mock('../../components/dashboard/SettingsPanel', () => ({
  __esModule: true,
  default: () => <div>Mock Settings Panel</div>,
}));
jest.mock('../../components/dashboard/ActivityLog', () => ({
  __esModule: true,
  default: ({ activities }: { activities: any[] }) => (
    <div>Mock Activity Log ({activities.length} items)</div>
  ),
}));

describe('AppPage Component', () => {
  beforeEach(() => {
    render(<AppPage />);
  });

  it('renders the main App heading', () => {
  it('renders the main Dashboard heading', () => {
    expect(screen.getByRole('heading', { name: /Dashboard/i, level: 1 })).toBeInTheDocument();
  });

  // Check if the mocked components are rendered
  it('renders the mock Device Status component', () => {
    expect(screen.getByText(/Mock Device Status/i)).toBeInTheDocument();
  });

  it('renders the mock Settings Panel component', () => {
    expect(screen.getByText(/Mock Settings Panel/i)).toBeInTheDocument();
  });

  it('renders the mock Activity Log component', () => {
    // Check text that includes the number of items based on default state
    expect(screen.getByText(/Mock Activity Log \(3 items\)/i)).toBeInTheDocument();
  });
}); 