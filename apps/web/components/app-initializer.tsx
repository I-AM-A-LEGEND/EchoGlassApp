'use client';

import React, { useEffect, useState } from 'react';
import { initializeTerminator } from '../lib/terminator';
import { initializeAgentKit } from '../lib/agentKit';

interface AppInitializerProps {
  children: React.ReactNode;
}

/**
 * A client component that handles application-level initializations.
 */
export default function AppInitializer({ children }: AppInitializerProps): React.ReactNode {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Prevent running initialization multiple times
    if (isInitialized) return;

    const initializeApp = async () => {
      console.log('AppInitializer: Starting initializations...');
      try {
        // Initialize Terminator (replace with actual config)
        await initializeTerminator();

        // Initialize AgentKit (replace with actual config)
        // Example config - fetch API key from env vars or config service
        const agentKitConfig = {
          apiKey: process.env.NEXT_PUBLIC_AGENTKIT_API_KEY || 'dummy-agentkit-key',
        };
        await initializeAgentKit(agentKitConfig);

        console.log('AppInitializer: Initializations completed.');
        setIsInitialized(true);
      } catch (error) {
        console.error('AppInitializer: Initialization failed:', error);
        // Handle initialization errors (e.g., show an error message)
      }
    };

    initializeApp();

    // No cleanup needed for these placeholder initializations
  }, [isInitialized]); // Depend on isInitialized to run only once

  // Optionally, render a loading state until initialized
  // if (!isInitialized) {
  //   return <div>Loading application...</div>;
  // }

  return <>{children}</>; // Render children once initialization starts/completes
} 