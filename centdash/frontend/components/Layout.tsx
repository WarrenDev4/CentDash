// frontend/components/Layout.tsx
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto font-bold text-xl text-blue-600">
          RocketHigh
        </div>
      </nav>
      
      <main className="flex-grow max-w-6xl mx-auto w-full p-6">
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 text-sm mt-auto">
        &copy; {new Date().getFullYear()} RocketHigh. All rights reserved.
      </footer>
    </div>
  );
}