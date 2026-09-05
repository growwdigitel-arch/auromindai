import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error('Failed to create data dir:', e);
  }
}

function readJsonFile<T>(filename: string, defaultValue: T): T {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultValue;
  }
}

function writeJsonFile<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
}

/* ────────────────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────────────── */
export interface EcommerceLead {
  id: string;
  name: string;
  phone: string;
  business: string;
  budget: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'proposal' | 'converted' | 'lost';
  source?: string;
  notes?: string;
}

export interface RealEstateLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company_type: string;
  lead_volume: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'tour_scheduled' | 'converted' | 'lost';
  notes?: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Client';
  plan: string;
  credits: number;
  status: 'Active' | 'Suspended' | 'Pending';
  joined: string;
  lastLogin: string;
  chats: number;
  tokens: number;
}

export interface AIModelConfig {
  id: string;
  name: string;
  provider: string;
  version: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  priority: number;
  active: boolean;
  price: number;
}

export interface SystemPrompt {
  id: string;
  title: string;
  category: string;
  description: string;
  prompt: string;
}

export interface AdminSettings {
  platformName: string;
  maintenanceMode: boolean;
  whitelist: string;
  geminiApiKey: string;
  defaultModel: string;
  temperature: number;
  maxTokens: number;
}

/* ────────────────────────────────────────────────────────
   INITIAL SEED DATA (Only used on very first boot if file is empty)
──────────────────────────────────────────────────────── */
const SEED_ECOMMERCE: EcommerceLead[] = [
  {
    id: 'ec-101',
    name: 'Rohan Mehta',
    phone: '+91 98765 43210',
    business: 'Aurelia Fashion Store',
    budget: '₹25k – ₹50k',
    submittedAt: '2026-09-05 10:15',
    status: 'new',
    source: 'Hero Form'
  },
  {
    id: 'ec-102',
    name: 'Priya Sharma',
    phone: '+91 98123 45678',
    business: 'Nature Harvest Organics',
    budget: '₹50k+',
    submittedAt: '2026-09-05 09:40',
    status: 'contacted',
    source: 'Strategy Call'
  },
  {
    id: 'ec-103',
    name: 'Vikram Malhotra',
    phone: '+91 99234 56789',
    business: 'StyleVault India',
    budget: '₹10k – ₹25k',
    submittedAt: '2026-09-04 18:20',
    status: 'proposal',
    source: 'Bottom Form'
  },
  {
    id: 'ec-104',
    name: 'Ananya Roy',
    phone: '+91 97345 67890',
    business: 'Aura Skin & Beauty',
    budget: '₹50k+',
    submittedAt: '2026-09-04 14:10',
    status: 'converted',
    source: 'Portfolio Section'
  }
];

const SEED_REAL_ESTATE: RealEstateLead[] = [
  {
    id: 're-201',
    name: 'Marcus Sterling',
    email: 'm.sterling@capitalgroup.com',
    phone: '+1 (555) 382-9012',
    company_type: 'Brokerage Owner',
    lead_volume: '200 – 500 leads/mo',
    submittedAt: '2026-09-05 10:45',
    status: 'new',
    notes: 'Verified pre-approved mortgage with Chase ($1.5M ceiling).'
  },
  {
    id: 're-202',
    name: 'Elena Rostova',
    email: 'elena.r@luxdesign.co',
    phone: '+1 (555) 721-4491',
    company_type: 'Property Developer',
    lead_volume: '500+ leads/mo',
    submittedAt: '2026-09-05 08:30',
    status: 'tour_scheduled',
    notes: 'Looking for modern minimalist villa with private pool.'
  },
  {
    id: 're-203',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@emiratesprime.ae',
    phone: '+971 50 882 1903',
    company_type: 'Developer',
    lead_volume: '500+ leads/mo',
    submittedAt: '2026-09-04 16:15',
    status: 'converted',
    notes: 'Deal closed on Oakwood Estate at $3.1M.'
  }
];

const SEED_USERS: PlatformUser[] = [
  { id: 'usr-1', name: 'Santhosh Kumar', email: 'santhosh@groww.digital', role: 'Owner', plan: 'Enterprise Pro', credits: 25000, status: 'Active', joined: '2026-05-12', lastLogin: 'Just now', chats: 342, tokens: 489000 },
  { id: 'usr-2', name: 'Jane Doe', email: 'jane.doe@clover.io', role: 'Client', plan: 'Free Plan', credits: 101, status: 'Active', joined: '2026-06-01', lastLogin: '12 mins ago', chats: 12, tokens: 18000 },
  { id: 'usr-3', name: 'Robert Chen', email: 'robert.c@apex.tech', role: 'Admin', plan: 'Pro SaaS', credits: 5000, status: 'Suspended', joined: '2026-02-18', lastLogin: '2 days ago', chats: 118, tokens: 210000 },
  { id: 'usr-4', name: 'Alice Watson', email: 'alice@vibe.agency', role: 'Member', plan: 'Enterprise Pro', credits: 15000, status: 'Active', joined: '2026-07-14', lastLogin: '1 hour ago', chats: 89, tokens: 145000 },
  { id: 'usr-5', name: 'Rohan Mehta', email: 'rohan@aurelia.in', role: 'Client', plan: 'Commerce Custom', credits: 8500, status: 'Active', joined: '2026-09-02', lastLogin: '3 hours ago', chats: 45, tokens: 62000 }
];

const SEED_MODELS: AIModelConfig[] = [
  { id: 'm-1', name: 'AuroVex 1.5 Lite', provider: 'Auromind', version: 'v1.5.2', maxTokens: 8192, temperature: 0.7, topP: 0.95, priority: 1, active: true, price: 0.15 },
  { id: 'm-2', name: 'AuroVex 1.5 Pro', provider: 'Auromind', version: 'v1.5.8', maxTokens: 16384, temperature: 0.4, topP: 0.9, priority: 2, active: true, price: 0.45 },
  { id: 'm-3', name: 'Gemini 2.5 Flash', provider: 'Google', version: 'v2.5', maxTokens: 32768, temperature: 1.0, topP: 0.95, priority: 3, active: true, price: 0.075 },
  { id: 'm-4', name: 'Gemini 2.5 Pro', provider: 'Google', version: 'v2.5-pro', maxTokens: 128000, temperature: 0.7, topP: 0.9, priority: 4, active: true, price: 1.25 }
];

const SEED_PROMPTS: SystemPrompt[] = [
  { id: 'p-1', title: 'System Standard Agent', category: 'General Chat', description: 'Default system prompt for core assistant interactions.', prompt: 'You are AuromindAI, a helpful AI assistant...' },
  { id: 'p-2', title: 'B2B Outbound Hook', category: 'Sales', description: 'Creates high-converting introductory cold email sequences.', prompt: 'Generate a B2B sales sequence for Enterprise clients...' },
  { id: 'p-3', title: 'SLA Support Concierge', category: 'Customer Support', description: 'Resolves technical service requests politely under SLA guidelines.', prompt: 'You are a Senior SLA specialist addressing customer issues...' }
];

const SEED_SETTINGS: AdminSettings = {
  platformName: 'AuromindAI',
  maintenanceMode: false,
  whitelist: '127.0.0.1, 192.168.1.1',
  geminiApiKey: 'AIzaSyD-••••••••••••••••••••••••••••••',
  defaultModel: 'gemini-2.5-flash',
  temperature: 0.7,
  maxTokens: 8192
};

/* ────────────────────────────────────────────────────────
   DATA ACCESS METHODS
──────────────────────────────────────────────────────── */

// ECOMMERCE LEADS
export function getEcommerceLeads(): EcommerceLead[] {
  return readJsonFile<EcommerceLead[]>('ecommerce-leads.json', SEED_ECOMMERCE);
}

export function addEcommerceLead(lead: Omit<EcommerceLead, 'id' | 'submittedAt' | 'status'> & Partial<EcommerceLead>): EcommerceLead {
  const current = getEcommerceLeads();
  const newLead: EcommerceLead = {
    id: `ec-${Date.now()}`,
    name: lead.name || 'Anonymous Merchant',
    phone: lead.phone || 'N/A',
    business: lead.business || 'Unnamed Store',
    budget: lead.budget || 'Custom Scale',
    submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: lead.status || 'new',
    source: lead.source || 'Website Form',
    notes: lead.notes || ''
  };
  current.unshift(newLead);
  writeJsonFile('ecommerce-leads.json', current);
  return newLead;
}

export function updateEcommerceLead(id: string, updates: Partial<EcommerceLead>): EcommerceLead | null {
  const current = getEcommerceLeads();
  const idx = current.findIndex(l => l.id === id);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...updates };
  writeJsonFile('ecommerce-leads.json', current);
  return current[idx];
}

export function deleteEcommerceLead(id: string): boolean {
  const current = getEcommerceLeads();
  const filtered = current.filter(l => l.id !== id);
  if (filtered.length === current.length) return false;
  writeJsonFile('ecommerce-leads.json', filtered);
  return true;
}

// REAL ESTATE LEADS
export function getRealEstateLeads(): RealEstateLead[] {
  return readJsonFile<RealEstateLead[]>('real-estate-leads.json', SEED_REAL_ESTATE);
}

export function addRealEstateLead(lead: Omit<RealEstateLead, 'id' | 'submittedAt' | 'status'> & Partial<RealEstateLead>): RealEstateLead {
  const current = getRealEstateLeads();
  const newLead: RealEstateLead = {
    id: `re-${Date.now()}`,
    name: lead.name || 'Prospective Buyer',
    email: lead.email || 'client@agency.com',
    phone: lead.phone || 'N/A',
    company_type: lead.company_type || 'Brokerage',
    lead_volume: lead.lead_volume || '50 - 200 leads/mo',
    submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: lead.status || 'new',
    notes: lead.notes || ''
  };
  current.unshift(newLead);
  writeJsonFile('real-estate-leads.json', current);
  return newLead;
}

export function updateRealEstateLead(id: string, updates: Partial<RealEstateLead>): RealEstateLead | null {
  const current = getRealEstateLeads();
  const idx = current.findIndex(l => l.id === id);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...updates };
  writeJsonFile('real-estate-leads.json', current);
  return current[idx];
}

export function deleteRealEstateLead(id: string): boolean {
  const current = getRealEstateLeads();
  const filtered = current.filter(l => l.id !== id);
  if (filtered.length === current.length) return false;
  writeJsonFile('real-estate-leads.json', filtered);
  return true;
}

// USERS
export function getUsers(): PlatformUser[] {
  return readJsonFile<PlatformUser[]>('users.json', SEED_USERS);
}

export function addUser(user: Omit<PlatformUser, 'id' | 'joined' | 'lastLogin' | 'chats' | 'tokens'> & Partial<PlatformUser>): PlatformUser {
  const current = getUsers();
  const newUser: PlatformUser = {
    id: `usr-${Date.now()}`,
    name: user.name,
    email: user.email,
    role: user.role || 'Client',
    plan: user.plan || 'Free Plan',
    credits: user.credits || 10000,
    status: user.status || 'Active',
    joined: new Date().toISOString().substring(0, 10),
    lastLogin: 'Just registered',
    chats: 0,
    tokens: 0
  };
  current.unshift(newUser);
  writeJsonFile('users.json', current);
  return newUser;
}

export function recordUserSignIn(email: string, name?: string): PlatformUser {
  const current = getUsers();
  const normalizedEmail = (email || 'user@auromind.ai').toLowerCase().trim();
  const now = new Date();
  
  const existingIndex = current.findIndex(u => u.email.toLowerCase().trim() === normalizedEmail);
  
  if (existingIndex !== -1) {
    current[existingIndex].lastLogin = 'Just now';
    current[existingIndex].status = 'Active';
    current[existingIndex].chats = (current[existingIndex].chats || 0) + 1;
    if (name && (current[existingIndex].name === 'Platform User' || !current[existingIndex].name)) {
      current[existingIndex].name = name;
    }
    const updated = current[existingIndex];
    current.splice(existingIndex, 1);
    current.unshift(updated);
    writeJsonFile('users.json', current);
    return updated;
  } else {
    const isOwner = normalizedEmail.includes('admin') || normalizedEmail.includes('owner') || normalizedEmail.includes('santhosh');
    const computedName = name || normalizedEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    const newUser: PlatformUser = {
      id: `usr-${Date.now()}`,
      name: computedName || 'Platform User',
      email: normalizedEmail,
      role: isOwner ? 'Owner' : 'Client',
      plan: isOwner ? 'Enterprise Pro' : 'Free Plan',
      credits: 10000,
      status: 'Active',
      joined: now.toISOString().substring(0, 10),
      lastLogin: 'Just now',
      chats: 1,
      tokens: 0
    };
    current.unshift(newUser);
    writeJsonFile('users.json', current);
    return newUser;
  }
}

export function updateUser(id: string, updates: Partial<PlatformUser>): PlatformUser | null {
  const current = getUsers();
  const idx = current.findIndex(u => u.id === id);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...updates };
  writeJsonFile('users.json', current);
  return current[idx];
}

export function deleteUser(id: string): boolean {
  const current = getUsers();
  const filtered = current.filter(u => u.id !== id);
  if (filtered.length === current.length) return false;
  writeJsonFile('users.json', filtered);
  return true;
}

// MODELS
export function getModels(): AIModelConfig[] {
  return readJsonFile<AIModelConfig[]>('models.json', SEED_MODELS);
}

export function updateModel(id: string, updates: Partial<AIModelConfig>): AIModelConfig | null {
  const current = getModels();
  const idx = current.findIndex(m => m.id === id);
  if (idx === -1) return null;
  current[idx] = { ...current[idx], ...updates };
  writeJsonFile('models.json', current);
  return current[idx];
}

// PROMPTS
export function getPrompts(): SystemPrompt[] {
  return readJsonFile<SystemPrompt[]>('prompts.json', SEED_PROMPTS);
}

export function addPrompt(prompt: Omit<SystemPrompt, 'id'>): SystemPrompt {
  const current = getPrompts();
  const newPrompt: SystemPrompt = {
    id: `p-${Date.now()}`,
    ...prompt
  };
  current.unshift(newPrompt);
  writeJsonFile('prompts.json', current);
  return newPrompt;
}

// SETTINGS
export function getAdminSettings(): AdminSettings {
  return readJsonFile<AdminSettings>('settings.json', SEED_SETTINGS);
}

export function updateAdminSettings(updates: Partial<AdminSettings>): AdminSettings {
  const current = getAdminSettings();
  const updated = { ...current, ...updates };
  writeJsonFile('settings.json', updated);
  return updated;
}

// DYNAMIC OVERVIEW STATS (Computed dynamically from real stored records)
export function getOverviewMetrics() {
  const ecLeads = getEcommerceLeads();
  const reLeads = getRealEstateLeads();
  const users = getUsers();
  const models = getModels();

  const totalTokensBurned = users.reduce((acc, u) => acc + (u.tokens || 0), 0);
  const activeUsersCount = users.filter(u => u.status === 'Active').length;
  const newEcCount = ecLeads.filter(l => l.status === 'new').length;
  const newReCount = reLeads.filter(l => l.status === 'new').length;
  const convertedLeads = ecLeads.filter(l => l.status === 'converted').length + reLeads.filter(l => l.status === 'converted').length;

  return {
    totalEcommerceLeads: ecLeads.length,
    newEcommerceLeads: newEcCount,
    totalRealEstateLeads: reLeads.length,
    newRealEstateLeads: newReCount,
    totalUsers: users.length,
    activeUsers: activeUsersCount,
    totalConverted: convertedLeads,
    recentActivity: [
      ...ecLeads.slice(0, 3).map(l => ({
        id: l.id,
        type: 'ecommerce',
        title: l.name,
        subtitle: l.business,
        contact: l.phone,
        detail: l.budget,
        time: l.submittedAt,
        status: l.status
      })),
      ...reLeads.slice(0, 3).map(l => ({
        id: l.id,
        type: 'realestate',
        title: l.name,
        subtitle: l.company_type,
        contact: l.phone,
        detail: l.lead_volume,
        time: l.submittedAt,
        status: l.status
      }))
    ].sort((a, b) => b.time.localeCompare(a.time))
  };
}
