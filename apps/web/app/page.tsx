'use client'; // Mark as a Client Component

import React, { useState, useEffect } from 'react';
import Head from "next/head";
import RealTimeCaptionOverlay from '../components/RealTimeCaptionOverlay';
import ContextualAlert from '../components/ContextualAlert';
import useWebSocket from '../hooks/useWebSocket';
import { displayCaptionOverlay } from '../lib/terminator'; // Import the terminator function
import Link from 'next/link';

/**
 * Home page component for the EchoGlass application.
 * Displays initial content, caption overlay, and alerts.
 *
 * @returns {React.ReactNode} The home page content.
 */
export default function HomePage(): React.ReactNode {
  // State for captions and alerts
  const [caption, setCaption] = useState<string>('Waiting for audio...'); // Initial caption
  const [alert, setAlert] = useState<{ message: string; type: 'info' | 'warning' | 'error' | 'success' } | null>(null);

  // --- WebSocket Integration ---
  const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080'; // Use environment variable or default
  const { lastMessage, isConnected, error, sendMessage } = useWebSocket(WS_URL);

  useEffect(() => {
    if (lastMessage) {
      console.log('Received WebSocket message:', lastMessage);
      if (typeof lastMessage === 'object' && lastMessage !== null) {
        if (lastMessage.type === 'caption' && typeof lastMessage.text === 'string') {
          const newCaption = lastMessage.text;
          setCaption(newCaption);
          // Call Terminator function to update desktop overlay (placeholder)
          displayCaptionOverlay(newCaption);
        } else if (lastMessage.type === 'alert') {
          setAlert({ message: lastMessage.message || 'Invalid alert format', type: lastMessage.alertType || 'info' });
          // Optional: Auto-clear alert after some time
          // setTimeout(() => setAlert(null), 5000);
        } else {
          // Handle other message types or formats
        }
      } else {
        // Handle non-object messages (e.g., plain text)
        const textCaption = String(lastMessage);
        setCaption(textCaption);
        displayCaptionOverlay(textCaption); // Also update overlay for plain text
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (error) {
      console.error("WebSocket Error:", error);
      setAlert({ message: 'WebSocket connection error. Please check the console.', type: 'error' });
    }
  }, [error]);

  useEffect(() => {
    // Display connection status
    if (isConnected) {
      setAlert({ message: 'WebSocket connected.', type: 'success' });
      setTimeout(() => setAlert(null), 3000);
    } else {
      // Optional: Show disconnected status if needed, might be noisy
      // setAlert({ message: 'WebSocket disconnected.', type: 'warning' });
    }
  }, [isConnected]);
  // --- End WebSocket Integration ---

  // Function to close the alert
  const handleCloseAlert = () => {
    setAlert(null);
  };

  // Example function to send a message via WebSocket (for testing)
  const sendTestMessage = () => {
    sendMessage({ type: 'test', payload: 'Hello from client!' });
  };

  return (
    <>
      <Head>
        <title>EchoGlass - {isConnected ? 'Connected' : 'Disconnected'}</title>
      </Head>
      <div className="container mx-auto p-4 relative min-h-screen flex flex-col">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">EchoGlass</h1>
          <p className="text-sm text-gray-600 mb-2">Real-time AI Lens ({isConnected ? <span className="text-green-600">Connected</span> : <span className="text-red-600">Disconnected</span>})</p>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Go to Dashboard
          </Link>
        </header>

        <div className="flex-grow">
          {/* Contextual Alert Display */} 
          {alert && (
            <div className="mb-4">
                <ContextualAlert
                    message={alert.message}
                    type={alert.type}
                    onClose={handleCloseAlert}
                />
            </div>
          )}

          {/* Placeholder for Main Content/Dashboard */}
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p>Main application content area.</p>
            <button onClick={sendTestMessage} disabled={!isConnected} className="mt-2 px-3 py-1 bg-purple-500 text-white rounded disabled:opacity-50">
                Send Test WS Message
            </button>
          </div>
        </div>


        {/* Real-time Caption Overlay (Stays fixed at bottom) */}
        <RealTimeCaptionOverlay caption={caption} />

      </div>
    </>
  );
}
