import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="p-4 bg-gray-100 min-h-screen">
      <nav className="mb-4 text-lg font-semibold">Dashboard</nav>
      {children}
    </section>
  );
}
