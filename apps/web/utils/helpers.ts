// helpers.ts - Shared utility functions
export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString();
}

// Shared utility functions for the frontend

/**
 * Example utility function: Formats a date string.
 *
 * @param {Date | string | number} dateInput - The date to format.
 * @param {string} [locale='en-US'] - The locale for formatting.
 * @returns {string} The formatted date string, or an empty string if input is invalid.
 */
export const formatDate = (
  dateInput: Date | string | number,
  locale: string = 'en-US'
): string => {
  try {
    const date = new Date(dateInput);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date input provided to formatDate:', dateInput);
      return '';
    }
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return ''; // Return empty string on error
  }
};

/**
 * Example utility function: Debounces a function call.
 *
 * @template T
 * @param {T} func - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {(...args: Parameters<T>) => void} A debounced version of the function.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}

// Add other shared utility functions here as needed
