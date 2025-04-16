import React from 'react';
import Header from '../../components/header'; // Adjust path as needed

/**
 * Layout for the main application section (routes under /app).
 * Includes the main navigation header.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  // Note: AppInitializer might live here instead of the root layout
  // if initialization should only happen for authenticated users.
  // For now, it remains in the root layout.

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      {/* Optional: App-specific footer */}
    </div>
  );
} 