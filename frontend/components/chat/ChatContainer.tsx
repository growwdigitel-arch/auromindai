'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Brain, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Volume2, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown, 
  Wrench, 
  User, 
  Laptop, 
  Globe, 
  Mic, 
  Link as LinkIcon, 
  Figma, 
  ArrowUp, 
  ShoppingBag, 
  Layout, 
  BarChart3, 
  Palette, 
  Smartphone,
  ChevronRight,
  X,
  FileText,
  Upload,
  Zap,
  Database,
  Server
} from 'lucide-react';
import { useChatStore } from '@/lib/store/useChatStore';
import { ChatMessage } from '@/lib/types';
import { getMockPageHtml } from '@/lib/templates';
import { ChatInput } from './ChatInput';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });


export function ChatContainer() {
  const { conversations, activeChatId, setActiveChatId, isStreaming, sendMessage, createNewChat } = useChatStore();
  const currentChat = conversations.find((c) => c.id === activeChatId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewTab, setPreviewTab] = useState<'preview' | 'code'>('preview');
  const [selectedFile, setSelectedFile] = useState('src/App.tsx');
  const [loadingStep, setLoadingStep] = useState(0);

  const messages = currentChat?.messages || [];

  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
  const userPrompt = lastUserMsg?.content || '';
  const lastBotMsg = [...messages].reverse().find(m => m.role === 'assistant');
  const botContent = lastBotMsg?.content || '';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pending = localStorage.getItem('pending_prompt');
      if (pending) {
        localStorage.removeItem('pending_prompt');
        // Create chat first so activeChatId is set before sendMessage renders
        const newId = createNewChat();
        sendMessage(pending);
        router.replace(`/dashboard?id=${newId}`);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Synchronize active chat ID with URL query param '?id='
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      if (id !== activeChatId) {
        const exists = conversations.some((c) => c.id === id);
        if (exists) {
          setActiveChatId(id);
        }
      }
    } else {
      if (activeChatId !== null) {
        router.replace(`/dashboard?id=${activeChatId}`);
      }
    }
  }, [searchParams, activeChatId, conversations, setActiveChatId, router]);

  // Close and reset workspace preview panel when switching chats in the sidebar
  useEffect(() => {
    setPreviewOpen(false);
    setPreviewLoading(false);
    setPreviewTab('preview');
  }, [activeChatId]);

  // Monitor messages to detect website creation prompts
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'user') {
        const text = lastMsg.content.toLowerCase();
        if (text.includes('website') || text.includes('landing page') || text.includes('portfolio') || text.includes('preview')) {
          setPreviewOpen(true);
          setPreviewLoading(true);
          setLoadingStep(0);
        }
      }
    }
  }, [messages]);

  // Loading simulation steps
  useEffect(() => {
    if (previewLoading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= 4) {
            clearInterval(interval);
            setTimeout(() => setPreviewLoading(false), 800); // end loading
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [previewLoading]);

  return (
    <div className="flex-1 flex overflow-hidden bg-[#121214] text-white font-sans">
      {/* Left Chat Screen */}
      <div className={`flex-1 flex flex-col overflow-hidden ${activeChatId !== null && previewOpen ? 'border-r border-zinc-800/20' : ''}`}>
        {/* Optional Header bar for preview toggle */}
        {previewOpen && (
          <div className="h-12 border-b border-zinc-800/80 px-6 flex items-center justify-between bg-zinc-900/40 shrink-0">
            <span className="text-xs font-semibold text-zinc-400">Task Viewport: Workspace Split</span>
            <button
              onClick={() => setPreviewOpen(false)}
              className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-800 transition"
            >
              Close Workspace Preview
            </button>
          </div>
        )}

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
          {activeChatId === null ? (
            <EnterpriseEmptyState />
          ) : messages.length === 0 ? (
            <EnterpriseEmptyState />
          ) : (
            <div className={`${previewOpen ? 'w-full px-4' : 'max-w-2xl mx-auto'} space-y-8 flex-1`}>
              {messages.map((msg, idx) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isLast={idx === messages.length - 1}
                  onTogglePreview={() => {
                    setPreviewOpen(true);
                    if (!previewOpen) {
                      setPreviewLoading(true);
                      setLoadingStep(0);
                    }
                  }}
                  previewOpen={previewOpen}
                />
              ))}
              {isStreaming && <StreamingSkeleton />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {activeChatId !== null && <ChatInput />}
      </div>

      {/* Right Preview Panel (Manus Artifacts style) */}
      {activeChatId !== null && previewOpen && (
        <div className="w-[48%] border-l border-zinc-800 bg-[#121214] flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="h-14 border-b border-zinc-800/80 flex items-center justify-between px-4 bg-zinc-950 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewTab('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  previewTab === 'preview'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setPreviewTab('code')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  previewTab === 'code'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                &lt;&gt; Code
              </button>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button className="px-3 py-1 rounded bg-emerald-655 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-sm transition">
                Publish
              </button>
              <button
                onClick={() => setPreviewOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {previewLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-950/20 text-center space-y-6">
                {/* Simulated Loading UI */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-zinc-800 border-t-emerald-500 animate-spin" />
                  <Sparkles className="w-5 h-5 text-emerald-400 fill-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">AuroVex is building the website...</h3>
                  <p className="text-xs text-zinc-500">Compiling assets and executing RAG frameworks</p>
                </div>

                {/* Progress bar */}
                <div className="w-64 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000" 
                    style={{ width: `${(loadingStep + 1) * 20}%` }}
                  />
                </div>

                {/* Terminal logs list */}
                <div className="w-80 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-left font-mono text-[10px] text-zinc-400 space-y-1">
                  <div className={loadingStep >= 0 ? 'text-zinc-200' : 'opacity-30'}>
                    <span className="text-zinc-600">16:37</span> Initialize the web project
                  </div>
                  <div className={loadingStep >= 1 ? 'text-zinc-200' : 'opacity-30'}>
                    <span className="text-zinc-600">16:38</span> Installing Tailwind CSS dependencies
                  </div>
                  <div className={loadingStep >= 2 ? 'text-zinc-200' : 'opacity-30'}>
                    <span className="text-zinc-655 text-zinc-600">16:38</span> Writing src/App.tsx components
                  </div>
                  <div className={loadingStep >= 3 ? 'text-zinc-200' : 'opacity-30'}>
                    <span className="text-zinc-655 text-zinc-600">16:39</span> Writing src/index.css variables
                  </div>
                  <div className={loadingStep >= 4 ? 'text-zinc-200' : 'opacity-30'}>
                    <span className="text-zinc-655 text-zinc-600">16:39</span> Running local dev server on port 5173
                  </div>
                </div>
              </div>
            ) : previewTab === 'preview' ? (
              <div className="flex-1 flex flex-col bg-zinc-950">
                {/* Browser bar */}
                <div className="h-10 border-b border-zinc-900 px-4 flex items-center justify-between bg-zinc-900/40 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-800" />
                    <span className="w-2 h-2 rounded-full bg-zinc-800" />
                    <span className="w-2 h-2 rounded-full bg-zinc-800" />
                  </div>
                  <div className="flex-1 max-w-md mx-6 h-7 rounded-md bg-zinc-900 border border-zinc-800/80 text-[10px] text-zinc-500 flex items-center px-3 truncate select-all justify-between">
                    <span>https://future-summit.auromind.ai/</span>
                    <RotateCcw className="w-2.5 h-2.5 cursor-pointer hover:text-white" />
                  </div>
                  <div className="w-10" />
                </div>

                {/* Render page preview */}
                <iframe 
                  srcDoc={getMockPageHtml(userPrompt, botContent)} 
                  className="flex-1 w-full border-none bg-white" 
                  title="Web Preview"
                />
              </div>
            ) : (
              <div className="flex-1 flex overflow-hidden">
                {/* Sidebar File explorer */}
                <div className="w-52 border-r border-zinc-800 bg-zinc-950 p-3 space-y-4 select-none shrink-0">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Workspace Files</div>
                  <div className="space-y-1">
                    <div className="text-xs text-zinc-400 font-semibold flex items-center gap-1 px-1">📁 client</div>
                    <div className="pl-3 space-y-2">
                      <div className="text-xs text-zinc-400 font-semibold flex items-center gap-1 px-1">📁 src</div>
                      <div className="pl-3 space-y-1">
                        <button 
                          onClick={() => setSelectedFile('src/App.tsx')}
                          className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${selectedFile === 'src/App.tsx' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                          ⚛️ App.tsx
                        </button>
                        <button 
                          onClick={() => setSelectedFile('src/index.css')}
                          className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${selectedFile === 'src/index.css' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                          🎨 index.css
                        </button>
                      </div>
                    </div>
                    <div className="pl-3 space-y-1">
                      <button 
                        onClick={() => setSelectedFile('index.html')}
                        className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${selectedFile === 'index.html' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'}`}
                      >
                        🌐 index.html
                      </button>
                      <button 
                        onClick={() => setSelectedFile('package.json')}
                        className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${selectedFile === 'package.json' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-500 hover:text-zinc-300'}`}
                      >
                        📦 package.json
                      </button>
                    </div>
                  </div>
                </div>

                {/* Code editor */}
                <div className="flex-1 bg-zinc-950 p-4 font-mono text-xs overflow-y-auto text-zinc-300 select-all whitespace-pre leading-relaxed">
                  {/* Styled Editor lines */}
                  {getCodeForFile(selectedFile).split('\n').map((line, idx) => (
                    <div key={idx} className="flex gap-4">
                      <span className="w-6 text-right text-zinc-700 select-none">{idx + 1}</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function EnterpriseEmptyState() {
  const { sendMessage, webSearchEnabled, toggleWebSearch, isStreaming } = useChatStore();
  const [input, setInput] = useState('');
  const [activeTool, setActiveTool] = useState<'Website' | 'Desktop'>('Website');
  const [attachments, setAttachments] = useState<string[]>([]);
  
  // Modals state
  const [websiteModalOpen, setWebsiteModalOpen] = useState(false);
  const [figmaModalOpen, setFigmaModalOpen] = useState(false);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  
  // Inputs for modals
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [figmaUrl, setFigmaUrl] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachments.length === 0) || isStreaming) return;
    
    // Construct prompt with attachments info
    let finalPrompt = input;
    if (attachments.length > 0) {
      finalPrompt += `\n\n[Attached Files: ${attachments.join(', ')}]`;
    }
    sendMessage(finalPrompt);
    setInput('');
    setAttachments([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setAttachments(prev => [...prev, fileName]);
    }
  };

  const presetCategories = [
    { label: 'E-commerce • Shopify', icon: ShoppingBag, prompt: 'Build a high-converting Shopify store layout for modern apparel.' },
    { label: 'Landing Page', icon: Layout, prompt: 'Build a SaaS landing page with hero, features grid, pricing cards, and dark theme.' },
    { label: 'Dashboard', icon: BarChart3, prompt: 'Build an enterprise analytics dashboard with real-time telemetry metrics.' },
    { label: 'Portfolio', icon: Palette, prompt: 'Build a minimalist digital artist portfolio showcase with lightbox gallery.' },
  ];

  const integrationTags = ['LLM', 'Shopify', 'Database', 'Image generation', 'Maps', 'Notification', 'File storage', 'Data API', 'Stripe', 'Voice-to-Text'];

  return (
    <div className="max-w-3xl mx-auto text-center pt-12 pb-8 space-y-8 px-4 relative">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-zinc-100 tracking-tight">
        What can I do for you?
      </h1>

      {/* Main Prompt Box */}
      <form
        onSubmit={handleSubmit}
        className="rounded-[20px] bg-[#1C1C1F] border border-zinc-800 p-4 text-left space-y-3 shadow-floating focus-within:border-zinc-700 transition-all max-w-2xl mx-auto"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // Auto-resize logic
            if (textareaRef.current) {
              textareaRef.current.style.height = 'auto';
              textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Describe the website you want to build..."
          className="w-full max-h-[200px] resize-none bg-transparent px-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none leading-relaxed font-sans py-1"
        />

        {/* Attachment pills preview inside form */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 px-2 pb-2">
            {attachments.map((file, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>{file}</span>
                <button type="button" onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))} className="hover:text-red-400 text-zinc-500">
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Control Row inside Prompt Card */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
          <div className="flex items-center gap-2">
            {/* Native file upload clicker */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-7 h-7 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <span className="text-base leading-none font-medium">+</span>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />

            <button
              type="button"
              onClick={() => setActiveTool('Desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeTool === 'Desktop'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800/60'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Manus Desktop</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTool('Website')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeTool === 'Website'
                  ? 'bg-blue-600 text-white font-semibold shadow-soft'
                  : 'text-zinc-400 hover:bg-zinc-800/60'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setInput(prev => prev + " [Voice command registered]")}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Mic className="w-4 h-4 text-emerald-400 animate-pulse" />
            </button>

            <button
              type="submit"
              disabled={(!input.trim() && attachments.length === 0) || isStreaming}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                input.trim() || attachments.length > 0
                  ? 'bg-white text-black shadow-soft hover:bg-zinc-200 cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Preset Build Categories */}
      <div className="max-w-2xl mx-auto space-y-3 text-left">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="font-semibold text-zinc-300">What would you like to build?</span>
          <div className="flex items-center gap-4 text-zinc-400 font-medium">
            <button
              type="button"
              onClick={() => setWebsiteModalOpen(true)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <LinkIcon className="w-3 h-3" />
              <span>Add website reference</span>
            </button>
            <button
              type="button"
              onClick={() => setFigmaModalOpen(true)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Figma className="w-3 h-3 text-pink-400" />
              <span>Import from Figma</span>
            </button>
          </div>
        </div>

        {/* Category Pill Badges */}
        <div className="flex flex-wrap gap-2">
          {presetCategories.map((cat, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setInput(cat.prompt);
                sendMessage(cat.prompt);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C1C1F] border border-zinc-800 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all shadow-soft"
            >
              <cat.icon className="w-3.5 h-3.5 text-emerald-400" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Integrations Card Banner */}
      <div
        onClick={() => setUpgradeModalOpen(true)}
        className="max-w-2xl mx-auto rounded-2xl bg-[#1C1C1F] border border-zinc-800 p-5 text-left flex items-center justify-between shadow-floating cursor-pointer hover:border-zinc-700 transition-colors"
      >
        <div className="space-y-3 max-w-md">
          <div className="flex items-center gap-1 text-xs font-semibold text-zinc-200 hover:text-white group">
            <span>Powerful built-in Integrations</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {integrationTags.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md bg-zinc-800/80 text-[10px] font-medium text-zinc-400 border border-zinc-700/50">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-24 h-16 rounded-xl bg-gradient-to-br from-emerald-950/60 to-zinc-900 border border-emerald-800/40 flex items-center justify-center text-[10px] font-mono text-emerald-400 shadow-soft">
          ⚡ AI Builder
        </div>
      </div>

      {/* WEBSITE REFERENCE MODAL */}
      {websiteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full text-left space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Add Website Reference</h3>
              <button onClick={() => setWebsiteModalOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <input
              type="url"
              placeholder="https://example.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-white focus:outline-none focus:border-zinc-500"
            />
            <button
              onClick={() => {
                if (websiteUrl) {
                  setAttachments(prev => [...prev, `Website: ${websiteUrl}`]);
                  setWebsiteModalOpen(false);
                  setWebsiteUrl('');
                }
              }}
              className="w-full py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200"
            >
              Add Reference
            </button>
          </div>
        </div>
      )}

      {/* FIGMA IMPORT MODAL */}
      {figmaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full text-left space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Figma className="w-4 h-4 text-pink-400" />
                <span>Import from Figma</span>
              </h3>
              <button onClick={() => setFigmaModalOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <input
              type="url"
              placeholder="https://figma.com/file/..."
              value={figmaUrl}
              onChange={(e) => setFigmaUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-white focus:outline-none focus:border-zinc-500"
            />
            <button
              onClick={() => {
                if (figmaUrl) {
                  setAttachments(prev => [...prev, `Figma: ${figmaUrl.split('/').pop()?.slice(0,15)}`]);
                  setFigmaModalOpen(false);
                  setFigmaUrl('');
                }
              }}
              className="w-full py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200"
            >
              Import Design
            </button>
          </div>
        </div>
      )}

      {/* UPGRADE PLAN MODAL */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-850 rounded-3xl p-6 max-w-md w-full text-left space-y-5 shadow-floating">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h3 className="text-base font-bold text-white">Upgrade to Auromind Pro</h3>
              </div>
              <button onClick={() => setUpgradeModalOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Unlock unlimited high-throughput generation on AuroVex 1.5 flagship reasoning models, custom agent building, and pgvector RAG integration.
            </p>
            <div className="p-4 rounded-2xl bg-zinc-850 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-300">Monthly Billing</span>
                <span className="text-sm font-bold text-white">$49 / mo</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold">✓ 10 active AI Employees</div>
              <div className="text-[11px] text-emerald-400 font-semibold">✓ Full Vector Ingestion API</div>
            </div>
            <button
              onClick={() => setUpgradeModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-soft"
            >
              Activate Pro Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ 
  message, 
  isLast, 
  onTogglePreview, 
  previewOpen 
}: { 
  message: ChatMessage; 
  isLast?: boolean; 
  onTogglePreview?: () => void; 
  previewOpen?: boolean; 
}) {
  const isUser = message.role === 'user';

  /* ── USER bubble ── */
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="flex flex-col items-end gap-1.5 max-w-[75%]">
          {/* Small contextual badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#1e293b]/60 border border-zinc-700/40 text-[11px] font-medium text-zinc-400">
            <Globe className="w-2.5 h-2.5" /> Website
          </span>
          {/* Message pill */}
          <div className="px-4 py-2.5 rounded-2xl bg-[#1f1f22] border border-zinc-800/80 text-[14px] text-zinc-100 leading-relaxed shadow-sm">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  /* ── ASSISTANT message ── */
  const isError = message.content.startsWith('Error communicating with') || message.content.startsWith('Exception during') || message.content.startsWith('Error: Gemini API');

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-[22px] h-[22px] rounded-md overflow-hidden bg-primary flex items-center justify-center shadow-soft">
            <Image src="/logo.png" alt="AuromindAI" width={22} height={22} unoptimized className="rounded-md" />
          </div>
          <span className="text-[13px] font-bold text-white tracking-tight">auromind</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-400 leading-none">
            Lite
          </span>
        </div>
        <span className="text-[11px] text-zinc-500 tabular-nums">{message.timestamp}</span>
      </div>

      {/* Content — rendered directly on the dark background */}
      <div className="pl-[30px] space-y-4">
        {isError ? (
          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 max-w-xl text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              SYSTEM EXCEPTION
            </div>
            <p className="text-xs text-rose-350 text-rose-300/80 leading-relaxed font-mono">
              {message.content}
            </p>
          </div>
        ) : (
          <div className="text-[14px] text-zinc-300 leading-relaxed">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-xl font-bold text-white mt-6 mb-3 leading-tight">{children}</h1>,
                h2: ({ children }) => <h2 className="text-[17px] font-bold text-white mt-6 mb-2.5 leading-tight">{children}</h2>,
                h3: ({ children }) => <h3 className="text-[15px] font-bold text-white mt-5 mb-2 leading-tight">{children}</h3>,
                p: ({ children }) => <p className="text-[14px] text-zinc-300 leading-relaxed mb-4">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2 text-[14px] text-zinc-300">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2 text-[14px] text-zinc-300">{children}</ol>,
              li: ({ children }) => <li className="leading-relaxed mb-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="my-4 pl-3.5 border-l-2 border-zinc-700 text-zinc-450 italic text-[14px] leading-relaxed">
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                const codeContent = String(children).replace(/\n$/, '');
                const isInline = !match && !codeContent.includes('\n');
                if (isInline) {
                  return (
                    <code className="font-mono bg-zinc-800/60 border border-zinc-800 px-1.5 py-0.5 rounded text-[12.5px] text-zinc-250" {...props}>
                      {children}
                    </code>
                  );
                }
                
                if (previewOpen) {
                  return (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800/80 text-xs text-zinc-400 my-3 max-w-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Code loaded to workspace panel</span>
                    </div>
                  );
                }
                return (
                  <pre className="my-3.5 rounded-xl bg-[#18181b] border border-zinc-800 p-4 overflow-x-auto">
                    <code className="font-mono text-[13px] leading-relaxed text-zinc-300">
                      {codeContent}
                    </code>
                  </pre>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
        )}

        {/* Dynamic Website Build Artifact Widget */}
        {(message.content.toLowerCase().includes('website') || 
          message.content.toLowerCase().includes('landing page') ||
          message.content.toLowerCase().includes('initialize the web project') ||
          message.content.toLowerCase().includes('build the landing page') ||
          message.content.toLowerCase().includes('project directory')) && (
          <div className="mt-4 max-w-md p-3.5 rounded-xl bg-[#1C1C1F] border border-zinc-800 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-100">Future of Creative AI Summit</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-400 font-semibold">
                    {previewOpen ? 'Website Compiled Successfully' : 'Preview Available'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onTogglePreview}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition-all active:scale-95"
            >
              {previewOpen ? 'Open Workspace' : 'Launch Preview'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StreamingSkeleton() {
  return (
    <div className="flex gap-4 justify-start animate-pulse">
      <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
        <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
      </div>
      <div className="space-y-2 w-2/3">
        <div className="p-4 rounded-2xl bg-[#1C1C1F] border border-zinc-800 space-y-2">
          <div className="h-3 bg-zinc-800 rounded w-full" />
          <div className="h-3 bg-zinc-800 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}

function getCodeForFile(fileName: string): string {
  if (fileName === 'index.html') {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Future of Creative AI Summit</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
  }
  if (fileName === 'package.json') {
    return `{
  "name": "creative-ai-summit",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^5.3.0"
  }
}`;
  }
  if (fileName === 'src/index.css') {
    return `@import "tailwindcss";

@theme {
  --radius-lg: 1rem;
  --color-primary: #4f46e5;
  --color-accent: #8b5cf6;
}`;
  }
  return `import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 font-sans">
      <header className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-150">
        <span className="text-xl font-bold bg-gradient-to-r from-purple-700 to-indigo-850 bg-clip-text text-transparent flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-indigo-650 flex items-center justify-center text-white text-[11px]">⚡</span>
          FutureCreative
        </span>
        <button className="bg-indigo-700 text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-indigo-850 transition">
          Register Now
        </button>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="inline-block bg-purple-100/80 border border-purple-200/60 text-purple-800 text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
          ✨ Future of Creative AI Summit 2026
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
          Where Artistry Meets <br />
          <span className="bg-gradient-to-r from-purple-700 to-indigo-900 bg-clip-text text-transparent">
            Artificial Intelligence
          </span>
        </h1>
        <p className="text-base text-slate-655 max-w-2xl mx-auto leading-relaxed">
          Explore the vanguard of generative arts, design frameworks, and autonomous workflow engines.
        </p>
      </main>
    </div>
  );
}`;
}


function DatabaseConnectDashboard() {
  const [selectedDb, setSelectedDb] = useState<'postgres' | 'mysql' | 'mongodb' | 'file'>('postgres');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedList, setConnectedList] = useState([
    { id: '1', type: 'PostgreSQL', name: 'auromind_analytics_prod', host: 'localhost', status: 'Connected', tables: 24, size: '4.8 GB' },
    { id: '2', type: 'CSV Upload', name: 'sales_leads_q3.csv', host: 'local', status: 'Parsed', tables: 1, size: '12 MB' }
  ]);

  // Form states
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('5432');
  const [dbName, setDbName] = useState('auromind_enterprise');
  const [user, setUser] = useState('postgres');
  const [password, setPassword] = useState('');
  const [mongoUri, setMongoUri] = useState('mongodb://localhost:27017/auromind');
  const [uploadFile, setUploadFile] = useState<string | null>(null);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      const newConn = {
        id: Date.now().toString(),
        type: selectedDb === 'postgres' ? 'PostgreSQL' : selectedDb === 'mysql' ? 'MySQL' : selectedDb === 'mongodb' ? 'MongoDB' : 'File Upload',
        name: selectedDb === 'mongodb' ? 'mongodb_cluster_0' : dbName,
        host: selectedDb === 'mongodb' ? 'atlas-cloud' : host,
        status: 'Connected',
        tables: selectedDb === 'mongodb' ? 15 : 8,
        size: '1.2 GB'
      };
      setConnectedList(prev => [newConn, ...prev]);
      setPassword('');
      alert(`${newConn.type} Database connected successfully!`);
    }, 1500);
  };

  const handleDisconnect = (id: string) => {
    setConnectedList(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="flex-1 overflow-y-auto px-8 py-10 max-w-4xl mx-auto space-y-10 text-zinc-350 bg-[#121214]">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900/80 to-zinc-900 border border-zinc-800/80 p-8 overflow-hidden shadow-floating">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 text-[11px] font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Data Integration Center
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Connect your Enterprise Data
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Directly connect your PostgreSQL, MySQL, or MongoDB clusters, or upload raw CSV/JSON files. Our AI Employees will ingest the schema structures and prepare pgvector RAG embeddings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Connection Setup Panel */}
        <div className="md:col-span-7 bg-[#1C1C1F] border border-zinc-800/80 rounded-2xl p-6 space-y-6 shadow-soft">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider px-1">
            New Connection
          </h2>

          {/* Tab Selector */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
            <button
              onClick={() => { setSelectedDb('postgres'); setPort('5432'); setDbName('postgres'); }}
              className={`py-2 rounded-lg text-[11px] font-bold transition-all ${selectedDb === 'postgres' ? 'bg-zinc-850 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              PostgreSQL
            </button>
            <button
              onClick={() => { setSelectedDb('mysql'); setPort('3306'); setDbName('mysql_db'); }}
              className={`py-2 rounded-lg text-[11px] font-bold transition-all ${selectedDb === 'mysql' ? 'bg-zinc-850 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              MySQL
            </button>
            <button
              onClick={() => setSelectedDb('mongodb')}
              className={`py-2 rounded-lg text-[11px] font-bold transition-all ${selectedDb === 'mongodb' ? 'bg-zinc-850 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              MongoDB
            </button>
            <button
              onClick={() => setSelectedDb('file')}
              className={`py-2 rounded-lg text-[11px] font-bold transition-all ${selectedDb === 'file' ? 'bg-zinc-850 text-white shadow' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              CSV File
            </button>
          </div>

          {/* Connection Forms */}
          <form onSubmit={handleConnect} className="space-y-4">
            {selectedDb !== 'file' && selectedDb !== 'mongodb' && (
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="space-y-1.5 col-span-2 md:col-span-1">
                  <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Host</label>
                  <input
                    type="text"
                    required
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-1.5 col-span-2 md:col-span-1">
                  <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Port</label>
                  <input
                    type="text"
                    required
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Database Name</label>
                  <input
                    type="text"
                    required
                    value={dbName}
                    onChange={(e) => setDbName(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-1.5 col-span-2 md:col-span-1">
                  <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Username</label>
                  <input
                    type="text"
                    required
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-1.5 col-span-2 md:col-span-1">
                  <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder:text-zinc-600"
                  />
                </div>
              </div>
            )}

            {selectedDb === 'mongodb' && (
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Connection URI</label>
                <input
                  type="text"
                  required
                  value={mongoUri}
                  onChange={(e) => setMongoUri(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none placeholder:text-zinc-600"
                />
              </div>
            )}

            {selectedDb === 'file' && (
              <div className="border border-dashed border-zinc-850 rounded-2xl p-6 text-center hover:border-zinc-700 transition cursor-pointer bg-zinc-900/20">
                <input
                  type="file"
                  id="csv-file"
                  className="hidden"
                  accept=".csv,.json"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadFile(e.target.files[0].name);
                    }
                  }}
                />
                <label htmlFor="csv-file" className="cursor-pointer space-y-3 block">
                  <div className="text-3xl">📁</div>
                  <div className="text-xs font-bold text-zinc-300">
                    {uploadFile ? uploadFile : 'Click to select CSV or JSON file'}
                  </div>
                  <div className="text-[10px] text-zinc-500">Max file size: 50MB</div>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isConnecting || (selectedDb === 'file' && !uploadFile)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-soft flex items-center justify-center gap-2 mt-2"
            >
              {isConnecting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Connecting pipeline...
                </>
              ) : (
                'Establish Connection'
              )}
            </button>
          </form>
        </div>

        {/* Status & Active Connections List */}
        <div className="md:col-span-5 space-y-6 text-left">
          <div className="bg-[#1C1C1F] border border-zinc-800/80 rounded-2xl p-6 space-y-4 shadow-soft">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider px-1">
              Active Datastores
            </h2>

            <div className="space-y-3">
              {connectedList.map((conn) => (
                <div key={conn.id} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-zinc-200">{conn.name}</span>
                      <span className="px-1.5 py-0.5 rounded-[4px] text-[8px] font-extrabold uppercase bg-emerald-950/40 text-emerald-450 border border-emerald-900/35 leading-none">
                        {conn.type}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      {conn.tables} tables • {conn.size}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDisconnect(conn.id)}
                    className="p-1.5 rounded-lg hover:text-red-400 text-zinc-500 hover:bg-zinc-800/40 transition text-xs font-semibold"
                  >
                    Disconnect
                  </button>
                </div>
              ))}

              {connectedList.length === 0 && (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No active database connections.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


