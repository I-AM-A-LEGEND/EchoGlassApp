import React from 'react';

interface RealTimeCaptionOverlayProps {
  // Props will be defined later, e.g., caption text, position, styling
  caption: string;
}

/**
 * Renders the real-time caption overlay on the screen using Tailwind CSS.
 * Displays transcribed text and potentially contextual cues.
 *
 * @param {RealTimeCaptionOverlayProps} props - Component properties.
 * @returns {React.ReactNode | null} The caption overlay UI, or null if no caption.
 */
const RealTimeCaptionOverlay: React.FC<RealTimeCaptionOverlayProps> = ({ caption }) => {
  if (!caption) {
    return null; // Don't render if there's no caption
  }

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-auto max-w-[90%] \
                 bg-black/70 text-white text-center text-lg \
                 px-4 py-2 rounded-md shadow-lg z-50 \
                 transition-opacity duration-300 ease-in-out"
      role="status" // Indicate this is a status message area
      aria-live="polite" // Announce changes politely to screen readers
    >
      {caption}
    </div>
  );
};

export default RealTimeCaptionOverlay;
