'use client'; // Required because SettingsPanel uses hooks

import React, { useState } from 'react'; // useState for example data
import DeviceStatusCard from '../../components/dashboard/DeviceStatusCard';
import SettingsPanel from '../../components/dashboard/SettingsPanel';
import ActivityLog from '../../components/dashboard/ActivityLog';

/**
 * Dashboard page component for EchoGlass.
 * Orchestrates the display of dashboard sections.
 *
 * @returns {React.ReactNode} The dashboard page content.
 */
export default function DashboardPage(): React.ReactNode {
  // --- Example Data (could come from props, API, or another store) ---
  const [isDeviceConnected, setIsDeviceConnected] = useState(true);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, time: '10:32 AM', description: 'Caption: "Hello there!"' },
    { id: 2, time: '10:31 AM', description: 'Alert: Loud Noise Detected' },
    { id: 3, time: '10:30 AM', description: 'Caption: "Meeting starting soon."' },
  ]);
  // In a real app, isDeviceConnected and recentActivity would likely be managed
  // by a WebSocket connection or fetched data, potentially using another store or context.
  // ---------------------------------------------------------------------

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Use the specific components */}
      <DeviceStatusCard isDeviceConnected={isDeviceConnected} />
      <SettingsPanel />
      <ActivityLog activities={recentActivity} />

    </div>
  );
} 