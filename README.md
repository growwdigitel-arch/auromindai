# AuromindAI SaaS Platform

AuromindAI is an enterprise-grade SaaS application designed to deploy **24/7 Autonomous AI Employees** for Sales, Customer Support, Marketing, and Operations.

Built with a high-performance stack: **Next.js 15 (App Router)**, **FastAPI (Python 3.13)**, **PostgreSQL + pgvector**, **Redis**, **Celery**, **Zustand**, and **Docker**.

---

## 🎨 Design System & Palette

- **Primary Text / Core UI**: `#111111`
- **Secondary Accent**: `#16A34A`
- **Accent Light**: `#22C55E` (`#DCFCE7`)
- **Background**: `#FFFFFF`
- **Floating Cards**: `#FAFAFA`
- **Border**: `#E5E7EB`
- **Rounded Corners**: `16px` (`rounded-2xl`)
- **Typography**: Inter

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Docker & Docker Compose
- Node.js >= 20.0
- Python >= 3.13

### 1. Launch Multi-Container Stack via Docker Compose
```bash
docker compose up --build
```
- **Frontend App**: `http://localhost:3000`
- **FastAPI API Docs**: `http://localhost:8000/docs`
- **PostgreSQL Vector DB**: `localhost:5432`

---

## 🏗 System Architecture

```
                                  ┌────────────────────────┐
                                  │   AuromindAI Web App   │
                                  │   Next.js 15 + Zustand │
                                  └───────────┬────────────┘
                                              │ REST / WebSocket
                                              ▼
                                  ┌────────────────────────┐
                                  │    FastAPI Server      │
                                  │   Python 3.13 + SSE    │
                                  └─────┬───────────┬──────┘
                                        │           │
                          ┌─────────────▼─┐       ┌─▼─────────────┐
                          │ PostgreSQL    │       │ Redis & Celery│
                          │ + pgvector    │       │ Task Queue    │
                          └───────────────┘       └───────────────┘
```

---

## 📊 Database Schema (20+ Tables)

- `users`, `organizations`, `workspaces`, `teams`, `roles`, `permissions`
- `chats`, `messages`, `attachments`, `models`, `agents`
- `knowledge_documents`, `embeddings` (pgvector cosine similarity)
- `subscriptions`, `payments`, `notifications`, `audit_logs`, `sessions`, `api_keys`, `usage_logs`

---

## 🤖 Model Catalog & AI Modes

### Models
1. **AuroVex 1**: Fast, low latency, lightweight automation tasks.
2. **AuroVex 1.5**: Flagship reasoning model with 1,000,000 token context window.
3. **Claude 3.5 Sonnet / Gemini Pro / GPT-4o**: Integrated via unified LLM provider abstraction layer.

### Modes
- `General AI`, `Sales AI`, `Support AI`, `Marketing AI`, `SEO AI`, `HR AI`, `Legal AI`, `Finance AI`, `Coding AI`, `Research AI`, `Writing AI`.
