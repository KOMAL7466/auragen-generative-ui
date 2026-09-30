import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, BrainCircuit, Building2, ChevronRight, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react';
import Navbar from './Navbar';

const links = [
  ['Dashboard', '/admin-dashboard', LayoutDashboard],
  ['Users', '/admin-users', Users],
  ['Properties', '/admin-properties', Building2],
  ['Enquiries', '/enquiries', BarChart3],
  ['Analytics', '/admin-ai-analytics', BarChart3],
  ['Cognitive Load', '/admin-cognitive-load', BrainCircuit],
  ['Settings', '/profile', Settings],
];

export default function AdminLayout({ children, title, subtitle }) {
  return (
    <div className="admin-shell">
      <Navbar admin />
      <aside className="admin-sidebar">
        <div className="admin-label">ADMIN PORTAL</div>
        <div className="admin-side-brand"><div className="mini-house"><Building2 size={18}/></div><div><strong>AuraEstate</strong><span>Control center</span></div></div>
        <nav>{links.map(([label,to,Icon]) => <NavLink key={label} to={to} className={({isActive}) => isActive ? 'admin-link active' : 'admin-link'}><Icon size={16}/><span>{label}</span><ChevronRight size={13}/></NavLink>)}</nav>
        <div className="admin-side-foot"><span className="live-dot"><i/> All systems operational</span><button className="admin-link"><LogOut size={16}/><span>Sign out</span></button></div>
      </aside>
      <main className="admin-main">
        <div className="admin-page-head"><div><span className="eyebrow">AURAESTATE / ADMIN</span><h1>{title}</h1><p>{subtitle}</p></div><div className="admin-user">A<span>Admin</span></div></div>
        {children}
      </main>
    </div>
  );
}
