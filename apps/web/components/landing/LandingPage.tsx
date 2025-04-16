import React from 'react';
import Link from 'next/link';
// Using heroicons for feature icons
import {
  ChatBubbleLeftRightIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'; // Use outline icons for a lighter feel

/**
 * Enhanced landing page component for EchoGlass.
 */
export default function LandingPage(): React.ReactNode {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-200 overflow-x-hidden">
      {/* Header Section */}
      <header className="py-4 px-6 md:px-10 flex justify-between items-center sticky top-0 z-50 bg-gray-900/70 backdrop-blur-lg border-b border-gray-800">
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-blue-400 transition-colors duration-300">EchoGlass</Link>
        </div>
        <nav className="hidden md:flex space-x-6 items-center text-gray-300">
          <Link href="#features" className="hover:text-blue-400 transition-colors duration-300">Features</Link>
          <Link href="#how-it-works" className="hover:text-blue-400 transition-colors duration-300">How it Works</Link>
          {/* <Link href="#faq" className="hover:text-blue-400 transition-colors">FAQ</Link> */}
        </nav>
        <div className="flex items-center space-x-3">
          <Link href="/login" className="px-4 py-2 rounded-md hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors duration-300">
            Log In
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold text-white">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section - Enhanced Layout & Style */}
        <section className="relative container mx-auto px-6 md:px-10 py-24 md:py-32 text-center flex flex-col items-center overflow-hidden">
          {/* Background Glow Effect (Subtle) */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">
            Hear the World Visually
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            EchoGlass provides instant transcription, contextual alerts, and environmental awareness directly in your browser.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup" className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg text-white shadow-lg hover:shadow-blue-500/50">
              Get Started Free
            </Link>
            <Link href="/app" className="px-8 py-3 border border-gray-700 bg-gray-800/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300 font-semibold text-lg text-gray-300 hover:text-white">
              Launch App
            </Link>
          </div>
        </section>

        {/* Features Section - Enhanced with Icons */}
        <section id="features" className="py-20 bg-gray-900/30 scroll-mt-16">
          <div className="container mx-auto px-6 md:px-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Why EchoGlass?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="bg-gray-800/60 p-6 rounded-lg shadow-lg border border-gray-700/50 transform transition-transform duration-300 hover:scale-105 hover:border-blue-500/50">
                <ChatBubbleLeftRightIcon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Instant Transcription</h3>
                <p className="text-gray-400">Follow conversations in real-time with highly accurate speech-to-text captions.</p>
              </div>
              {/* Feature Card 2 */}
              <div className="bg-gray-800/60 p-6 rounded-lg shadow-lg border border-gray-700/50 transform transition-transform duration-300 hover:scale-105 hover:border-blue-500/50">
                <EyeIcon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Contextual Awareness</h3>
                <p className="text-gray-400">Identify crucial environmental sounds and visual cues for enhanced safety.</p>
              </div>
              {/* Feature Card 3 */}
              <div className="bg-gray-800/60 p-6 rounded-lg shadow-lg border border-gray-700/50 transform transition-transform duration-300 hover:scale-105 hover:border-blue-500/50">
                <AdjustmentsHorizontalIcon className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Personalized Experience</h3>
                <p className="text-gray-400">Tailor language complexity, font size, and visual styles to your preferences.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - Refined */}
        <section id="how-it-works" className="py-20 container mx-auto px-6 md:px-10 scroll-mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Simple Setup, Instant Access</h2>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-gray-400 mb-8">
              Accessing EchoGlass is effortless. Launch it directly in your browser, grant microphone and camera permissions when prompted, and start experiencing enhanced situational awareness immediately.
            </p>
            {/* Placeholder for visual element/diagram */}
            <div className="h-40 bg-gray-800/30 rounded-lg flex items-center justify-center text-gray-500">
              [Visual representation placeholder - e.g., Steps diagram]
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-10 text-center text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} EchoGlass. All rights reserved.
      </footer>
    </div>
  );
} 