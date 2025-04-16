import React from 'react';

interface DeviceStatusCardProps {
  // Props like device name, connection status, battery level could be passed here
  isDeviceConnected: boolean;
}

/**
 * Component to display the current status of the connected EchoGlass device.
 */
export default function DeviceStatusCard({ isDeviceConnected }: DeviceStatusCardProps): React.ReactNode {
  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Device Status</h2>
      <p>Status: {isDeviceConnected ? <span className="text-green-600">Connected</span> : <span className="text-red-600">Disconnected</span>}</p>
      {/* Future Additions: */}
      {/* <p>Battery: 85%</p> */}
      {/* <p>Signal Strength: Strong</p> */}
    </section>
  );
} 