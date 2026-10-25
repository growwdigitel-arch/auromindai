import React from 'react';
import {
  Lightbulb,
  Code2,
  Cpu,
  Network,
  LineChart,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Layers,
  Database,
  Lock,
  Workflow,
  Search,
  Users,
  Compass,
  BarChart3,
  Bot
} from 'lucide-react';

export interface ServiceDetail {
  id: string;
  slug: string;
  aliases: string[];
  title: string;
  shortDesc: string;
  tagline: string;
  iconName: string;
  timeline: string;
  roiMetric: string;
  roiLabel: string;
  overview: string;
  heroHighlight: string;
  challenges: {
    title: string;
    description: string;
  }[];
  solutions: {
    title: string;
    description: string;
  }[];
  deliverables: {
    title: string;
    description: string;
    outcome: string;
  }[];
  techStack: {
    category: string;
    technologies: string[];
  }[];
  architectureSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  caseStudy: {
    clientType: string;
    problem: string;
    solution: string;
    results: { label: string; metric: string }[];
  };
  idealFor: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'strategy',
    slug: 'strategy',
    aliases: ['ai-strategy-consulting', 'strategy-consulting'],
    title: 'AI Strategy & Consulting',
    tagline: 'Strategic Feasibility, Governance & Enterprise AI Readiness',
    shortDesc: 'Identify high-impact AI opportunities, quantify business ROI, and build an actionable execution roadmap.',
    iconName: 'Lightbulb',
    timeline: '1 - 2 Weeks',
    roiMetric: '3x - 8x',
    roiLabel: 'Projected 12-Month ROI',
    heroHighlight: 'De-risk your AI transformation with an objective, data-backed feasibility audit and clear 90-day milestone blueprint.',
    overview: 'Before committing millions to AI engineering, organizations need absolute clarity on operational bottlenecks, proprietary data readiness, and quantifiable ROI. Our AI Strategy & Consulting practice bridges high-level executive vision with deep technical feasibility.',
    challenges: [
      {
        title: 'Unclear AI Value Proposition',
        description: 'Organizations frequently pilot generative AI prototypes without clear business metrics, leading to stalled initiatives and wasted engineering resources.'
      },
      {
        title: 'Unstructured & Fragmented Data',
        description: 'Enterprise data is siloed across legacy CRMs, ERPs, unstructured PDFs, and shared drives with zero vector indexing or semantic readiness.'
      },
      {
        title: 'Compliance & IP Risk',
        description: 'Concerns surrounding data privacy, confidential IP exposure in public LLMs, and impending regulatory guidelines (EU AI Act, HIPAA, SOC 2).'
      }
    ],
    solutions: [
      {
        title: 'Rigorous Feasibility & ROI Modeling',
        description: 'We calculate exact cost-benefit matrices, token expenditure estimates, and labor savings for each prioritized workflow.'
      },
      {
        title: 'Data Architecture & Cleanliness Audit',
        description: 'We inspect your database schemas, internal documents, and vector readiness to determine exactly what can be reliably automated.'
      },
      {
        title: 'Enterprise Governance Blueprint',
        description: 'Zero-retention model agreements, deterministic guardrails, and role-based access control to keep confidential company data secure.'
      }
    ],
    deliverables: [
      {
        title: 'Operational AI Readiness & Data Audit',
        description: 'A deep-dive technical audit of your proprietary datasets, internal APIs, and operational bottlenecks.',
        outcome: 'Definitive gap analysis report highlighting automation opportunities.'
      },
      {
        title: 'Use-Case Prioritization Matrix',
        description: 'A quantitative evaluation scoring each potential use-case by technical complexity, development cost, and anticipated ROI.',
        outcome: 'Ranked list of top 3 high-leverage AI initiatives.'
      },
      {
        title: 'Comprehensive 90-Day Execution Roadmap',
        description: 'Detailed sprints, milestone schedules, team resource requirements, and risk mitigation strategies.',
        outcome: 'Board-ready tactical execution deck.'
      },
      {
        title: 'Data Governance & Security Blueprint',
        description: 'Security architecture addressing private VPC deployments, deterministic guardrails, and data sovereignty compliance.',
        outcome: 'Enterprise-grade legal and technical security protocol.'
      }
    ],
    techStack: [
      {
        category: 'Foundational Models',
        technologies: ['Claude 3.5 Sonnet', 'GPT-4o', 'Llama 3.3 70B', 'Mistral Large']
      },
      {
        category: 'Vector & Knowledge',
        technologies: ['Pinecone', 'pgvector', 'ChromaDB', 'Qdrant']
      },
      {
        category: 'Benchmarking & Tracing',
        technologies: ['Langfuse', 'Helicone', 'DeepEval', 'Prometheus']
      },
      {
        category: 'Cloud & Infrastructure',
        technologies: ['AWS Bedrock', 'GCP Vertex AI', 'Azure OpenAI', 'Private VPC']
      }
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Discovery & Telemetry Audit',
        description: 'We shadow your operations, analyze staff hours, and map end-to-end data pipelines.'
      },
      {
        step: '02',
        title: 'Semantic Vector Feasibility',
        description: 'We test sample enterprise documents against multi-retrieval benchmarks to verify accuracy.'
      },
      {
        step: '03',
        title: 'Financial & ROI Modeling',
        description: 'We calculate token economics, inference hardware costs, and labor time reclaimed.'
      },
      {
        step: '04',
        title: 'Executive Roadmap Delivery',
        description: 'We deliver an actionable 90-day sprint schedule ready for implementation.'
      }
    ],
    caseStudy: {
      clientType: 'Mid-Market Logistics Firm ($85M ARR)',
      problem: 'Freight brokers spent 4.2 hours daily parsing carrier PDF quotes, emails, and customs paperwork.',
      solution: 'Auromind conducted a 2-week feasibility audit, mapped the automated extraction architecture, and engineered a proof-of-value workflow.',
      results: [
        { label: 'Time Reclaimed Daily', metric: '3.5 Hrs / Broker' },
        { label: 'Projected 12-Month ROI', metric: '6.4x' },
        { label: 'Quote Turnaround Time', metric: 'Down 78%' }
      ]
    },
    idealFor: [
      'Enterprises planning an AI adoption budget over $50k and needing risk mitigation.',
      'SaaS founders exploring domain-specific AI copilot features for their existing platforms.',
      'Operations directors seeking to automate document-heavy workflows without hallucination risks.',
      'Companies needing compliance frameworks (HIPAA, SOC 2, ISO 27001) for private LLM usage.'
    ],
    faqs: [
      {
        question: 'How long does an AI Strategy engagement take?',
        answer: 'Our standard strategic audit and roadmap takes between 1 and 2 weeks. By Day 14, you receive an executive presentation, technical data audit, and a complete 90-day implementation plan.'
      },
      {
        question: 'Do you write any prototype code during the strategy phase?',
        answer: 'Yes! We conduct technical sandbox validation on small samples of your enterprise data to benchmark RAG retrieval precision and model feasibility before recommending an architecture.'
      },
      {
        question: 'Will our proprietary data be used to train external models?',
        answer: 'Never. We enforce zero-data retention agreements with model providers and design all architectures with private VPCs, local fine-tuning, or enterprise endpoint guarantees.'
      },
      {
        question: 'Can you help us build the solution after the strategy phase?',
        answer: 'Absolutely. Over 85% of our consulting clients seamlessly roll into our Custom AI Development or Fast-Track 4-Week Production Pilot.'
      }
    ]
  },
  {
    id: 'development',
    slug: 'development',
    aliases: ['custom-ai-development', 'bespoke-ai-development'],
    title: 'Custom AI Development',
    tagline: 'Bespoke LLMs, Multi-Agent Swarms & Domain AI Architecture',
    shortDesc: 'Tailored LLM applications, autonomous swarms, and bespoke algorithms engineered for your unique business logic.',
    iconName: 'Code2',
    timeline: '3 - 6 Weeks',
    roiMetric: '100%',
    roiLabel: 'Proprietary IP Ownership',
    heroHighlight: 'Move beyond generic wrappers. We build enterprise-grade, deterministic AI platforms designed specifically for your proprietary business logic.',
    overview: 'Generic consumer chatbots fail in enterprise environments where accuracy, zero-latency execution, and brand consistency are non-negotiable. Auromind AI engineers bespoke multi-agent architectures, domain fine-tuned models, and hybrid retrieval systems that operate autonomously with human-in-the-loop oversight.',
    challenges: [
      {
        title: 'Hallucinations & Inconsistent Outputs',
        description: 'Standard foundational LLMs hallucinate numbers, cite outdated policy, and lack deterministic guardrails required for regulated industries.'
      },
      {
        title: 'Multi-Step Execution Failures',
        description: 'Single-prompt bots cannot perform complex workflows that require checking databases, validating conditions, and updating systems sequentially.'
      },
      {
        title: 'Vendor Lock-in & Data Privacy',
        description: 'Relying on closed-source third-party SaaS wrappers leaves your core business processes vulnerable to price hikes and service outages.'
      }
    ],
    solutions: [
      {
        title: 'Autonomous Multi-Agent Swarms',
        description: 'We orchestrate specialized agents (e.g. Researcher, Synthesizer, Validator, Executor) that cross-check each other for zero-error execution.'
      },
      {
        title: 'Domain Fine-Tuning & Hybrid RAG',
        description: 'We combine vector semantic search, BM25 keyword matching, and cross-encoder re-ranking for 99.4% factual precision.'
      },
      {
        title: '100% IP & Private Cloud Ownership',
        description: 'All weights, pipelines, and application source code are deployed inside your own cloud infrastructure with full ownership.'
      }
    ],
    deliverables: [
      {
        title: 'Custom Multi-Agent Orchestration Engine',
        description: 'Autonomous agents capable of multi-step reasoning, external tool calling, and deterministic self-correction.',
        outcome: 'Production-ready agentic swarm integrated into your stack.'
      },
      {
        title: 'Hybrid Vector & Graph RAG Pipeline',
        description: 'Sub-second document indexing and retrieval over millions of unstructured corporate pages.',
        outcome: 'Instant, hallucination-free factual retrieval engine.'
      },
      {
        title: 'Deterministic Guardrail & Safety Layer',
        description: 'Rule-based and LLM-assisted filters that prevent jailbreaks, prompt injection, and off-brand outputs.',
        outcome: 'Enterprise-grade reliability and regulatory safety.'
      },
      {
        title: 'Private VPC Deployment & Containerization',
        description: 'Dockerized microservices deployed on AWS, GCP, or Azure with auto-scaling inference endpoints.',
        outcome: 'Full source code, CI/CD pipelines, and infrastructure as code (IaC).'
      }
    ],
    techStack: [
      {
        category: 'Agent Orchestration',
        technologies: ['LangGraph', 'CrewAI', 'AutoGen', 'FastAPI']
      },
      {
        category: 'Vector & Search Engines',
        technologies: ['Pinecone', 'pgvector', 'Weaviate', 'Elasticsearch BM25']
      },
      {
        category: 'Inference & Serving',
        technologies: ['vLLM', 'Triton Inference Server', 'Ollama', 'RunPod']
      },
      {
        category: 'Evaluation & Telemetry',
        technologies: ['Langfuse', 'Ragas', 'Trulens', 'OpenTelemetry']
      }
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Domain Corpus Ingestion',
        description: 'Chunking, embedding, and indexing enterprise knowledge bases into optimized vector namespaces.'
      },
      {
        step: '02',
        title: 'Multi-Agent Tool Binding',
        description: 'Equipping agents with deterministic tools (SQL query generators, API invokers, email dispatchers).'
      },
      {
        step: '03',
        title: 'Eval Suite & Stress Testing',
        description: 'Running 500+ synthetic edge-case tests to ensure zero hallucinations and guardrail compliance.'
      },
      {
        step: '04',
        title: 'Staging & Production Handover',
        description: 'Deploying containerized microservices to your cloud with automated CI/CD and telemetry.'
      }
    ],
    caseStudy: {
      clientType: 'Commercial Real Estate Brokerage',
      problem: 'Handling 3,000+ incoming monthly tenant leads across WhatsApp, web chat, and email was taking 18 hours per qualification.',
      solution: 'Auromind engineered an autonomous multi-agent property advisor connected to MLS databases, appointment calendars, and WhatsApp Cloud API.',
      results: [
        { label: 'Lead Response Time', metric: '< 8 seconds' },
        { label: 'Qualified Viewing Bookings', metric: '+64% lift' },
        { label: 'Human Labor Saved', metric: '140 hrs/month' }
      ]
    },
    idealFor: [
      'Enterprises with proprietary business workflows that off-the-shelf software cannot address.',
      'Companies wanting to build proprietary software IP to increase company enterprise valuation.',
      'Businesses requiring sub-second response times and high-throughput autonomous task execution.',
      'Regulated industries (healthcare, legal, finance) demanding strict deterministic guardrails.'
    ],
    faqs: [
      {
        question: 'Who owns the intellectual property and code?',
        answer: 'You do. 100% of the code, fine-tuned model checkpoints, vector database configurations, and workflows belong entirely to your company.'
      },
      {
        question: 'How do you prevent hallucinations in critical business logic?',
        answer: 'We utilize strict Hybrid RAG with citations, confidence scoring thresholds, and deterministic schema validators. If the model is not 99%+ confident, it gracefully routes to human review.'
      },
      {
        question: 'Can this run in our existing AWS/Azure/GCP account?',
        answer: 'Yes. We build cloud-agnostic containerized architectures (Docker, Kubernetes) and deploy directly into your private VPC, maintaining all compliance perimeters.'
      },
      {
        question: 'What is the typical development timeline?',
        answer: 'A standard custom AI build takes between 3 and 6 weeks from kick-off to staging and production handover.'
      }
    ]
  },
  {
    id: 'automation',
    slug: 'automation',
    aliases: ['ai-automation-workflows', 'workflow-automation'],
    title: 'AI Automation & Workflows',
    tagline: 'Autonomous Process Execution & Intelligent Document Intelligence',
    shortDesc: 'Automate repetitive back-office and customer-facing tasks to achieve maximum throughput with zero errors.',
    iconName: 'Cpu',
    timeline: '2 - 4 Weeks',
    roiMetric: '70%+',
    roiLabel: 'Labor Time Reduction',
    heroHighlight: 'Eliminate manual copy-pasting, invoice processing, and ticket queues with autonomous pipelines running 24/7/365.',
    overview: 'High-value employees shouldn’t spend half their workdays extracting invoice tables, manually categorizing support tickets, or reconciling spreadsheets. Auromind AI builds resilient, self-healing automated workflows that ingest unstructured data and execute complex multi-system operations with zero human latency.',
    challenges: [
      {
        title: 'Manual Document Ingestion Delays',
        description: 'Processing invoices, bills of lading, contracts, and medical forms takes hours of manual data entry and is prone to human typing errors.'
      },
      {
        title: 'Disconnected Software Silos',
        description: 'Critical business data is trapped between disparate platforms (ERP, CRM, email, accounting software), requiring painful human bridges.'
      },
      {
        title: 'Backlogs During Peak Spikes',
        description: 'When transaction or support volume doubles, operations stall, customers complain, and hiring temporary staff incurs steep overhead.'
      }
    ],
    solutions: [
      {
        title: 'Vision-Enabled Document Intelligence',
        description: 'OCR and multimodal models extract unstructured tables, handwritten notes, and complex line-items into clean structured JSON.'
      },
      {
        title: 'Self-Healing Event-Driven Triggers',
        description: 'Asynchronous workers and webhook listeners process thousands of incoming documents instantly with automated retry logic.'
      },
      {
        title: 'Human-in-the-Loop Review Portals',
        description: 'Flag low-confidence edge cases to human operators with one-click verification, perpetually improving model accuracy over time.'
      }
    ],
    deliverables: [
      {
        title: 'Intelligent Document Processing (IDP) Pipeline',
        description: 'Automated extraction of invoices, receipts, tax forms, and IDs with 99.2% line-item precision.',
        outcome: 'Instant JSON data extraction integrated directly into your ERP/database.'
      },
      {
        title: 'Autonomous Email & Support Triage Flow',
        description: 'Classifies incoming inquiries, extracts sentiment, pulls relevant account data, and drafts contextual responses.',
        outcome: 'Immediate resolution of 60%+ repetitive tickets.'
      },
      {
        title: 'Multi-System Synchronization Engine',
        description: 'Bridges legacy databases, cloud spreadsheets, and modern SaaS without manual human double-entry.',
        outcome: 'Zero-latency data synchronization across departments.'
      },
      {
        title: 'Human-in-the-Loop Exception Dashboard',
        description: 'A clean web interface for staff to inspect flagged items, approve bulk payouts, or amend edge cases.',
        outcome: 'Operational safety and audit trails for compliance.'
      }
    ],
    techStack: [
      {
        category: 'Vision & Extraction',
        technologies: ['GPT-4o Vision', 'Claude 3.5 Sonnet', 'Tesseract OCR', 'AWS Textract']
      },
      {
        category: 'Orchestration & Queues',
        technologies: ['Celery', 'Redis', 'RabbitMQ', 'n8n', 'Apache Airflow']
      },
      {
        category: 'Database & Storage',
        technologies: ['PostgreSQL', 'Supabase', 'AWS S3', 'MongoDB']
      },
      {
        category: 'Integration Protocols',
        technologies: ['RESTful Webhooks', 'gRPC', 'Zapier CLI', 'GraphQL']
      }
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Document Ingestion & Parsing',
        description: 'Incoming files from emails, uploads, or APIs are normalized and processed through vision models.'
      },
      {
        step: '02',
        title: 'Deterministic Validation',
        description: 'Extracted totals, dates, and tax IDs are mathematically verified against accounting rules.'
      },
      {
        step: '03',
        title: 'Downstream ERP Dispatch',
        description: 'Clean data is automatically posted via secure API into QuickBooks, SAP, or internal databases.'
      },
      {
        step: '04',
        title: 'Telemetry & Feedback Loop',
        description: 'Execution logs are recorded, and human corrections automatically refine extraction prompts.'
      }
    ],
    caseStudy: {
      clientType: 'Medical Billing & Healthcare Group',
      problem: 'Clinic staff manually keyed in 1,200 patient intake forms and insurance pre-authorizations weekly, causing a 48-hour backlog.',
      solution: 'Auromind deployed an intelligent document parsing pipeline with automated insurance eligibility verification.',
      results: [
        { label: 'Intake Processing Time', metric: '2 mins (was 45m)' },
        { label: 'Billing Error Rate', metric: 'Reduced by 92%' },
        { label: 'Staff Overtime Hours', metric: 'Zero overtime' }
      ]
    },
    idealFor: [
      'Companies processing over 500 documents (invoices, claims, contracts) monthly.',
      'Customer support teams buried under tier-1 repetitive questions and routing tasks.',
      'Supply chain and logistics operators managing multi-vendor bills of lading.',
      'Financial services firms needing rapid, error-free statement and KYC verification.'
    ],
    faqs: [
      {
        question: 'What happens if a document has handwritten or blurry text?',
        answer: 'Our hybrid pipeline utilizes high-resolution vision LLMs trained on complex handwriting. If a field fails confidence thresholds, it is automatically routed to your staff’s review portal.'
      },
      {
        question: 'Can this integrate with our legacy on-premise software?',
        answer: 'Yes. We build custom API bridges, database listeners, and secure VPN connectors that seamlessly interface with legacy systems without requiring a complete software rewrite.'
      },
      {
        question: 'How fast can an automated pipeline be deployed?',
        answer: 'Most single-process automation workflows (such as invoice extraction or lead triage) are fully operational in staging within 10 to 14 business days.'
      },
      {
        question: 'Is human verification still supported?',
        answer: 'Yes! We configure human-in-the-loop triggers based on dollar thresholds or confidence scores, giving your team total control.'
      }
    ]
  },
  {
    id: 'integration',
    slug: 'integration',
    aliases: ['ai-ecosystem-integration', 'ecosystem-integration'],
    title: 'AI Ecosystem Integration',
    tagline: 'Frictionless Pipeline & Omnichannel Enterprise API Sync',
    shortDesc: 'Integrate AI seamlessly with your existing CRM, ERP, WhatsApp, and database infrastructure.',
    iconName: 'Network',
    timeline: '1 - 3 Weeks',
    roiMetric: '0 min',
    roiLabel: 'Manual Double-Entry Delay',
    heroHighlight: 'Supercharge your existing tools with artificial intelligence. Connect AI directly into Salesforce, HubSpot, WhatsApp, and internal SQL databases.',
    overview: 'The greatest AI model is useless if it exists in an isolated island. Auromind AI connects conversational intelligence and agentic workflows directly into your everyday business applications. From official WhatsApp Business Cloud API to Salesforce, HubSpot, Shopify, and enterprise Postgres clusters, we make AI an organic extension of your infrastructure.',
    challenges: [
      {
        title: 'Isolated Data Islands',
        description: 'Customer conversations on WhatsApp and web chat are disconnected from CRM records, forcing sales reps to manually copy contact details.'
      },
      {
        title: 'Complex API Rate Limits & Webhook Drops',
        description: 'Building reliable enterprise integrations requires handling OAuth refreshes, webhook concurrency, exponential backoffs, and idempotency.'
      },
      {
        title: 'Legacy System Inflexibility',
        description: 'Outdated ERPs and legacy databases lack modern GraphQL or REST endpoints, making AI integration seem impossibly daunting.'
      }
    ],
    solutions: [
      {
        title: 'Bi-Directional Real-Time Synchronization',
        description: 'Every customer interaction instantly updates CRM deal stages, logs conversation transcripts, and triggers downstream task creation.'
      },
      {
        title: 'Official WhatsApp Business Cloud Architecture',
        description: 'High-throughput verified Meta WhatsApp Business integrations with interactive buttons, carousels, and catalog browsing.'
      },
      {
        title: 'Enterprise Middleware & Secure Webhook Bus',
        description: 'Robust microservice middleware with guaranteed message delivery, HMAC validation, and zero dropped payloads.'
      }
    ],
    deliverables: [
      {
        title: 'Official Meta WhatsApp Business Cloud Integration',
        description: 'Direct Meta Graph API setup with green-tick verification support, template message management, and media handling.',
        outcome: 'Omnichannel conversational sales & support directly on WhatsApp.'
      },
      {
        title: 'CRM Bi-Directional Connector (Salesforce / HubSpot / Zoho)',
        description: 'Real-time lead creation, field updates, sentiment tagging, and automatic deal stage advancement.',
        outcome: 'Sales reps receive pre-qualified deals with zero manual data entry.'
      },
      {
        title: 'Enterprise SQL & Internal DB Connectors',
        description: 'Secure, read-only or transactional database query engines that allow AI agents to check live inventory, orders, and balances.',
        outcome: 'Real-time customer answers based on live database state.'
      },
      {
        title: 'Custom RESTful Microservice & Webhook Bus',
        description: 'High-availability middleware with automated retry queues, rate-limit buffers, and end-to-end encryption.',
        outcome: 'Reliable, hardened integration pipeline with 99.99% uptime.'
      }
    ],
    techStack: [
      {
        category: 'Messaging & Channels',
        technologies: ['Meta WhatsApp Cloud API', 'Telegram Bot API', 'Slack API', 'Twilio SMS']
      },
      {
        category: 'CRM & Commerce',
        technologies: ['Salesforce REST API', 'HubSpot v3 API', 'Shopify GraphQL', 'Zoho CRM']
      },
      {
        category: 'Middleware & Gateways',
        technologies: ['FastAPI', 'Node.js', 'Kong Gateway', 'Redis BullMQ']
      },
      {
        category: 'Security & Auth',
        technologies: ['OAuth 2.0', 'HMAC SHA-256', 'AWS Secrets Manager', 'TLS 1.3']
      }
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'API Authentication & Token Vaulting',
        description: 'Securing credentials in encrypted cloud parameter stores with automatic secret rotation.'
      },
      {
        step: '02',
        title: 'Bi-Directional Schema Mapping',
        description: 'Mapping AI agent parameters to your CRM fields and inventory database tables.'
      },
      {
        step: '03',
        title: 'Idempotency & Concurrency Hardening',
        description: 'Configuring Redis distributed locks and deduplication keys to prevent double-charging or duplicate contacts.'
      },
      {
        step: '04',
        title: 'Live End-to-End Handshake Testing',
        description: 'Simulating high-volume traffic bursts to verify seamless sync across all connected platforms.'
      }
    ],
    caseStudy: {
      clientType: 'Omnichannel D2C Brand ($30M Gross Volume)',
      problem: 'Customer service agents had to open 5 separate tabs (WhatsApp, Shopify, Zendesk, Stripe, DHL) to answer simple delivery questions.',
      solution: 'Auromind engineered an integrated ecosystem pipeline unifying WhatsApp, Shopify GraphQL, and shipping tracking directly into one autonomous agent.',
      results: [
        { label: 'Instant Order Lookup', metric: '< 2 seconds' },
        { label: 'Tier-1 Ticket Deflection', metric: '68%' },
        { label: 'Repeat Purchase Rate', metric: '+18% boost' }
      ]
    },
    idealFor: [
      'Companies using HubSpot or Salesforce that want AI to update records and book meetings automatically.',
      'E-commerce brands seeking direct WhatsApp conversational commerce with catalog checkout.',
      'SaaS platforms needing to connect customer dashboards with modern AI inference APIs.',
      'Organizations frustrated by disjointed third-party automation tools hitting rate limits.'
    ],
    faqs: [
      {
        question: 'Will our existing team workflows be interrupted during integration?',
        answer: 'No. We develop in isolated staging environments and use non-destructive webhook listeners, ensuring zero downtime for your existing staff.'
      },
      {
        question: 'Can you assist us with WhatsApp Business API verification?',
        answer: 'Yes. We guide you through the entire Meta Business verification process, phone number migration, display name approval, and template registration.'
      },
      {
        question: 'What happens if a third-party CRM API goes down?',
        answer: 'Our middleware includes persistent Redis dead-letter queues. Any dropped webhook is automatically retried with exponential backoff as soon as the service recovers.'
      },
      {
        question: 'Is patient or credit card data safe during transmission?',
        answer: 'All data is encrypted in transit via TLS 1.3 and at rest with AES-256. Sensitive PII can be tokenized or masked before reaching any AI model.'
      }
    ]
  },
  {
    id: 'analytics',
    slug: 'analytics',
    aliases: ['data-predictive-analytics', 'predictive-analytics'],
    title: 'Data & Predictive Analytics',
    tagline: 'High-Dimensional Vector Search & Predictive Enterprise Intelligence',
    shortDesc: 'Transform unstructured enterprise data into predictive, actionable intelligence in sub-second queries.',
    iconName: 'LineChart',
    timeline: '2 - 4 Weeks',
    roiMetric: '< 1s',
    roiLabel: 'Knowledge Retrieval Latency',
    heroHighlight: 'Unlock the goldmine buried inside company PDFs, historical sales records, customer chats, and operational databases.',
    overview: 'Most enterprise intelligence is trapped inside unstructured formats: years of customer support transcripts, contract archives, and disconnected SQL tables. Auromind AI builds semantic vector search engines and predictive machine learning models that deliver conversational business intelligence, churn forecasting, and sub-second anomaly detection.',
    challenges: [
      {
        title: 'Dark Data & Unsearchable Archives',
        description: 'Crucial company insights remain buried inside thousands of PDFs, spreadsheets, and emails that traditional SQL queries cannot search.'
      },
      {
        title: 'Reactive Rather Than Predictive Decisions',
        description: 'Leadership discovers customer churn, supply shortages, or operational bottlenecks weeks after they occur rather than predicting them in advance.'
      },
      {
        title: 'Complex Query Bottlenecks',
        description: 'Business executives wait days for data engineering teams to write complex SQL scripts just to answer simple operational questions.'
      }
    ],
    solutions: [
      {
        title: 'Conversational Business Intelligence (Text-to-SQL)',
        description: 'Ask questions in plain English ("What were our top 3 grossing product lines last month?") and receive instant charted answers.'
      },
      {
        title: 'High-Dimensional Vector Knowledge Graphs',
        description: 'Index millions of unstructured documents with semantic understanding, allowing instant cross-referencing and contextual retrieval.'
      },
      {
        title: 'Predictive Churn & Demand Modeling',
        description: 'Machine learning algorithms that analyze customer behavior signals to predict account health and inventory demand.'
      }
    ],
    deliverables: [
      {
        title: 'Enterprise Conversational BI (Text-to-SQL / Text-to-Chart)',
        description: 'Self-serve analytical assistant allowing executives to query data lakes and databases using natural language.',
        outcome: 'Instant executive reporting without data team backlog.'
      },
      {
        title: 'High-Density Semantic Search Engine',
        description: 'Sub-second neural search across internal manuals, research papers, legal contracts, and historical tickets.',
        outcome: 'Staff find exact answers and source citations in seconds.'
      },
      {
        title: 'Predictive Churn & Lead Scoring Models',
        description: 'Machine learning classifiers that flag at-risk accounts and prioritize sales leads with highest conversion likelihood.',
        outcome: 'Proactive retention outreach and higher sales win-rates.'
      },
      {
        title: 'Executive Telemetry & KPI Dashboard',
        description: 'Interactive visualization portal with real-time agent metrics, conversation sentiment, and operational throughput.',
        outcome: 'Full visibility into enterprise AI impact and performance.'
      }
    ],
    techStack: [
      {
        category: 'Vector & Search Engines',
        technologies: ['ChromaDB', 'Qdrant', 'ClickHouse', 'Elasticsearch']
      },
      {
        category: 'Analytics & ML Frameworks',
        technologies: ['Pandas', 'NumPy', 'Scikit-Learn', 'DuckDB']
      },
      {
        category: 'Embeddings & Rerankers',
        technologies: ['text-embedding-3-large', 'Cohere Rerank 3', 'BGE-M3']
      },
      {
        category: 'Visualization & UI',
        technologies: ['Next.js', 'Recharts', 'Tailwind CSS', 'Grafana']
      }
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Data Lake Ingestion & Cleaning',
        description: 'Extracting historical data from data warehouses, S3 buckets, and CRM archives.'
      },
      {
        step: '02',
        title: 'High-Dimensional Embedding',
        description: 'Generating optimized vector embeddings with domain-specific metadata tags.'
      },
      {
        step: '03',
        title: 'Semantic Search & Re-ranking',
        description: 'Configuring multi-stage retrieval pipelines for sub-second query latency.'
      },
      {
        step: '04',
        title: 'Interactive Dashboard Deployment',
        description: 'Deploying real-time analytical dashboards with role-based data visibility.'
      }
    ],
    caseStudy: {
      clientType: 'B2B FinTech & Corporate Card Platform',
      problem: 'Customer success reps couldn’t detect leading indicators of customer churn until accounts canceled subscriptions.',
      solution: 'Auromind built a predictive telemetry engine analyzing transaction frequency changes and customer support sentiment.',
      results: [
        { label: 'Early Churn Detection', metric: '30 days in advance' },
        { label: 'Customer Churn Reduction', metric: '-24% decrease' },
        { label: 'Query Resolution Speed', metric: 'Sub-second (<600ms)' }
      ]
    },
    idealFor: [
      'Organizations with vast archives of documents, emails, or tickets that need fast semantic querying.',
      'Executive teams needing real-time business intelligence without submitting JIRA tickets to data analysts.',
      'Subscription businesses seeking to predict and mitigate customer churn before renewals.',
      'Supply chain operators forecasting SKU inventory demands based on seasonal trends.'
    ],
    faqs: [
      {
        question: 'Can Text-to-SQL accidentally delete or corrupt our database?',
        answer: 'Never. Our Text-to-SQL architecture connects strictly through read-only database replicas with restricted user permissions, preventing any data modification or schema tampering.'
      },
      {
        question: 'How large of a document archive can your search engine handle?',
        answer: 'Our distributed vector architectures scale to tens of millions of documents with sub-second retrieval latency using modern vector indexing (HNSW, IVFFlat).'
      },
      {
        question: 'Can we restrict sensitive documents so only certain staff can query them?',
        answer: 'Yes. We implement robust role-based access control (RBAC) and metadata filtering, ensuring employees only retrieve documents they are authorized to view.'
      },
      {
        question: 'Does the system integrate with PowerBI, Tableau, or Snowflake?',
        answer: 'Yes. We can output enriched vectors, classifications, and predictions back into your Snowflake, BigQuery, or PowerBI pipelines.'
      }
    ]
  },
  {
    id: 'support',
    slug: 'support',
    aliases: ['ongoing-support-optimization', 'support-optimization'],
    title: 'Ongoing Support & Optimization',
    tagline: '24/7 Enterprise Reliability, Model Drift Prevention & Perpetual Fine-Tuning',
    shortDesc: 'Continuous telemetry monitoring, latency reduction, security patches, and model fine-tuning.',
    iconName: 'Headphones',
    timeline: 'Monthly SLA',
    roiMetric: '99.98%',
    roiLabel: 'Platform Availability SLA',
    heroHighlight: 'AI systems are living software. We provide dedicated engineers who monitor prompt performance, mitigate model drift, optimize API costs, and guarantee 99.98% production uptime.',
    overview: 'Deploying an AI model is only Day One. As foundational LLMs update, consumer vocabulary evolves, and company catalogs expand, AI applications require continuous observation. Auromind AI provides dedicated ongoing support, continuous model fine-tuning, latency optimization, and 24/7 security monitoring so your AI infrastructure perpetually outperforms expectations.',
    challenges: [
      {
        title: 'Model Drift & Performance Degradation',
        description: 'Over time, shifts in user queries, new product launches, and foundational model updates degrade prompt accuracy without continuous calibration.'
      },
      {
        title: 'Runaway Token & Inference Costs',
        description: 'Unoptimized prompts, redundant context retrieval, and lack of intelligent caching lead to ballooning monthly API expenditures.'
      },
      {
        title: 'Unmonitored Production Edge Cases',
        description: 'Silent failures, slow latency spikes during peak hours, and adversarial prompt injections go unnoticed without 24/7 telemetry.'
      }
    ],
    solutions: [
      {
        title: 'Continuous Prompt Tuning & Eval Suites',
        description: 'We run weekly automated benchmark suites against hundreds of edge cases to guarantee accuracy never regresses.'
      },
      {
        title: 'Token Cost Compression & Semantic Caching',
        description: 'We implement semantic caching (Redis / GPTCache) and compact prompt distillation to slash monthly API bills by up to 50%.'
      },
      {
        title: '24/7 Telemetry & Guaranteed SLA Response',
        description: 'Direct Slack bridge to senior AI engineers, real-time alerting, and guaranteed uptime SLAs for mission-critical workflows.'
      }
    ],
    deliverables: [
      {
        title: '24/7/365 Production Telemetry & Alerting',
        description: 'Real-time observation of token consumption, latency spikes, error rates, and hallucination metrics.',
        outcome: 'Zero downtime and instant proactive incident resolution.'
      },
      {
        title: 'Monthly Model Calibration & Prompt Optimization',
        description: 'Reviewing flagged conversations and updating vector embeddings, system prompts, and tool definitions.',
        outcome: 'Perpetually increasing accuracy as your business scales.'
      },
      {
        title: 'Inference Cost Optimization & Semantic Caching',
        description: 'Compressing system instructions and caching common answers in memory to drastically lower monthly inference costs.',
        outcome: '30% - 50% reduction in external API expenditures.'
      },
      {
        title: 'Dedicated Enterprise Slack Channel & Priority SLA',
        description: 'Direct access to our senior engineering team with guaranteed sub-15 minute response times for critical incidents.',
        outcome: 'Peace of mind with expert engineers backing your platform.'
      }
    ],
    techStack: [
      {
        category: 'Observability & Tracing',
        technologies: ['Langfuse', 'Helicone', 'Prometheus', 'Grafana']
      },
      {
        category: 'Caching & Cost Reduction',
        technologies: ['Redis Semantic Caching', 'GPTCache', 'Promptfoo', 'LiteLLM']
      },
      {
        category: 'Alerting & Incident Management',
        technologies: ['PagerDuty', 'AWS CloudWatch', 'Slack Webhooks', 'Datadog']
      },
      {
        category: 'Security & Patches',
        technologies: ['Snyk', 'Docker Bench', 'Trivy', 'HashiCorp Vault']
      }
    ],
    architectureSteps: [
      {
        step: '01',
        title: 'Telemetry Ingestion',
        description: 'Streaming all interaction logs, latency metrics, and user feedback into our central observability cluster.'
      },
      {
        step: '02',
        title: 'Automated Anomaly Detection',
        description: 'Detecting sudden shifts in query volume, prompt injection attempts, or degraded confidence scores.'
      },
      {
        step: '03',
        title: 'Weekly Optimization Sprints',
        description: 'Applying prompt tuning, retraining domain adapters, and updating vector indexes.'
      },
      {
        step: '04',
        title: 'Monthly Executive Review',
        description: 'Providing leadership with transparent reports detailing uptime, cost savings, and feature enhancements.'
      }
    ],
    caseStudy: {
      clientType: 'Enterprise EdTech Platform (1.2M Active Students)',
      problem: 'Monthly OpenAI API costs surged past $28,000 with occasional latency spikes of up to 9 seconds during exam weeks.',
      solution: 'Auromind deployed semantic Redis caching, prompt distillation, and intelligent multi-model routing.',
      results: [
        { label: 'Monthly API Cost Reduction', metric: '-46% ($13k saved/mo)' },
        { label: 'Average Response Latency', metric: 'Down to 780ms' },
        { label: 'Annual Production Uptime', metric: '99.99%' }
      ]
    },
    idealFor: [
      'Enterprises running live production AI agents where downtime directly impacts revenue.',
      'Companies spending more than $2,000/month on LLM tokens seeking immediate cost optimization.',
      'Organizations wanting senior AI engineering support without hiring full-time ML engineering teams.',
      'Businesses frequently launching new products requiring monthly prompt and vector updates.'
    ],
    faqs: [
      {
        question: 'What is your guaranteed response time for critical issues?',
        answer: 'Our Enterprise SLA includes guaranteed sub-15 minute response times for high-priority outages, backed by 24/7 on-call engineers.'
      },
      {
        question: 'Can you optimize systems that were built by another agency or internal team?',
        answer: 'Yes! We frequently conduct code & architecture audits on existing systems, instrument telemetry, and optimize prompt pipelines.'
      },
      {
        question: 'How do you help reduce our monthly OpenAI/Anthropic bills?',
        answer: 'We employ semantic caching to serve repeat queries instantly for $0, distill long prompts into compact formats, and route simple questions to smaller, faster models.'
      },
      {
        question: 'Is there a long-term contract lock-in?',
        answer: 'We offer flexible month-to-month SLA plans as well as discounted annual retainers, allowing you to adapt as your traffic scales.'
      }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  const normalized = slug.toLowerCase().trim();
  return servicesData.find(
    (s) => s.id === normalized || s.slug === normalized || s.aliases.includes(normalized)
  );
}
