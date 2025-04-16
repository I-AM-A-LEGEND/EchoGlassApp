import React from 'react';
import Link from 'next/link';

/**
 * Basic header component with navigation links.
 */
export default function Header(): React.ReactNode {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand Link to landing page */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          EchoGlass
        </Link>

        {/* Navigation Links for within the app */}
        <div className="space-x-4">
          <Link href="/app" className="text-gray-600 hover:text-blue-600">
            App Home
          </Link>
          {/* Add other app-specific links like Settings, Profile etc. later */}
          {/* Maybe a logout button here as well */}
        </div>
      </nav>
    </header>
  );
} 