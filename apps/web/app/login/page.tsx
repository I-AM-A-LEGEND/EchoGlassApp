import React from 'react';
import Link from 'next/link';

/**
 * Basic Login Page component.
 */
export default function LoginPage(): React.ReactNode {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Log In to EchoGlass</h1>
        {/* Placeholder for Login Form - Add form elements later */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input type="email" id="email" name="email" required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input type="password" id="password" name="password" required className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account? <Link href="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
        </p>
        <p className="text-center text-gray-400 text-sm mt-2">
          <Link href="/" className="text-blue-400 hover:underline">Back to Home</Link>
        </p>
      </div>
    </div>
  );
} 