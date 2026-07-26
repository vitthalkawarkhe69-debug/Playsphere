import React from 'react';
import { Gamepad2, Calendar, Coffee, Trophy, LayoutGrid, Home } from 'lucide-react';
import { NavTab } from '../types';

interface MobileBottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenMobileMenu: () => void;
  onOpenBooking: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenMobileMenu,
  onOpenBooking,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d121b]/95 backdrop-blur-lg border-t border-slate-800/90 px-2 py-1.5 flex items-center justify-around shadow-[0_-5px_25px_rgba(0,0,0,0.5)]">
      {/* Home */}
      <button
        id="mobile-nav-home"
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[10px] font-bold transition-all ${
          activeTab === 'home'
            ? 'text-lime-400'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5]' : ''}`} />
        <span>Home</span>
      </button>

      {/* Games */}
      <button
        id="mobile-nav-games"
        onClick={() => setActiveTab('games')}
        className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[10px] font-bold transition-all ${
          activeTab === 'games'
            ? 'text-lime-400'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Gamepad2 className={`w-5 h-5 ${activeTab === 'games' ? 'stroke-[2.5]' : ''}`} />
        <span>Games</span>
      </button>

      {/* Center Highlighted BOOK SLOT Button */}
      <button
        id="mobile-nav-book"
        onClick={onOpenBooking}
        className="flex flex-col items-center justify-center -mt-5 bg-lime-400 hover:bg-lime-300 text-black w-12 h-12 rounded-full shadow-[0_0_15px_rgba(163,230,53,0.6)] active:scale-90 transition-all border-2 border-[#0d121b]"
        title="Book Slot"
      >
        <Calendar className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Tournaments */}
      <button
        id="mobile-nav-tournaments"
        onClick={() => setActiveTab('tournaments')}
        className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[10px] font-bold transition-all ${
          activeTab === 'tournaments'
            ? 'text-lime-400'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Trophy className={`w-5 h-5 ${activeTab === 'tournaments' ? 'stroke-[2.5]' : ''}`} />
        <span>Esports</span>
      </button>

      {/* Café */}
      <button
        id="mobile-nav-cafe"
        onClick={() => setActiveTab('cafe')}
        className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[10px] font-bold transition-all ${
          activeTab === 'cafe'
            ? 'text-lime-400'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Coffee className={`w-5 h-5 ${activeTab === 'cafe' ? 'stroke-[2.5]' : ''}`} />
        <span>Café</span>
      </button>

      {/* More / Menu Drawer */}
      <button
        id="mobile-nav-menu"
        onClick={onOpenMobileMenu}
        className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-[10px] font-bold text-slate-400 hover:text-white transition-all"
      >
        <LayoutGrid className="w-5 h-5" />
        <span>Menu</span>
      </button>
    </div>
  );
};
