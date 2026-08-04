'use client';

import React, { useState } from 'react';
import { 
  Database, 
  UploadCloud, 
  FileText, 
  Globe, 
  Search, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { KnowledgeDocument } from '@/lib/types';

const initialDocs: KnowledgeDocument[] = [
  { id: 'doc-1', name: 'Acme_Q3_Financial_Report.pdf', fileType: 'PDF', size: '2.4 MB', chunksCount: 142, uploadedAt: '2 hours ago', status: 'indexed' },
  { id: 'doc-2', name: 'Product_Architecture_v2.docx', fileType: 'DOCX', size: '1.1 MB', chunksCount: 88, uploadedAt: 'Yesterday', status: 'indexed' },
  { id: 'doc-3', name: 'Customer_Support_SLA_Guidelines.txt', fileType: 'TXT', size: '450 KB', chunksCount: 34, uploadedAt: '3 days ago', status: 'indexed' },
  { id: 'doc-4', name: 'https://docs.acme.com/api-reference', fileType: 'URL', size: 'Web Page', chunksCount: 210, uploadedAt: 'Just now', status: 'processing' },
];

export default function KnowledgePage() {
  const [docs, setDocs] = useState<KnowledgeDocument[]>(initialDocs);
  const [urlInput, setUrlInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const newDoc: KnowledgeDocument = {
      id: `doc-${Date.now()}`,
      name: urlInput,
      fileType: 'URL',
      size: 'Web Crawler',
      chunksCount: 0,
      uploadedAt: 'Just now',
      status: 'processing',
    };

    setDocs([newDoc, ...docs]);
    setUrlInput('');

    // Simulate processing completion
    setTimeout(() => {
      setDocs(prev => prev.map(d => d.id === newDoc.id ? { ...d, chunksCount: 65, status: 'indexed' } : d));
    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc: KnowledgeDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        fileType: file.name.endsWith('.pdf') ? 'PDF' : 'DOCX',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        chunksCount: 0,
        uploadedAt: 'Just now',
        status: 'processing',
      };
      setDocs([newDoc, ...docs]);

      setTimeout(() => {
        setDocs(prev => prev.map(d => d.id === newDoc.id ? { ...d, chunksCount: 112, status: 'indexed' } : d));
      }, 2000);
    }
  };

  const filteredDocs = docs.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
          <Database className="w-4 h-4" />
          <span>Vector Database & Retrieval</span>
        </div>
        <h1 className="text-3xl font-bold text-primary tracking-tight">Knowledge Base</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload files and web URLs to build RAG context for your AI Employees.</p>
      </div>

      {/* Upload Zone & URL Ingestion Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Drag & Drop */}
        <label className="floating-card p-8 border-2 border-dashed border-border hover:border-accent cursor-pointer flex flex-col items-center justify-center text-center space-y-3 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-accent-light text-secondary flex items-center justify-center">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-primary">Upload Documents</div>
            <div className="text-xs text-muted-foreground mt-1">PDF, DOCX, CSV, TXT up to 50MB</div>
          </div>
          <span className="px-3 py-1 rounded-xl bg-card border border-border text-xs font-semibold text-primary">
            Browse Files
          </span>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>

        {/* Web URL Crawler Input */}
        <div className="floating-card p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary mb-1">
              <Globe className="w-4 h-4 text-secondary" />
              <span>Crawl Website / Documentation</span>
            </div>
            <p className="text-xs text-muted-foreground">Index live documentation URLs, Notion pages, or Notion databases automatically.</p>
          </div>

          <form onSubmit={handleUrlSubmit} className="flex gap-2">
            <input
              type="url"
              required
              placeholder="https://docs.yourcompany.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-border bg-white text-xs focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-soft hover:bg-gray-900"
            >
              Crawl URL
            </button>
          </form>
        </div>
      </div>

      {/* Index Status & Table */}
      <div className="floating-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-primary">Indexed Documents ({docs.length})</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-accent-light text-secondary text-[11px] font-bold">
              pgvector Active
            </span>
          </div>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-border bg-white text-xs focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Vector Chunks</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-card/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-primary flex items-center gap-2">
                    <FileText className="w-4 h-4 text-secondary shrink-0" />
                    <span className="truncate max-w-xs">{doc.name}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{doc.fileType}</td>
                  <td className="py-3 px-4 text-muted-foreground">{doc.size}</td>
                  <td className="py-3 px-4 font-mono font-medium text-primary">
                    <div className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-secondary" />
                      {doc.chunksCount} chunks
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {doc.status === 'indexed' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-secondary text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                        <Clock className="w-3 h-3 animate-spin" /> Ingesting...
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setDocs(docs.filter(d => d.id !== doc.id))}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-card transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
