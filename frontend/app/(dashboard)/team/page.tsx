'use client';

import React, { useState } from 'react';
import { Users, UserPlus, Shield, Activity, Mail, Trash2 } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member';
  status: 'Active' | 'Pending';
  joinedAt: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Santhosh A', email: 'santhosh@acme.com', role: 'Owner', status: 'Active', joinedAt: 'Aug 2026' },
    { id: '2', name: 'Elena Rostova', email: 'elena@acme.com', role: 'Admin', status: 'Active', joinedAt: 'Jul 2026' },
    { id: '3', name: 'David Miller', email: 'david@acme.com', role: 'Member', status: 'Pending', joinedAt: 'Invited today' },
  ]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Member'>('Member');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'Pending',
      joinedAt: 'Just now',
    };

    setMembers([...members, newMember]);
    setInviteEmail('');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
          <Users className="w-4 h-4" />
          <span>Organization Governance</span>
        </div>
        <h1 className="text-3xl font-bold text-primary tracking-tight">Team Management & RBAC</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage team member seats, role permissions, and organization security logs.</p>
      </div>

      {/* Invite Box */}
      <div className="floating-card p-6">
        <h2 className="text-sm font-bold text-primary mb-3">Invite Team Member</h2>
        <form onSubmit={handleInvite} className="flex gap-3">
          <div className="relative flex-1">
            <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input
              type="email"
              required
              placeholder="colleague@yourcompany.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-white text-xs focus:outline-none focus:border-accent"
            />
          </div>

          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as 'Admin' | 'Member')}
            className="px-3 py-2 rounded-xl border border-border bg-white text-xs font-semibold focus:outline-none"
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-soft hover:bg-gray-900"
          >
            <UserPlus className="w-3.5 h-3.5 text-accent" />
            <span>Send Invite</span>
          </button>
        </form>
      </div>

      {/* Members Table */}
      <div className="floating-card p-6 space-y-4">
        <h2 className="text-base font-bold text-primary">Team Members ({members.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-card/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-primary">
                    <div>{m.name}</div>
                    <div className="text-[11px] text-muted-foreground font-normal">{m.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted border border-border font-semibold text-[11px]">
                      <Shield className="w-3 h-3 text-secondary" />
                      {m.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      m.status === 'Active' ? 'bg-emerald-100 text-secondary' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{m.joinedAt}</td>
                  <td className="py-3 px-4 text-right">
                    {m.role !== 'Owner' && (
                      <button
                        onClick={() => setMembers(members.filter(mem => mem.id !== m.id))}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
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
