'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Globe, Brain, Code2, Bot, Copy, Check, Zap, RefreshCw, ChevronDown, Terminal, MessageSquare } from 'lucide-react';

interface PresetPrompt {
  label: string;
  category: 'code' | 'chat' | 'business' | 'rag';
  icon: string;
  prompt: string;
  reasoning: string;
  response: string;
}

const PRESET_PROMPTS: PresetPrompt[] = [
  {
    label: 'Python FastAPI Microservice',
    category: 'code',
    icon: '⚡',
    prompt: 'Write a production-ready FastAPI endpoint with JWT authentication and rate limiting for AuroVex 1 Fast.',
    reasoning: 'Analyzing requirement -> Importing FastAPI, PyJWT, SlowAPI -> Implementing password hashing & token verification -> Optimizing sub-millisecond response pipeline.',
    response: `\`\`\`python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
import time

app = FastAPI(title="AuroVex 1 Fast API", version="1.0.0")
SECRET_KEY = "auravex-super-secret-key"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/v1/chat/completions")
async def generate_completion(prompt: str, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    start_time = time.time()
    # AuroVex 1 Fast High-Speed Neural Inference Loop (185 tokens/sec)
    output = f"AuroVex 1 Fast response to: '{prompt}' [Generated in {round((time.time()-start_time)*1000, 2)}ms]"
    return {"status": "success", "model": "AuroVex 1 Fast", "result": output}
\`\`\``
  },
  {
    label: 'Market Strategy & Q4 Growth',
    category: 'business',
    icon: '📊',
    prompt: 'Analyze enterprise SaaS ARR expansion strategies for Q4 with AuroVex 1 Fast predictive modeling.',
    reasoning: 'Scanning ARR benchmark databases -> Modeling net dollar retention (NDR > 120%) -> Extracting top 3 expansion levers: land-and-expand, seat upgrades, and API usage tiers.',
    response: `### 📈 AuroVex 1 Fast Strategic ARR Growth Blueprint

1. **Usage-Based Tier Upselling**: Transition accounts exceeding 80% monthly AuroVex API quotas to dedicated high-throughput instances (+28% ARR lift).
2. **Autonomous AI Employee Bundles**: Package multi-agent teams (Sales + Support + SEO) for enterprise departments at $1,200/mo base.
3. **Sub-Second RAG Integration**: Embed enterprise document indexing into existing CRM workflows to drive daily active retention to 84%.`
  },
  {
    label: 'GPT-Style Creative Writing',
    category: 'chat',
    icon: '✍️',
    prompt: 'Draft an engaging announcement email for our new proprietary AI model, AuroVex 1 Fast.',
    reasoning: 'Selecting tone: Visionary yet concise -> Structuring value pillars: 23x lower latency, 185 t/s throughput, 94% cost savings -> Crafting call-to-action.',
    response: `**Subject**: Introducing AuroVex 1 Fast: Next-Gen AI Speed & Intelligence 🚀

Hi Team,

We are thrilled to launch **AuroVex 1 Fast**—our custom-built AI engine designed to bring instant intelligence to your everyday workflows.

**Why AuroVex 1 Fast changes everything:**
• ⚡ **Lightning Speed**: 185 tokens/second with sub-15ms response latency.
• 🧠 **Frontier Reasoning**: Rated 89.2% on HumanEval coding benchmarks.
• 🛡️ **Enterprise Privacy**: 100% zero data retention and SOC2 compliance.

Try it right now on your dashboard or via our unified API!

Best regards,
The AuromindAI Team`
  },
  {
    label: 'Document RAG & PDF Search',
    category: 'rag',
    icon: '📄',
    prompt: 'Extract financial summary from 100-page Q3 SEC filing using pgvector document RAG.',
    reasoning: 'Querying pgvector vector store -> Retrieving top 5 semantic chunks -> Cross-referencing balance sheets -> Calculating GAAP gross margin (78.4%).',
    response: `### 📑 Q3 SEC Filing Analysis (AuroVex Document RAG)

- **Total Revenue**: $42.8M (+34% YoY)
- **Gross Margin**: 78.4% (Up 210 bps due to AuroVex infrastructure efficiency)
- **R&D Expenses**: $11.2M focused on proprietary LLM pre-training
- **Risk Factors**: Zero critical compliance risks detected; SOC2 Type II audit verified.`
  }
];

export function LandingPlayground() {
  const [selectedModel, setSelectedModel] = useState<string>('AuroVex 1 Fast');
  const [activeCategory, setActiveCategory] = useState<'all' | 'code' | 'chat' | 'business' | 'rag'>('all');
  const [currentPrompt, setCurrentPrompt] = useState<PresetPrompt>(PRESET_PROMPTS[0]);
  const [userInput, setUserInput] = useState<string>('');
  const [webSearch, setWebSearch] = useState<boolean>(true);
  const [deepThink, setDeepThink] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [displayedResponse, setDisplayedResponse] = useState<string>(PRESET_PROMPTS[0].response);
  const [copied, setCopied] = useState<boolean>(false);
  const [stats, setStats] = useState<{ speed: number; latency: number }>({ speed: 185, latency: 12 });

  const handleSelectPrompt = (item: PresetPrompt) => {
    setCurrentPrompt(item);
    setUserInput(item.prompt);
    simulateGeneration(item);
  };

  const simulateGeneration = (item: PresetPrompt) => {
    setIsGenerating(true);
    setDisplayedResponse('');
    
    // Simulate high-speed typing effect
    let currentLength = 0;
    const fullText = item.response;
    const interval = setInterval(() => {
      currentLength += Math.min(12, fullText.length - currentLength);
      setDisplayedResponse(fullText.slice(0, currentLength));
      if (currentLength >= fullText.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 25);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const customPrompt: PresetPrompt = {
      label: 'Custom User Prompt',
      category: 'chat',
      icon: '💬',
      prompt: userInput,
      reasoning: `Selected ${selectedModel} -> Processing tokens -> Executing high-speed neural output.`,
      response: `### ⚡ ${selectedModel} Intelligence Response

**Your Query**: "${userInput}"

${selectedModel} processed your request in **14ms** at **185 tokens/sec**. 

- **Analysis**: High precision context match found.
- **Key Insight**: ${selectedModel} is optimized for immediate code execution, conversational flow, and sub-second agentic tasks.
- **Next Steps**: You can run this directly in your workspace dashboard or connect via our unified Python/Node API.`
    };
    
    setCurrentPrompt(customPrompt);
    simulateGeneration(customPrompt);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayedResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-24 px-6 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
          Interactive Demo
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-primary">
          Test <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">AuroVex 1 Fast</span> Live
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Experience ChatGPT-like sub-second responses, code generation, and reasoning right now on this home page.
        </p>
      </div>

      {/* Main Playground Card */}
      <div className="rounded-3xl border border-border bg-white shadow-floating overflow-hidden">
        {/* Top Control Bar */}
        <div className="bg-gray-900 text-white p-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800 border border-gray-700">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="AuroVex 1 Fast" className="bg-gray-900 text-white">AuroVex 1 Fast (185 t/s)</option>
                <option value="AuroVex 1.5 Pro" className="bg-gray-900 text-white">AuroVex 1.5 Pro (Deep Reasoning)</option>
                <option value="AuroVex Code" className="bg-gray-900 text-white">AuroVex Code (Software Eng)</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setWebSearch(!webSearch)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  webSearch ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-gray-800 text-gray-400 border-gray-700'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Web Search</span>
              </button>

              <button
                onClick={() => setDeepThink(!deepThink)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  deepThink ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' : 'bg-gray-800 text-gray-400 border-gray-700'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>Deep Think</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              185 Tokens/sec
            </span>
            <span className="hidden md:inline">Latency: 12ms</span>
          </div>
        </div>

        {/* Category Pills & Presets */}
        <div className="p-4 bg-gray-50 border-b border-border space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Select a Sample Prompt</div>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_PROMPTS.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSelectPrompt(item)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all shadow-sm ${
                  currentPrompt.label === item.label
                    ? 'bg-primary text-white scale-105 shadow-md'
                    : 'bg-white text-gray-700 border border-border hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat / Playground Output Area */}
        <div className="p-6 space-y-6 min-h-[320px] bg-white">
          {/* User Prompt */}
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-700 shrink-0">
              YOU
            </div>
            <div className="flex-1 bg-gray-100 p-4 rounded-2xl rounded-tl-none text-sm text-primary font-medium shadow-sm">
              {currentPrompt.prompt}
            </div>
          </div>

          {/* Assistant Response */}
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm">
              AV
            </div>
            <div className="flex-1 space-y-3">
              {/* Model Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-primary">{selectedModel}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Pro Engine
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Reasoning Dropdown simulation */}
              {deepThink && (
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                    <Brain className="w-3.5 h-3.5" />
                    <span>Thought Process ({selectedModel})</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-mono leading-relaxed">
                    {currentPrompt.reasoning}
                  </p>
                </div>
              )}

              {/* Formatted Output */}
              <div className="text-sm text-gray-800 leading-relaxed font-sans whitespace-pre-wrap rounded-2xl bg-gray-50/50 p-4 border border-border/60">
                {displayedResponse}
                {isGenerating && (
                  <span className="inline-block w-2 h-4 ml-1 bg-emerald-500 animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Form Bar */}
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-t border-border">
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-border shadow-soft focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
            <MessageSquare className="w-5 h-5 text-gray-400 ml-2 shrink-0" />
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask AuroVex 1 Fast anything or type your code prompt..."
              className="w-full bg-transparent text-sm text-primary placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-gray-900 transition-all shadow-soft shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
