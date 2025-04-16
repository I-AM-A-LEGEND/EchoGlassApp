import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"; // Ensure global styles are imported
import AppInitializer from "../components/app-initializer"; // Import the initializer
import Header from "../components/header"; // Import the Header component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EchoGlass",
  description: "AI Lens for the Deaf and Hard of Hearing",
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
        {/* Wrap children with the initializer component */}
        <AppInitializer>
          <Header />
          <main className="flex-grow container mx-auto p-4">{children}</main>
        </AppInitializer>
      </body>
    </html>
  );
}
