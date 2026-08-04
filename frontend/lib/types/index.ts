export type AIModel = 'AuroVex 1.5 Lite' | 'AuroVex 1.5 Pro' | 'AuroVex 1 Fast' | 'AuroVex 1' | 'AuroVex 1.5' | 'Gemini Pro' | 'Claude 3.5 Sonnet' | 'GPT-4o';

export type AIMode = 
  | 'General AI'
  | 'Sales AI'
  | 'Support AI'
  | 'Marketing AI'
  | 'SEO AI'
  | 'HR AI'
  | 'Legal AI'
  | 'Finance AI'
  | 'Coding AI'
  | 'Research AI'
  | 'Writing AI';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  model?: AIModel;
  mode?: AIMode;
  reasoning?: string;
  toolsUsed?: string[];
  attachments?: string[];
  reactions?: {
    like?: boolean;
    dislike?: boolean;
  };
}

export interface Conversation {
  id: string;
  title: string;
  folder?: string;
  pinned: boolean;
  model: AIModel;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'owner' | 'admin' | 'member';
  organization: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: AIMode;
  systemPrompt: string;
  avatarIcon: string;
  status: 'active' | 'draft' | 'paused';
  tools: string[];
}

export interface KnowledgeDocument {
  id: string;
  name: string;
  fileType: 'PDF' | 'DOCX' | 'CSV' | 'TXT' | 'URL';
  size: string;
  chunksCount: number;
  uploadedAt: string;
  status: 'indexed' | 'processing' | 'error';
}
