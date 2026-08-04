import { Suspense } from 'react';
import { ChatContainer } from '@/components/chat/ChatContainer';

export default function DashboardHomePage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-[#121214] flex items-center justify-center text-zinc-400">Loading chat...</div>}>
      <ChatContainer />
    </Suspense>
  );
}

