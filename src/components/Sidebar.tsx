import React from 'react';
import { 
  Gamepad2, 
  Trophy, 
  Coffee, 
  Calendar, 
  LayoutGrid, 
  Phone, 
  Info, 
  Sun, 
  Moon, 
  Flame,
  MessageSquare,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';
import { NavTab, UserProfile } from '../types';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  user: UserProfile;
  onClaimDiscount: () => void;
  theme: 'dark' | 'light';
  setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onClaimDiscount,
  theme,
  setTheme,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Gamepad2 },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'cafe', label: 'Café', icon: Coffee },
    { id: 'booking', label: 'Booking', icon: Calendar },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'contact', label: 'Contact Us', icon: Phone },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const xpPercent = Math.min(100, Math.round((user.currentXp / user.maxXp) * 100));

  return (
    <aside className="hidden lg:flex w-64 bg-[#0d121b] border-r border-slate-800/80 text-slate-200 flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto custom-scrollbar select-none p-4">
      {/* Top Section: Brand & Nav */}
      <div className="space-y-6">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-2 pt-1 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-[#121824] border border-lime-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.3)] overflow-hidden shrink-0">
            <img src="/images/playsphere.jpg" alt="PlaySphere Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-lg tracking-wider text-white">PLAYSPHERE</span>
            </div>
            <p className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase -mt-1">
              GAMING LOUNGE & CAFÉ
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-lime-400 text-black font-bold shadow-[0_0_12px_rgba(163,230,53,0.3)] scale-[1.01]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Middle/Bottom Widgets */}
      <div className="space-y-4 pt-4 border-t border-slate-800/60">
        {/* Theme Switcher Widget */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#121824] rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Theme</span>
          </div>
          <button
            id="theme-toggle-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-5 rounded-full bg-lime-400/20 border border-lime-400/40 p-0.5 flex items-center transition-colors cursor-pointer"
            title="Toggle theme"
          >
            <div
              className={`w-4 h-4 rounded-full bg-lime-400 shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
              }`}
            >
              <Moon className="w-2.5 h-2.5 text-black fill-black" />
            </div>
          </button>
        </div>

        {/* User Gamer Level Card */}
        <div className="bg-[#121824] p-3 rounded-2xl border border-slate-800/80 relative overflow-hidden group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop';
                }}
                className="w-11 h-11 rounded-xl object-cover ring-2 ring-lime-400/80 shadow-[0_0_10px_rgba(163,230,53,0.3)]"
              />
              <span className="absolute -bottom-1 -right-1 bg-lime-400 text-black text-[9px] font-extrabold px-1 rounded border border-black">
                XP
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white truncate">{user.name}</h4>
              <p className="text-xs text-slate-400 font-medium">Level {user.level}</p>
            </div>
          </div>
          {/* XP Progress Bar */}
          <div className="mt-3 space-y-1">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-lime-400 h-1.5 rounded-full shadow-[0_0_8px_rgba(163,230,53,0.8)] transition-all duration-300"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
              <span>{user.currentXp} / {user.maxXp} XP</span>
              <span className="text-lime-400 font-bold">{xpPercent}%</span>
            </div>
          </div>
        </div>

        {/* 10% OFF Offer Widget */}
        <div className="bg-gradient-to-b from-[#182315] to-[#111822] p-3.5 rounded-2xl border border-lime-500/30 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-lime-400/10 rounded-full blur-xl pointer-events-none" />
          <h4 className="text-sm font-extrabold text-white">
            Get <span className="text-lime-400 font-black">10% OFF</span>
          </h4>
          <p className="text-[11px] text-slate-300 mt-0.5 mb-2.5">on your first booking</p>
          <button
            id="claim-discount-btn"
            onClick={onClaimDiscount}
            className={`w-full py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              user.discountClaimed
                ? 'bg-slate-800 text-slate-400 border border-slate-700'
                : 'bg-lime-400 hover:bg-lime-300 text-black shadow-[0_0_15px_rgba(163,230,53,0.4)] active:scale-95'
            }`}
          >
            {user.discountClaimed ? 'CLAIMED ✓' : 'CLAIM NOW'}
          </button>
        </div>

        {/* Social Icons Bottom Footer */}
        <div className="flex items-center justify-around text-slate-400 pt-1">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg hover:bg-slate-800 hover:text-lime-400 transition-colors"
            title="Discord"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/playsphere.98?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-slate-800 hover:text-lime-400 transition-colors"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg hover:bg-slate-800 hover:text-lime-400 transition-colors"
            title="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg hover:bg-slate-800 hover:text-lime-400 transition-colors"
            title="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </aside>
  );
};
