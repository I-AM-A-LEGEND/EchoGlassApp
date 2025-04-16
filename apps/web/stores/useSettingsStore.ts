import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // Import persist middleware

type CaptionFontSize = 'Small' | 'Medium' | 'Large';

interface SettingsState {
  enableEmotionDetection: boolean;
  simplifyLanguage: boolean;
  captionFontSize: CaptionFontSize;
  setEnableEmotionDetection: (value: boolean) => void;
  setSimplifyLanguage: (value: boolean) => void;
  setCaptionFontSize: (value: CaptionFontSize) => void;
}

/**
 * Zustand store for managing user settings.
 * Includes persistence to localStorage.
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Initial state
      enableEmotionDetection: false,
      simplifyLanguage: true,
      captionFontSize: 'Medium',

      // Actions to update state
      setEnableEmotionDetection: (value) => set({ enableEmotionDetection: value }),
      setSimplifyLanguage: (value) => set({ simplifyLanguage: value }),
      setCaptionFontSize: (value) => set({ captionFontSize: value }),
    }),
    {
      name: 'echoglass-settings-storage', // Unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
); 