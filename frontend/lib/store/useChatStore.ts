import { create } from 'zustand';
import { AIModel, AIMode, ChatMessage, Conversation } from '../types';

interface ChatStore {
  selectedModel: AIModel;
  selectedMode: AIMode;
  webSearchEnabled: boolean;
  deepThinkEnabled: boolean;
  conversations: Conversation[];
  activeChatId: string | null;
  searchQuery: string;
  isStreaming: boolean;
  sidebarOpen: boolean;
  
  setSelectedModel: (model: AIModel) => void;
  setSelectedMode: (mode: AIMode) => void;
  toggleWebSearch: () => void;
  toggleDeepThink: () => void;
  setSearchQuery: (query: string) => void;
  setActiveChatId: (id: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
  createNewChat: () => string;
  sendMessage: (content: string, attachments?: string[]) => Promise<void>;
  togglePinChat: (id: string) => void;
  deleteChat: (id: string) => void;
}

const mockInitialConversations: Conversation[] = [
  {
    id: 'chat-1',
    title: 'Q3 Sales Strategy & Automated Outreach',
    pinned: true,
    model: 'AuroVex 1.5',
    createdAt: 'Today',
    updatedAt: '10:42 AM',
    messages: [
      {
        id: 'm1',
        role: 'user',
        content: 'Draft an automated sales outreach funnel for enterprise clients targeting lead generation.',
        timestamp: '10:40 AM',
      },
      {
        id: 'm2',
        role: 'assistant',
        content: `Here is a high-converting 4-step B2B Enterprise Outreach Sequence built with AuromindAI Sales Agent:\n\n### Step 1: Initial Value Signal\n**Subject**: Scaling lead conversion for {Company_Name}\n**Body**: Hi {First_Name},\nWe observed your recent expansion into high-growth sales pipelines. AuromindAI Sales Agents automate initial contact qualification 24/7 with zero latency.\n\n### Step 2: Interactive Demo Invitation\n**Subject**: Quick demo on automated sales agents?\n**Body**: Would you be open to a 5-minute interactive walkthrough showing how our agents deliver a 3.4x ROI?\n\n\`\`\`json\n{\n  "agent": "Auromind Sales Bot",\n  "status": "ready",\n  "channels": ["Email", "LinkedIn", "WebChat"]\n}\n\`\`\``,
        timestamp: '10:41 AM',
        model: 'AuroVex 1.5',
        mode: 'Sales AI',
        reasoning: 'Analyzed enterprise sales benchmarks and multi-channel email templates.',
        toolsUsed: ['Web Search', 'Sales Benchmark Engine'],
      },
    ],
  },
  {
    id: 'chat-2',
    title: 'Customer Support SLA Automation',
    pinned: false,
    model: 'AuroVex 1',
    createdAt: 'Yesterday',
    updatedAt: '3:15 PM',
    messages: [],
  },
];

export const useChatStore = create<ChatStore>((set, get) => ({
  selectedModel: 'AuroVex 1 Fast',
  selectedMode: 'General AI',
  webSearchEnabled: true,
  deepThinkEnabled: false,
  conversations: mockInitialConversations,
  activeChatId: null,
  searchQuery: '',
  isStreaming: false,
  sidebarOpen: false,

  setSelectedModel: (model) => set({ selectedModel: model }),
  setSelectedMode: (mode) => set({ selectedMode: mode }),
  toggleWebSearch: () => set((state) => ({ webSearchEnabled: !state.webSearchEnabled })),
  toggleDeepThink: () => set((state) => ({ deepThinkEnabled: !state.deepThinkEnabled })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveChatId: (id) => set({ activeChatId: id }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  createNewChat: () => {
    const newId = `chat-${Date.now()}`;
    const newChat: Conversation = {
      id: newId,
      title: 'New Conversation',
      pinned: false,
      model: get().selectedModel,
      createdAt: 'Just now',
      updatedAt: 'Just now',
      messages: [],
    };
    set((state) => ({
      conversations: [newChat, ...state.conversations],
      activeChatId: newId,
    }));
    return newId;
  },

  sendMessage: async (content: string, attachments?: string[]) => {
    const { activeChatId, conversations, selectedModel, selectedMode, deepThinkEnabled, webSearchEnabled } = get();
    let currentId = activeChatId;
    if (!currentId) {
      currentId = get().createNewChat();
    }

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments,
    };

    // Update conversation with user message
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === currentId
          ? {
              ...c,
              title: c.messages.length === 0 ? content.slice(0, 32) + '...' : c.title,
              messages: [...c.messages, userMessage],
              updatedAt: 'Just now',
            }
          : c
      ),
      isStreaming: true,
    }));

    const botResponseId = `bot-${Date.now()}`;
    const botResponse: ChatMessage = {
      id: botResponseId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: selectedModel,
      mode: selectedMode,
    };

    // Add empty assistant response bubble to begin stream
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === currentId
          ? {
              ...c,
              messages: [...c.messages, botResponse],
            }
          : c
      ),
    }));

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const response = await fetch(`${API_URL}/api/v1/chats/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          model: selectedModel,
          mode: selectedMode,
          web_search: webSearchEnabled,
          deep_think: deepThinkEnabled,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let streamedContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          
          // Parse Server Sent Events format
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const text = line.slice(6);
              streamedContent += text;

              // Dynamically update the streaming text content in Zustand
              set((state) => ({
                conversations: state.conversations.map((c) =>
                  c.id === currentId
                    ? {
                        ...c,
                        messages: c.messages.map((m) =>
                          m.id === botResponseId
                            ? { ...m, content: streamedContent }
                            : m
                        ),
                      }
                    : c
                ),
              }));
            }
          }
        }
      }
    } catch (error) {
      console.error("Streaming error:", error);
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === currentId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === botResponseId
                    ? { ...m, content: `Error communicating with Gemini: ${(error as any).message}` }
                    : m
                ),
              }
            : c
        ),
      }));
    } finally {
      set({ isStreaming: false });
    }
  },

  togglePinChat: (id) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, pinned: !c.pinned } : c
      ),
    }));
  },

  deleteChat: (id) => {
    set((state) => {
      const filtered = state.conversations.filter((c) => c.id !== id);
      return {
        conversations: filtered,
        activeChatId: state.activeChatId === id ? (filtered[0]?.id || null) : state.activeChatId,
      };
    });
  },
}));
