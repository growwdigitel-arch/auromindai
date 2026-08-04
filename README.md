<div align="center">
  <img src="frontend/public/logo.png" alt="AuromindAI Logo" width="90" />
  <h1>AuromindAI</h1>
  <p><strong>AI Employees that work 24/7</strong></p>
  <p>
    <a href="https://github.com/growwdigitel-arch/auromindai/actions"><img src="https://github.com/growwdigitel-arch/auromindai/workflows/CI%2FCD/badge.svg" alt="CI/CD" /></a>
    <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
    <img src="https://img.shields.io/badge/FastAPI-Python%203.13-009688?logo=fastapi" />
    <img src="https://img.shields.io/badge/PostgreSQL-pgvector-336791?logo=postgresql" />
    <img src="https://img.shields.io/badge/license-MIT-green" />
  </p>
</div>

---

## What is AuromindAI?

AuromindAI is an enterprise-grade SaaS platform for deploying **autonomous AI agents** trained on your business data. Deploy pre-built AI employees for Sales, Customer Support, Marketing, and Operations — across WhatsApp, Instagram, Email, Slack, and more — in under 5 minutes.

> **AuroVex 1.5 Architecture** · 1M token context · Sub-second streaming · HIPAA & SOC2 compliant

---

## ✨ Features

| Feature | Details |
|---|---|
| 🤖 **Autonomous AI Agents** | Pre-trained vertical agents for 7+ industries |
| 📄 **Instant Document RAG** | PDF, DOCX, Notion, websites → pgvector semantic search |
| ⚡ **AuroVex 1.5 Engine** | 1,000,000 token context, <4s SLA response time |
| 🔐 **Enterprise Security** | SSO, MFA, RBAC, JWT, SOC2/GDPR audit logs |
| 🌐 **Omnichannel** | WhatsApp · Instagram · Email · Slack · SMS · Voice · Web Chat |
| 📊 **Real-time Dashboard** | Live agent activity, conversion metrics, compliance audits |
| 🧠 **Deep Think Mode** | Multi-step reasoning chains with transparent trace |
| 🌍 **Web Search** | Live internet access baked into every agent |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    AuromindAI Platform                       │
│                                                              │
│   ┌─────────────────────┐      ┌────────────────────────┐   │
│   │  Next.js 15 App     │      │   FastAPI Backend       │   │
│   │  App Router + RSC   │◄────►│   Python 3.13 + SSE    │   │
│   │  Zustand + Tailwind │      │   WebSocket streaming   │   │
│   └─────────────────────┘      └────────────┬───────────┘   │
│                                              │               │
│              ┌───────────────────────────────┼──────────┐    │
│              │                               │          │    │
│   ┌──────────▼───────┐         ┌─────────────▼──┐  ┌───▼──┐ │
│   │  PostgreSQL 16   │         │  Redis + Celery│  │ S3   │ │
│   │  + pgvector      │         │  Task Queue    │  │ CDN  │ │
│   └──────────────────┘         └────────────────┘  └──────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 20
- **Python** ≥ 3.13
- **Docker** & Docker Compose
- **PostgreSQL** 16 with pgvector extension

### Option 1 — Docker Compose (Recommended)

```bash
# Clone the repo
git clone https://github.com/growwdigitel-arch/auromindai.git
cd auromindai

# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Start the entire stack
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API Docs | http://localhost:8000/docs |
| PostgreSQL | localhost:5432 |

### Option 2 — Manual Development

**Backend:**
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install        # postinstall auto-patches Next.js RSC dev bug
npm run dev        # http://localhost:3000
```

---

## 📁 Project Structure

```
auromindai/
├── frontend/                    # Next.js 15 App Router
│   ├── app/
│   │   ├── (landing)/           # Public marketing pages
│   │   ├── (dashboard)/         # Protected app routes
│   │   └── (auth)/              # Login / Register
│   ├── components/
│   │   ├── chat/                # ChatContainer, Sidebar, ChatInput
│   │   └── landing/             # Hero, Features, Pricing, Visuals, Footer
│   ├── lib/
│   │   ├── store/useChatStore.ts # Zustand global state
│   │   └── types/               # TypeScript types
│   ├── public/logo.png          # Brand logo
│   └── scripts/patch-next-devtools.js  # RSC crash fix
│
├── backend/                     # FastAPI Python API
│   └── app/
│       ├── api/v1/endpoints/    # auth, agents, chats, knowledge, websocket
│       ├── core/config.py       # Settings & secrets
│       ├── db/models.py         # SQLAlchemy ORM models
│       ├── services/
│       │   ├── ai/provider.py   # Multi-LLM abstraction (GPT, Claude, Gemini)
│       │   └── rag/pipeline.py  # Document ingestion + vector search
│       └── main.py
│
├── docker-compose.yml
├── nginx.conf
└── .github/workflows/ci-cd.yml
```

---

## 🤖 AI Models & Modes

### Models
| Model | Context | Use Case |
|---|---|---|
| **AuroVex 1** | 128k | Fast, lightweight automation |
| **AuroVex 1.5** | 1M | Flagship reasoning & analysis |
| **Claude 3.5 Sonnet** | 200k | Complex writing & code |
| **Gemini Pro** | 1M | Multimodal & search tasks |
| **GPT-4o** | 128k | General enterprise use |

### Agent Modes
`General AI` · `Sales AI` · `Support AI` · `Marketing AI` · `SEO AI` · `HR AI` · `Legal AI` · `Finance AI` · `Coding AI` · `Research AI` · `Writing AI`

---

## 🏭 Industry Verticals

| Industry | Agent Role | Key Capability |
|---|---|---|
| 🏥 Healthcare | Patient Triage Specialist | HIPAA-compliant intake, symptom qualification |
| 🏢 Real Estate | Virtual Property Broker | MLS sync, tour booking, buyer qualification |
| 🎓 Education | Admissions Advisor | Registration, FAQ resolution, tutor scheduling |
| 🛍️ Retail | Omnichannel Concierge | Inventory tracking, loyalty rewards, returns |
| 🏦 Banking | Compliance Officer AI | SEC parsing, credit underwriting, SOC2 audits |
| ✈️ Travel | Booking Coordinator | Flight/hotel booking, cancellation processing |
| 🛒 E-commerce | Cart Recovery Agent | SMS/WhatsApp cart recovery, discount coupons |

---

## 🗄 Database Schema

**20+ tables across 5 domains:**

- **Identity**: `users` · `organizations` · `workspaces` · `teams` · `roles` · `permissions`
- **Conversations**: `chats` · `messages` · `attachments`
- **Agents**: `agents` · `models` · `knowledge_documents` · `embeddings`
- **Billing**: `subscriptions` · `payments` · `usage_logs`
- **Security**: `sessions` · `api_keys` · `audit_logs` · `notifications`

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#111111` |
| Secondary (Emerald) | `#16A34A` |
| Accent | `#22C55E` |
| Background | `#FFFFFF` |
| Card | `#FAFAFA` |
| Border | `#E5E7EB` |
| Radius | `16px` (rounded-2xl) |
| Font | Inter |

---

## 🔒 Security

- JWT Bearer token authentication
- Role-Based Access Control (RBAC)
- SSO + MFA support
- Cryptographically signed audit trails
- HIPAA & SOC2 compliant data handling
- Zero-knowledge vector embeddings

---

## 📄 Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/auromindai
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
```

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <strong>Built with ❤️ by the AuromindAI Team</strong><br/>
  <a href="https://github.com/growwdigitel-arch/auromindai">GitHub</a> ·
  <a href="http://localhost:3000">Demo</a> ·
  <a href="http://localhost:8000/docs">API Docs</a>
</div>
