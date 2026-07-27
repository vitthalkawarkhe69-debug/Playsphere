/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { NavTab, Game, FoodItem, CartItem, UserProfile, SlotBookingRequest } from './types';
import {
  INITIAL_USER,
  FEATURED_GAMES,
  CAFE_ITEMS,
  CURRENT_TOURNAMENT,
  TESTIMONIALS,
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileMenuDrawer } from './components/MobileMenuDrawer';
import { HeroBanner } from './components/HeroBanner';
import { FeaturedGames } from './components/FeaturedGames';
import { FeaturesStrip } from './components/FeaturesStrip';
import { UpcomingTournament } from './components/UpcomingTournament';
import { CafePopular } from './components/CafePopular';
import { WeekendOffer } from './components/WeekendOffer';
import { WhatGamersSay } from './components/WhatGamersSay';

import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { TournamentModal } from './components/TournamentModal';
import { GameDetailModal } from './components/GameDetailModal';
import { TrailerModal } from './components/TrailerModal';
import { LoginModal } from './components/LoginModal';
import { WishlistModal } from './components/WishlistModal';
import { Toast, ToastMessage } from './components/Toast';

import { 
  Gamepad2, 
  Coffee, 
  Trophy, 
  Calendar, 
  LayoutGrid, 
  Phone, 
  Info, 
  Plus, 
  Check, 
  Star,
  MapPin,
  Clock,
  Mail,
  ShieldCheck,
  Zap,
  Award,
  ArrowLeft
} from 'lucide-react';

export default function App() {
  const mainRef = useRef<HTMLElement>(null);

  // Navigation & View State
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);
  const [navHistory, setNavHistory] = useState<NavTab[]>(['home']);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [searchQuery, setSearchQuery] = useState('');

  // Data States
  const [games, setGames] = useState<Game[]>(FEATURED_GAMES);
  const [cafeItems] = useState<FoodItem[]>(CAFE_ITEMS);

  // Cart State (Initial 2 items matching badge '2' in screenshot)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'loaded-nachos',
      type: 'food',
      title: 'Loaded Nachos',
      price: 199,
      quantity: 1,
      image: CAFE_ITEMS[0].image,
      details: 'Café Snack'
    },
    {
      id: 'cold-coffee',
      type: 'food',
      title: 'Cold Coffee',
      price: 119,
      quantity: 1,
      image: CAFE_ITEMS[2].image,
      details: 'Beverage'
    }
  ]);

  const handleSelectTab = (tab: NavTab) => {
    if (tab !== activeTab) {
      setNavHistory((prev) => [...prev, tab]);
      setActiveTab(tab);
    }
  };

  // Modals & Drawers States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedGameForBooking, setSelectedGameForBooking] = useState<Game | null>(null);
  const [isTournamentModalOpen, setIsTournamentModalOpen] = useState(false);
  const [selectedGameDetail, setSelectedGameDetail] = useState<Game | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGoBack = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      return;
    }
    if (selectedGameDetail !== null) {
      setSelectedGameDetail(null);
      return;
    }
    if (isBookingModalOpen) {
      setIsBookingModalOpen(false);
      return;
    }
    if (isTournamentModalOpen) {
      setIsTournamentModalOpen(false);
      return;
    }
    if (isTrailerModalOpen) {
      setIsTrailerModalOpen(false);
      return;
    }
    if (isWishlistOpen) {
      setIsWishlistOpen(false);
      return;
    }
    if (isCartOpen) {
      setIsCartOpen(false);
      return;
    }
    if (isLoginModalOpen) {
      setIsLoginModalOpen(false);
      return;
    }
    if (navHistory.length > 1) {
      const updated = [...navHistory];
      updated.pop();
      const prevTab = updated[updated.length - 1];
      setNavHistory(updated);
      setActiveTab(prevTab);
    } else if (activeTab !== 'home') {
      setActiveTab('home');
    }
  };

  const canGoBack =
    isMobileMenuOpen ||
    selectedGameDetail !== null ||
    isBookingModalOpen ||
    isTournamentModalOpen ||
    isTrailerModalOpen ||
    isWishlistOpen ||
    isCartOpen ||
    isLoginModalOpen ||
    navHistory.length > 1 ||
    activeTab !== 'home';

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [addedCafeIds, setAddedCafeIds] = useState<string[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Favorite / Wishlist Handlers
  const handleToggleFavorite = (gameId: string) => {
    setGames((prev) =>
      prev.map((g) => {
        if (g.id === gameId) {
          const updated = !g.isFavorite;
          addToast(
            updated ? `Added "${g.title}" to Wishlist` : `Removed "${g.title}" from Wishlist`,
            'info'
          );
          return { ...g, isFavorite: updated };
        }
        return g;
      })
    );
  };

  // Add Cafe Item to Cart
  const handleAddCafeToCart = (item: FoodItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: item.id,
          type: 'food',
          title: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
          details: 'Café Order'
        }
      ];
    });

    setAddedCafeIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedCafeIds((prev) => prev.filter((id) => id !== item.id));
    }, 1500);

    addToast(`Added ${item.name} (₹${item.price}) to Cart!`);
  };

  // Cart Handlers
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    addToast('Item removed from cart', 'info');
  };

  const handleClearCart = () => {
    setCartItems([]);
    addToast('Cart cleared', 'info');
  };

  const handleCheckout = () => {
    addToast('🎉 Order placed successfully! Check-in at counter #3.', 'success');
    setCartItems([]);
    setIsCartOpen(false);
  };

  // Slot Booking Confirm
  const handleConfirmSlotBooking = (booking: SlotBookingRequest) => {
    const bookingCartItem: CartItem = {
      id: `booking-${Date.now()}`,
      type: 'booking',
      title: `${booking.gameTitle} (${booking.platform})`,
      price: booking.totalPrice,
      quantity: 1,
      image: selectedGameForBooking?.image || FEATURED_GAMES[0].image,
      details: `${booking.date} @ ${booking.timeSlot} (${booking.durationHours} hrs)`
    };

    setCartItems((prev) => [...prev, bookingCartItem]);
    addToast(`Slot reserved for ${booking.timeSlot}! Item added to Cart.`, 'success');
  };

  // Claim Coupon Widget
  const handleClaimDiscount = () => {
    if (user.discountClaimed) {
      addToast('Coupon PLAYSPHERE10 is already active in your account!', 'info');
      return;
    }
    setUser((prev) => ({ ...prev, discountClaimed: true }));
    addToast('🎉 10% OFF Coupon PLAYSPHERE10 Claimed!', 'success');
  };

  // Filtered Games by Search
  const filteredGames = games.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteGames = games.filter((g) => g.isFavorite);

  return (
    <div className={`min-h-screen flex bg-[#0b0e14] text-slate-100 font-sans selection:bg-lime-400 selection:text-black ${theme === 'light' ? 'brightness-110 contrast-105' : ''}`}>
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        user={user}
        onClaimDiscount={handleClaimDiscount}
        theme={theme}
        setTheme={setTheme}
      />

      {/* 2. Main Webpage Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartItems={cartItems}
          setIsCartOpen={setIsCartOpen}
          wishlistCount={favoriteGames.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          canGoBack={canGoBack}
          onGoBack={handleGoBack}
        />

        {/* Dynamic Page Content */}
        <main ref={mainRef} className="flex-1 p-3 sm:p-4 md:p-6 pb-24 lg:pb-6 space-y-6 md:space-y-8 overflow-y-auto custom-scrollbar scroll-smooth max-w-7xl mx-auto w-full">
          {activeTab === 'home' && (
            <>
              {/* Hero Banner Section */}
              <HeroBanner
                onBookSlot={() => {
                  setSelectedGameForBooking(null);
                  setIsBookingModalOpen(true);
                }}
                onWatchTrailer={() => setIsTrailerModalOpen(true)}
              />

              {/* Main 2-Column Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column (8 cols): Featured Games + Features Strip + What Gamers Say */}
                <div className="lg:col-span-8 space-y-8">
                  {/* Featured Games Grid */}
                  <FeaturedGames
                    games={filteredGames}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectGame={(game) => setSelectedGameDetail(game)}
                    onViewAll={() => handleSelectTab('games')}
                  />

                  {/* Features Strip */}
                  <FeaturesStrip />

                  {/* What Gamers Say (Testimonials) */}
                  <WhatGamersSay
                    testimonials={TESTIMONIALS}
                    onViewAll={() => addToast('Showing top community reviews!', 'info')}
                  />
                </div>

                {/* Right Column (4 cols): Upcoming Tournament + Café Popular + Weekend Offer */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Upcoming Tournament */}
                  <UpcomingTournament
                    tournament={CURRENT_TOURNAMENT}
                    onRegister={() => setIsTournamentModalOpen(true)}
                    onViewAll={() => handleSelectTab('tournaments')}
                  />

                  {/* Café Popular */}
                  <CafePopular
                    items={cafeItems}
                    onAddToCart={handleAddCafeToCart}
                    onViewMenu={() => handleSelectTab('cafe')}
                    addedItemIds={addedCafeIds}
                  />

                  {/* Weekend Offer */}
                  <WeekendOffer
                    onBookNow={() => {
                      setSelectedGameForBooking(null);
                      setIsBookingModalOpen(true);
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Secondary Views (Tab Switchers) */}
          {activeTab === 'games' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleGoBack}
                    className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-lime-400 border border-slate-700 transition-colors cursor-pointer"
                    title="Go 1 Step Back"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-wider">GAMES LIBRARY</h1>
                    <p className="text-xs text-slate-400">Explore over 50+ PS5, Xbox Series X, and PC titles.</p>
                  </div>
                </div>
              </div>
              <FeaturedGames
                games={filteredGames}
                onToggleFavorite={handleToggleFavorite}
                onSelectGame={(game) => setSelectedGameDetail(game)}
                onViewAll={() => {}}
              />
            </div>
          )}

          {activeTab === 'tournaments' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <button
                  onClick={handleGoBack}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-lime-400 border border-slate-700 transition-colors cursor-pointer"
                  title="Go 1 Step Back"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <div>
                  <h1 className="text-2xl font-black text-white uppercase tracking-wider">ESPORTS TOURNAMENTS</h1>
                  <p className="text-xs text-slate-400">Compete for massive cash prize pools & rank up.</p>
                </div>
              </div>
              <UpcomingTournament
                tournament={CURRENT_TOURNAMENT}
                onRegister={() => setIsTournamentModalOpen(true)}
                onViewAll={() => {}}
              />
            </div>
          )}

          {activeTab === 'cafe' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <button
                  onClick={handleGoBack}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-lime-400 border border-slate-700 transition-colors cursor-pointer"
                  title="Go 1 Step Back"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <div>
                  <h1 className="text-2xl font-black text-white uppercase tracking-wider">CAFÉ MENU</h1>
                  <p className="text-xs text-slate-400">Delicious gamer snacks & refreshing beverages served at your station.</p>
                </div>
              </div>
              <CafePopular
                items={cafeItems}
                onAddToCart={handleAddCafeToCart}
                onViewMenu={() => {}}
                addedItemIds={addedCafeIds}
              />
            </div>
          )}

          {activeTab === 'booking' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-white uppercase tracking-wider">CONSOLE & PC BOOKING</h1>
                <p className="text-xs text-slate-400">Reserve high-end gaming consoles with zero wait times.</p>
              </div>
              <div className="bg-[#121824] p-8 rounded-3xl border border-slate-800 text-center space-y-4">
                <Calendar className="w-12 h-12 text-lime-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Ready to Reserve a Gaming Slot?</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Select your date, preferred console setup (PS5, Xbox, High-End PC, VR), duration, and snacks.
                </p>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-lime-400 text-black font-extrabold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.4)]"
                >
                  OPEN BOOKING SCHEDULER
                </button>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-white uppercase tracking-wider">GAMER DASHBOARD</h1>
                <p className="text-xs text-slate-400">Track your level, XP progression, and booking history.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#121824] p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Current Level</span>
                  <p className="text-3xl font-black text-lime-400">Level {user.level}</p>
                  <p className="text-[11px] text-slate-400">{user.currentXp} / {user.maxXp} XP to Level 24</p>
                </div>
                <div className="bg-[#121824] p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Completed Hours</span>
                  <p className="text-3xl font-black text-white">48.5 hrs</p>
                  <p className="text-[11px] text-slate-400">Top Game: God of War Ragnarök</p>
                </div>
                <div className="bg-[#121824] p-5 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Active Coupon</span>
                  <p className="text-3xl font-black text-lime-400">10% OFF</p>
                  <p className="text-[11px] text-slate-400">Code: PLAYSPHERE10</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-white uppercase tracking-wider">CONTACT PLAYSPHERE</h1>
                <p className="text-xs text-slate-400">Reach out for bulk bookings, private parties, or tournament queries.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#121824] p-6 rounded-3xl border border-slate-800">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-lime-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Location</h4>
                      <p className="text-xs text-slate-300 font-medium">Near Bangar Coaching Classes, Beside Amul Cafe - Akola Naka Road - Washim</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-lime-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Hours</h4>
                      <p className="text-xs text-slate-400">Open 24/7 (365 Days)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-lime-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Phone Hotline</h4>
                      <p className="text-xs text-slate-400">+91 (800) 752-9774</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); addToast('Message sent to PlaySphere team!', 'success'); }} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-[#0e131d] border border-slate-800 text-xs text-white rounded-xl px-4 py-2.5"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full bg-[#0e131d] border border-slate-800 text-xs text-white rounded-xl px-4 py-2.5"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="How can we help you?"
                    className="w-full bg-[#0e131d] border border-slate-800 text-xs text-white rounded-xl px-4 py-2.5"
                  />
                  <button type="submit" className="bg-lime-400 text-black font-extrabold px-6 py-2.5 rounded-xl text-xs uppercase">
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="text-2xl font-black text-white uppercase tracking-wider">ABOUT PLAYSPHERE</h1>
                <p className="text-xs text-slate-400">Where gaming meets passion.</p>
              </div>
              <div className="bg-[#121824] p-8 rounded-3xl border border-slate-800 space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  PlaySphere is India’s premier gaming lounge and café experience. Outfitted with 4K HDR displays, PS5 consoles, Xbox Series X stations, RTX 4090 PC rigs, and 1Gbps fiber internet, we provide an unparalleled environment for both casual sessions and competitive esports tournaments.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                  <div className="text-center p-3 bg-[#0e131d] rounded-2xl">
                    <p className="text-xl font-black text-lime-400">4K 120Hz</p>
                    <p className="text-[10px] text-slate-400 font-bold">OLED DISPLAYS</p>
                  </div>
                  <div className="text-center p-3 bg-[#0e131d] rounded-2xl">
                    <p className="text-xl font-black text-lime-400">RTX 4090</p>
                    <p className="text-[10px] text-slate-400 font-bold">HIGH-END RIGS</p>
                  </div>
                  <div className="text-center p-3 bg-[#0e131d] rounded-2xl">
                    <p className="text-xl font-black text-lime-400">1 Gbps</p>
                    <p className="text-[10px] text-slate-400 font-bold">FIBER INTERNET</p>
                  </div>
                  <div className="text-center p-3 bg-[#0e131d] rounded-2xl">
                    <p className="text-xl font-black text-lime-400">24 / 7</p>
                    <p className="text-[10px] text-slate-400 font-bold">OPEN ALWAYS</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Interactive Overlays & Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedGame={selectedGameForBooking}
        cafeItems={cafeItems}
        onConfirmBooking={handleConfirmSlotBooking}
        discountClaimed={user.discountClaimed}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
        discountClaimed={user.discountClaimed}
      />

      <TournamentModal
        isOpen={isTournamentModalOpen}
        onClose={() => setIsTournamentModalOpen(false)}
        tournament={CURRENT_TOURNAMENT}
        onSuccess={(teamName) => addToast(`Team ${teamName} registered for PlaySphere Cup!`, 'success')}
      />

      <GameDetailModal
        game={selectedGameDetail ? games.find((g) => g.id === selectedGameDetail.id) || selectedGameDetail : null}
        onClose={() => setSelectedGameDetail(null)}
        onToggleFavorite={handleToggleFavorite}
        onBookGameSlot={(game) => {
          setSelectedGameForBooking(game);
          setIsBookingModalOpen(true);
        }}
      />

      <TrailerModal
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(name) => {
          setUser((prev) => ({ ...prev, name }));
          addToast(`Welcome back, ${name}!`, 'success');
        }}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        favoriteGames={favoriteGames}
        onRemoveFavorite={handleToggleFavorite}
        onBookGame={(game) => {
          setSelectedGameForBooking(game);
          setIsBookingModalOpen(true);
        }}
      />

      {/* Mobile Bottom Navigation & Drawer */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenBooking={() => {
          setSelectedGameForBooking(null);
          setIsBookingModalOpen(true);
        }}
      />

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={handleSelectTab}
        user={user}
        onClaimDiscount={handleClaimDiscount}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Floating Toast System */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
