import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Bell, LogIn, X, Check, Gamepad2, Coffee, Trophy, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartItems: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenLogin: () => void;
  canGoBack?: boolean;
  onGoBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  cartItems,
  setIsCartOpen,
  wishlistCount,
  onOpenWishlist,
  onOpenLogin,
  canGoBack,
  onGoBack,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const notifications = [
    {
      id: 'n1',
      title: 'Tournament Starting Soon!',
      desc: 'PlaySphere Cup starts in 3 days.',
      time: '10m ago',
      icon: Trophy,
      read: false
    },
    {
      id: 'n2',
      title: '10% Discount Coupon',
      desc: 'Coupon PLAYSPHERE10 is available for slot booking.',
      time: '1h ago',
      icon: Gamepad2,
      read: false
    },
    {
      id: 'n3',
      title: 'Special Cafe Combo',
      desc: 'Get Loaded Nachos + Iced Mojito at ₹249.',
      time: '2h ago',
      icon: Coffee,
      read: true
    }
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#0d121b]/95 backdrop-blur-md px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-800/80 flex items-center justify-between gap-2 sm:gap-4">
      {/* Mobile Brand Logo (Visible only on mobile/tablet when sidebar is hidden) */}
      <div className="lg:hidden flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#121824] border border-lime-400/40 flex items-center justify-center shadow-[0_0_10px_rgba(163,230,53,0.3)] overflow-hidden shrink-0">
          <img src="/images/playsphere.jpg" alt="PlaySphere Logo" className="w-full h-full object-cover" />
        </div>
        <span className="font-extrabold text-sm tracking-wider text-white hidden sm:inline-block">PLAYSPHERE</span>
      </div>

      {/* Back button if available */}
      {canGoBack && onGoBack && (
        <button
          id="header-back-btn"
          onClick={onGoBack}
          className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-lime-400 text-black hover:bg-lime-300 font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-[0_0_12px_rgba(163,230,53,0.3)] hover:scale-105"
          title="Go 1 Step Back"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          <span>BACK</span>
        </button>
      )}

      {/* Search Input Box */}
      <div className="relative flex-1 max-w-xl min-w-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
        <input
          id="header-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search games, café..."
          className="w-full bg-[#121824] border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 rounded-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-2.5 focus:outline-none focus:border-lime-400/80 focus:ring-1 focus:ring-lime-400/80 transition-all truncate"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        )}
      </div>

      {/* Header Right Action Icons */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Wishlist Heart */}
        <button
          id="header-wishlist-btn"
          onClick={onOpenWishlist}
          className="relative p-2 sm:p-2.5 rounded-full bg-[#121824] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-lime-400 transition-colors"
          title="Wishlist"
        >
          <Heart className="w-4 h-4" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-lime-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Cart Shopping Bag */}
        <button
          id="header-cart-btn"
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 sm:p-2.5 rounded-full bg-[#121824] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-lime-400 transition-colors"
          title="Shopping Cart"
        >
          <ShoppingBag className="w-4 h-4" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-lime-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(163,230,53,0.8)]">
              {totalCartCount}
            </span>
          )}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            id="header-notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 sm:p-2.5 rounded-full bg-[#121824] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-lime-400 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#121824] border border-slate-800 rounded-2xl shadow-2xl p-3 sm:p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <h4 className="text-xs sm:text-sm font-bold text-white">Notifications</h4>
                <span className="text-[10px] bg-lime-400/20 text-lime-400 font-bold px-2 py-0.5 rounded-full">
                  3 New
                </span>
              </div>
              <div className="space-y-2.5">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0d121b] border border-slate-800/80 hover:border-slate-700 transition-colors cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-lime-400/10 text-lime-400 mt-0.5">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white truncate">{item.title}</p>
                          <span className="text-[9px] text-slate-500">{item.time}</span>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 line-clamp-2">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* LOGIN Button */}
        <button
          id="header-login-btn"
          onClick={onOpenLogin}
          className="flex items-center gap-1.5 bg-lime-400 hover:bg-lime-300 text-black px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all transform active:scale-95 cursor-pointer ml-0.5"
        >
          <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">LOGIN</span>
        </button>
      </div>
    </header>
  );
};
