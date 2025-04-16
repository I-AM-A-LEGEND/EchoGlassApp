'use client'; // Required because SettingsPanel uses hooks

import React, { useState, useEffect, useCallback } from 'react';
import DeviceStatusCard from '../../components/dashboard/DeviceStatusCard';
import SettingsPanel from '../../components/dashboard/SettingsPanel';
import ActivityLog from '../../components/dashboard/ActivityLog';
import { useSettingsStore } from '../../stores/useSettingsStore'; // Import settings store
import { simplifyText } from '../../lib/agentKit'; // Import AgentKit function
import useWebSocket from '../../hooks/useWebSocket'; // Import WebSocket hook
import { displayCaptionOverlay } from '../../lib/terminator'; // Import Terminator function

// Define structure for activity items
interface ActivityItem {
  id: string; // Use timestamp + random for unique ID
  time: string;
  description: string;
  type: 'caption' | 'alert' | 'status';
}

/**
 * Main application page component for EchoGlass.
 * Orchestrates the display of dashboard sections.
 *
 * @returns {React.ReactNode} The main app page content.
 */
export default function AppPage(): React.ReactNode {
  // State for dynamic data
  const [isDeviceConnected, setIsDeviceConnected] = useState(false); // Default to false
  const [activityLog, setActivityLog] = useState<ActivityItem[]>([]);
  // State to hold the text content destined for the overlay
  const [currentCaptionForOverlay, setCurrentCaptionForOverlay] = useState<string>('Initializing...');

  // Get settings from Zustand store
  const simplifyLanguageEnabled = useSettingsStore((state) => state.simplifyLanguage);

  // WebSocket connection
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
  const { lastMessage, isConnected, error } = useWebSocket(WS_URL);

  // Helper to add items to activity log (prepends, limits size)
  const addActivity = useCallback((item: Omit<ActivityItem, 'id'>) => {
    setActivityLog(prevLog => [
      { ...item, id: `${Date.now()}-${Math.random()}` }, // Add unique ID
      ...prevLog.slice(0, 49), // Keep max 50 items
    ]);
  }, []);

  // Effect to handle WebSocket messages
  useEffect(() => {
    if (lastMessage) {
      console.log('AppPage: Received WebSocket message:', lastMessage);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (typeof lastMessage === 'object' && lastMessage !== null) {
        if (lastMessage.type === 'caption' && typeof lastMessage.text === 'string') {
          let captionText = lastMessage.text;
          // Simplify if enabled
          if (simplifyLanguageEnabled) {
            simplifyText(captionText, 'user-id-placeholder') // Replace with actual user ID
              .then(simplified => {
                setCurrentCaptionForOverlay(simplified);
                displayCaptionOverlay(simplified);
                addActivity({ time, description: `Caption: "${simplified}"`, type: 'caption' });
              })
              .catch(err => {
                console.error("Simplification failed:", err);
                // Fallback to original text
                setCurrentCaptionForOverlay(captionText);
                displayCaptionOverlay(captionText);
                addActivity({ time, description: `Caption: "${captionText}"`, type: 'caption' });
              });
          } else {
            // Use original text if simplification disabled
            setCurrentCaptionForOverlay(captionText);
            displayCaptionOverlay(captionText);
            addActivity({ time, description: `Caption: "${captionText}"`, type: 'caption' });
          }
        } else if (lastMessage.type === 'alert') {
          const alertMessage = lastMessage.message || 'Unknown alert';
          addActivity({ time, description: `Alert: ${alertMessage}`, type: 'alert' });
          // Optionally show this in ContextualAlert as well
        } else {
          console.warn('AppPage: Received unknown message structure:', lastMessage);
        }
      } else {
        // Handle plain text as caption
        const textCaption = String(lastMessage);
        setCurrentCaptionForOverlay(textCaption);
        displayCaptionOverlay(textCaption);
        addActivity({ time, description: `Caption: "${textCaption}"`, type: 'caption' });
      }
    }
  }, [lastMessage, simplifyLanguageEnabled, addActivity]);

  // Effect to handle connection status changes and update overlay status
  useEffect(() => {
    setIsDeviceConnected(isConnected);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let statusCaption = currentCaptionForOverlay; // Keep current caption unless changing status

    if (isConnected && !activityLog.some(item => item.description === 'System Connected')) {
      statusCaption = 'Connected. Waiting for audio...';
      addActivity({ time, description: 'System Connected', type: 'status' });
    } else if (!isConnected && !error && !activityLog.some(item => item.description === 'System Disconnected')) {
       statusCaption = 'Disconnected. Attempting to reconnect...';
       addActivity({ time, description: 'System Disconnected', type: 'status' });
    } else if (error && !isConnected) {
      statusCaption = 'Connection Error!';
      // Optionally add error to activity log if not already present
      if (!activityLog.some(item => item.description.includes('Connection Error'))) {
         addActivity({ time, description: 'System Connection Error', type: 'status' });
      }
    }

    // Only update state and overlay if the status text changes
    if (statusCaption !== currentCaptionForOverlay) {
        setCurrentCaptionForOverlay(statusCaption);
        displayCaptionOverlay(statusCaption);
    }

  }, [isConnected, error, addActivity, currentCaptionForOverlay, activityLog]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">EchoGlass App</h1>

      {/* Use the specific components */}
      <DeviceStatusCard isDeviceConnected={isDeviceConnected} />
      <SettingsPanel />
      <ActivityLog activities={activityLog} />

    </div>
  );
} 