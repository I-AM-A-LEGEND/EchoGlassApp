'use client'; // This component needs client-side interaction

import React from 'react';
import { useSettingsStore } from '../../stores/useSettingsStore';

type CaptionFontSize = 'Small' | 'Medium' | 'Large';

/**
 * Component to display and modify user settings.
 * Uses the useSettingsStore for state management.
 */
export default function SettingsPanel(): React.ReactNode {
  // Get state and actions from the Zustand store
  const {
    enableEmotionDetection,
    simplifyLanguage,
    captionFontSize,
    setEnableEmotionDetection,
    setSimplifyLanguage,
    setCaptionFontSize,
  } = useSettingsStore();

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCaptionFontSize(event.target.value as CaptionFontSize);
  };

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Settings</h2>
      <p className="text-gray-600 mb-3">Configure your EchoGlass experience.</p>

      <div className="space-y-3">
        <div>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4"
              checked={enableEmotionDetection}
              onChange={(e) => setEnableEmotionDetection(e.target.checked)}
            />
            Enable Emotion Detection (Visual Cue)
          </label>
        </div>
        <div>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4"
              checked={simplifyLanguage}
              onChange={(e) => setSimplifyLanguage(e.target.checked)}
            />
            Simplify Language (via AgentKit)
          </label>
        </div>
        <div>
          <label className="flex items-center">
            Caption Font Size:
            <select
              className="ml-2 border rounded p-1"
              value={captionFontSize}
              onChange={handleFontSizeChange}
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  );
} 