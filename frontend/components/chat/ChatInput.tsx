'use client';

import React, { useState, useRef } from 'react';
import { 
  Laptop, 
  Globe, 
  Mic, 
  ArrowUp, 
  FileText, 
  X 
} from 'lucide-react';
import { useChatStore } from '@/lib/store/useChatStore';

export function ChatInput() {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState<'Website' | 'Desktop'>('Website');
  
  const { sendMessage, isStreaming } = useChatStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachments.length === 0) || isStreaming) return;
    
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
      setAttachments((prev) => [...prev, fileName]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 shrink-0">
      {/* Attached file pills */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 px-2">
          {attachments.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate max-w-[150px]">{file}</span>
              <button
                type="button"
                onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                className="p-0.5 hover:text-red-400 text-zinc-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dark Input Container Box matching Manus empty-state look */}
      <form
        onSubmit={handleSubmit}
        className="rounded-[20px] bg-[#1C1C1F] border border-zinc-800 p-4 text-left space-y-3 shadow-floating focus-within:border-zinc-700 transition-all"
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
          placeholder="Ask AuromindAI anything..."
          className="w-full max-h-[200px] resize-none bg-transparent px-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none leading-relaxed font-sans py-1"
        />

        {/* Bottom Control tools */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800/60">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
              <Mic className="w-4 h-4 text-emerald-400" />
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
      <div className="text-center text-[10px] text-zinc-500 mt-2 font-medium">
        AuromindAI can make mistakes. Verify critical facts and compliance decisions.
      </div>
    </div>
  );
}
