import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Owner Admin - Leads & Users Dashboard | Auromind',
  description: 'Executive portal for inbound eCommerce & Real Estate leads, conversion metrics, and user sign-in audit.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen bg-[#121214] text-zinc-100 flex flex-col overflow-hidden antialiased">
      {children}
    </div>
  );
}
