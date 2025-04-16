import React from 'react';
import LandingPage from '../components/landing/LandingPage';

/**
 * Renders the main landing page for EchoGlass.
 *
 * @returns {React.ReactNode} The landing page content.
 */
export default function HomePage(): React.ReactNode {
  // This page now only renders the static landing page component.
  // All dynamic app logic is moved to the /app route.
  return <LandingPage />;
}
