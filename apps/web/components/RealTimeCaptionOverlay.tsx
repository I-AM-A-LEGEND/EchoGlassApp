'use client'; // Needs access to store hook

import React from 'react';
import { useSettingsStore } from '../stores/useSettingsStore';

interface RealTimeCaptionOverlayProps {
  // Props will be defined later, e.g., caption text, position, styling
  caption: string;
}

// Tailwind class mapping for font sizes
const fontSizeClasses = {
  Small: 'text-sm',
  Medium: 'text-lg',
  Large: 'text-xl',
};

/**
 * Renders the real-time caption overlay on the screen using Tailwind CSS.
 * Displays transcribed text and potentially contextual cues.
 *
 * @param {RealTimeCaptionOverlayProps} props - Component properties.
 * @returns {React.ReactNode | null} The caption overlay UI, or null if no caption.
 */
const RealTimeCaptionOverlay: React.FC<RealTimeCaptionOverlayProps> = ({ caption }) => {
  const captionFontSize = useSettingsStore((state) => state.captionFontSize);

  if (!caption) {
    return null; // Don't render if there's no caption
  }

  const sizeClass = fontSizeClasses[captionFontSize] || fontSizeClasses.Medium;

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 w-auto max-w-[90%] \
                 bg-black/70 text-white text-center \
                 px-4 py-2 rounded-md shadow-lg z-50 \
                 transition-all duration-300 ease-in-out ${sizeClass}`}
      role="status" // Indicate this is a status message area
      aria-live="polite" // Announce changes politely to screen readers
    >
      {caption}
    </div>
  );
};

export default RealTimeCaptionOverlay;
