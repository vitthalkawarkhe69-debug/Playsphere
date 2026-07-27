import React from 'react';
import { 
  X, 
  Gamepad2, 
  Trophy, 
  Coffee, 
  Calendar, 
  LayoutGrid, 
  Phone, 
  Info, 
  Sun, 
  Moon, 
  MessageSquare, 
  Instagram, 
  Twitter, 
  Youtube,
  ArrowLeft
} from 'lucide-react';
import { NavTab, UserProfile } from '../types';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  user: UserProfile;
  onClaimDiscount: () => void;
  theme: 'dark' | 'light';
  setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  user,
  onClaimDiscount,
  theme,
  setTheme,
}) => {
  if (!isOpen) return null;

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Gamepad2 },
    { id: 'games', label: 'Games Library', icon: Gamepad2 },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'cafe', label: 'Café Menu', icon: Coffee },
    { id: 'booking', label: 'Slot Booking', icon: Calendar },
    { id: 'dashboard', label: 'User Dashboard', icon: LayoutGrid },
    { id: 'contact', label: 'Contact Us', icon: Phone },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const xpPercent = Math.min(100, Math.round((user.currentXp / user.maxXp) * 100));

  const handleItemClick = (id: NavTab) => {
    setActiveTab(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="bg-[#0d121b] border-l border-slate-800/90 w-full max-w-xs h-full flex flex-col justify-between shadow-2xl relative p-4 overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#121824] border border-lime-400/40 flex items-center justify-center shadow-[0_0_10px_rgba(163,230,53,0.3)] overflow-hidden shrink-0">
              <img src="/images/playsphere.jpg" alt="PlaySphere Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wider text-white">PLAYSPHERE</span>
            </div>
          </div>
          <button
            id="mobile-menu-close-btn"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            title="Close Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gamer Profile Card */}
        <div className="my-4 bg-[#121824] p-3 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop';
              }}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-lime-400/80 shadow-[0_0_10px_rgba(163,230,53,0.3)]"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
              <p className="text-[11px] text-slate-400 font-medium">Level {user.level} Gamer</p>
            </div>
          </div>
          {/* XP Bar */}
          <div className="mt-2.5 space-y-1">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-lime-400 h-1.5 rounded-full shadow-[0_0_8px_rgba(163,230,53,0.8)] transition-all duration-300"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[9px] text-slate-400 font-semibold">
              <span>{user.currentXp} / {user.maxXp} XP</span>
              <span className="text-lime-400 font-bold">{xpPercent}%</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 flex-1 my-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-lime-400 text-black shadow-[0_0_12px_rgba(163,230,53,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Theme Switcher & Discount Card */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between px-3 py-2 bg-[#121824] rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Theme</span>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-5 rounded-full bg-lime-400/20 border border-lime-400/40 p-0.5 flex items-center transition-colors cursor-pointer"
            >
              <div
                className={`w-4 h-4 rounded-full bg-lime-400 shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                  theme === 'dark' ? 'translate-x-4' : 'translate-x-0'
                }`}
              >
                <Moon className="w-2.5 h-2.5 text-black fill-black" />
              </div>
            </button>
          </div>

          <div className="bg-gradient-to-b from-[#182315] to-[#111822] p-3 rounded-2xl border border-lime-500/30 text-center">
            <h4 className="text-xs font-black text-white">
              Get <span className="text-lime-400">10% OFF</span> Coupon
            </h4>
            <button
              onClick={() => {
                onClaimDiscount();
                onClose();
              }}
              className={`w-full mt-2 py-1.5 px-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                user.discountClaimed
                  ? 'bg-slate-800 text-slate-400 border border-slate-700'
                  : 'bg-lime-400 hover:bg-lime-300 text-black shadow-[0_0_10px_rgba(163,230,53,0.4)]'
              }`}
            >
              {user.discountClaimed ? 'CLAIMED ✓' : 'CLAIM NOW'}
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-around text-slate-400 pt-1">
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-lime-400">
              <MessageSquare className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/playsphere.98?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-1.5 hover:text-lime-400">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-lime-400">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-1.5 hover:text-lime-400">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
