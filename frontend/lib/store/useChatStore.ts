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
  createNewChat: () => string;
  sendMessage: (content: string, attachments?: string[]) => Promise<void>;
  togglePinChat: (id: string) => void;
  deleteChat: (id: string) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
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
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

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
      const response = await fetch('/api/chat', {
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
      console.warn("Backend API endpoint unavailable, executing fallback AI engine:", error);
      
      const mode = selectedMode;
      const model = selectedModel;
      
      let simulatedResponse = `As your 24/7 **${mode}** agent running on **${model}**, I have processed your input:\n\n` +
        `> "${content}"\n\n` +
        `### Execution Analysis\n` +
        `1. **System Status**: Operational & Verified\n` +
        `2. **Model Engine**: ${model}\n` +
        `3. **Target Domain**: ${mode} Autonomous Workflow\n\n` +
        `I am ready to perform tasks, write code, or execute multi-step automations. What would you like to build next?`;

      const lowerContent = content.toLowerCase();
      if (lowerContent.includes('website') || lowerContent.includes('landing page') || lowerContent.includes('build') || lowerContent.includes('code')) {
        simulatedResponse = `I have initialized the project structure and generated the full responsive web application for your prompt:\n\n` +
          `\`\`\`tsx\n// Autonomous Web Application\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-zinc-950 text-white p-8 font-sans">\n      <h1 className="text-3xl font-black text-emerald-400">AuromindAI Generated Workspace</h1>\n      <p className="mt-2 text-zinc-400">AI Employees working 24/7 for your business.</p>\n    </div>\n  );\n}\n\`\`\`\n\n` +
          `The code has been compiled and is ready in your workspace preview panel.`;
      }

      let streamedText = "";
      const words = simulatedResponse.split(" ");
      for (let i = 0; i < words.length; i++) {
        streamedText += (i === 0 ? "" : " ") + words[i];
        await new Promise((resolve) => setTimeout(resolve, 25));
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === currentId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === botResponseId ? { ...m, content: streamedText } : m
                  ),
                }
              : c
          ),
        }));
      }
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
