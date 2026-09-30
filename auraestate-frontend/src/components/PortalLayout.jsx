import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Bot, Clock3, Compass, FileText, Heart, LayoutDashboard, ListFilter, LogOut, Menu, MessageSquare, Scale, Search, Settings, UserRound, X } from 'lucide-react';
import Navbar from './Navbar';
import GuidanceBanner from './GuidanceBanner';
import Brand from './Brand';

const userLinks = [
  ['Dashboard', '/dashboard', LayoutDashboard],
  ['Search', '/properties', Search],
  ['Saved Properties', '/saved', Heart],
  ['Shortlisted', '/shortlisted', Heart],
  ['Recently Viewed', '/recently-viewed', Clock3],
  ['Compare', '/compare', Scale],
  ['Enquiries', '/enquiries', MessageSquare],
  ['AI Assistant', '/ai-assistant', Bot],
  ['Profile', '/profile', UserRound],
];

export default function PortalLayout({ children, title, subtitle, active, guidance = true }) {
  const [mobile, setMobile] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div className="portal-shell">
      <Navbar />
      <button className="portal-mobile-toggle" onClick={() => setMobile(v => !v)}>{mobile ? <X /> : <Menu />} <span>Menu</span></button>
      <aside className={`sidebar ${mobile ? 'mobile-open' : ''}`}>
        <Brand compact />
        <div className="side-user"><div className="side-avatar">K</div><div><strong>Komal</strong><span>User portal</span></div></div>
        <nav>
          {userLinks.map(([label, to, Icon]) => <NavLink key={label} to={to} onClick={() => setMobile(false)} className={({isActive}) => `${isActive ? 'side-link active' : 'side-link'} ${active === label ? 'active' : ''}`}><Icon size={16} /><span>{label}</span></NavLink>)}
        </nav>
        <div className="side-bottom">
          <button className="side-link" onClick={() => navigate('/')}><Compass size={16} /><span>Visit home</span></button>
          <button className="side-link" onClick={() => navigate('/login')}><LogOut size={16} /><span>Sign out</span></button>
        </div>
      </aside>
      <main className="portal-main">
        <div className="page-head">
          <div><span className="eyebrow">AURAESTATE / USER</span><h1>{title}</h1><p>{subtitle}</p></div>
          <div className="page-head-actions"><button className="round-action"><Settings size={17}/></button><button className="round-action"><FileText size={17}/></button></div>
        </div>
        {guidance && <GuidanceBanner />}
        {children}
      </main>
    </div>
  );
}
