import React from 'react';
// Assuming heroicons is installed - add `npm install @heroicons/react` if not
import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

type AlertType = 'info' | 'warning' | 'error' | 'success';

interface ContextualAlertProps {
  message: string;
  type: AlertType;
  onClose?: () => void; // Optional close handler
}

// Mappings for styling and icons
const alertConfig = {
  info: {
    icon: InformationCircleIcon,
    baseClasses: "bg-blue-100 border-blue-400 text-blue-700",
    iconClasses: "text-blue-500",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    baseClasses: "bg-yellow-100 border-yellow-400 text-yellow-700",
    iconClasses: "text-yellow-500",
  },
  error: {
    icon: XCircleIcon,
    baseClasses: "bg-red-100 border-red-400 text-red-700",
    iconClasses: "text-red-500",
  },
  success: {
    icon: CheckCircleIcon,
    baseClasses: "bg-green-100 border-green-400 text-green-700",
    iconClasses: "text-green-500",
  },
};

/**
 * Displays contextual alerts with icons and optional close button.
 *
 * @param {ContextualAlertProps} props - Component properties.
 * @returns {React.ReactNode | null} The alert UI, or null if no message.
 */
const ContextualAlert: React.FC<ContextualAlertProps> = ({ message, type, onClose }) => {
  if (!message) {
    return null;
  }

  const config = alertConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={`flex items-center p-4 mb-4 border rounded text-sm ${config.baseClasses}`}
      role="alert"
    >
      <IconComponent className={`h-5 w-5 mr-3 ${config.iconClasses}`} aria-hidden="true" />
      <span className="flex-grow">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className={`ml-4 -mr-1 -my-1 p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 ${config.baseClasses} ${config.iconClasses}`}
          aria-label="Close alert"
        >
          <XMarkIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default ContextualAlert;
