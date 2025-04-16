import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"; // Ensure global styles are imported
import AppInitializer from "../components/app-initializer"; // Import the initializer
// Remove Header import - it will be added to the app layout later
// import Header from "../components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EchoGlass - AI Lens for Hearing Impaired", // Update title slightly
  description: "Real-time captions, alerts, and context for the deaf and hard of hearing.", // Update description
};

/**
 * Root layout component for the application.
 * Applies global styles, font settings, and runs initializers.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components to render within the layout.
 * @returns {React.ReactNode} The root layout structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <html lang="en">
      {/* Apply base background and text color */}
      <body className={`${inter.className} bg-gray-100 text-gray-900 min-h-screen flex flex-col`}>
        {/* AppInitializer might be moved later depending on whether
            initialization is needed before authentication */}
        <AppInitializer>
          {/* Remove Header component from here */}
          {/* The main content area will render landing page or app layout */}
          {children}
        </AppInitializer>
      </body>
    </html>
  );
}
