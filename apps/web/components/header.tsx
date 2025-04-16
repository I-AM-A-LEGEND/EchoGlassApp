import React from 'react';
import Link from 'next/link';

/**
 * Basic header component with navigation links.
 */
export default function Header(): React.ReactNode {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          EchoGlass
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
            Dashboard
          </Link>
          {/* Add other links like Settings, Profile etc. later */}
        </div>
      </nav>
    </header>
  );
} 