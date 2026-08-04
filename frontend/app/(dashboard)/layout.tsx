import React from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { Sidebar } from '@/components/chat/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-[#121214] flex flex-col antialiased overflow-hidden">
      {/* Top Fixed Header Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Dynamic Page View Area */}
        <main className="flex-1 flex flex-col bg-[#121214] overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
