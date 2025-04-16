import React from 'react';

// Define the structure for an activity item
interface ActivityItem {
  id: number | string; // Allow string IDs if needed
  time: string;
  description: string;
}

interface ActivityLogProps {
  // Pass recent activity data as a prop
  activities: ActivityItem[];
}

/**
 * Component to display a log of recent activities (captions, alerts).
 */
export default function ActivityLog({ activities }: ActivityLogProps): React.ReactNode {
  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
      {activities.length > 0 ? (
        <ul className="space-y-2 list-disc list-inside">
          {activities.map(activity => (
            <li key={activity.id} className="text-sm text-gray-700">
              <span className="font-medium">{activity.time}:</span> {activity.description}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No recent activity logged.</p>
      )}
      {/* Potential future additions: Filtering, Load More button */}
    </section>
  );
} 