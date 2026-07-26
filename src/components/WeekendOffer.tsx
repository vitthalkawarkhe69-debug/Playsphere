import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';

interface WeekendOfferProps {
  onBookNow: () => void;
}

export const WeekendOffer: React.FC<WeekendOfferProps> = ({ onBookNow }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 bg-[#0e131d] p-5 shadow-xl min-h-[140px] flex items-center justify-between">
      {/* Background RGB Gaming Setup Image with dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop"
          alt="Weekend Offer RGB Gaming Room"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d121b] via-[#0d121b]/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-2 max-w-sm">
        <div className="flex items-center gap-1.5 text-lime-400 text-[10px] font-black uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LIMITED TIME PROMO</span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider leading-tight">
          WEEKEND OFFER
        </h3>
        <p className="text-xs text-slate-300 font-medium">
          Get <span className="text-lime-400 font-black">20% OFF</span> on all Gaming Slots
        </p>
        <div className="pt-1">
          <button
            id="weekend-offer-book-now-btn"
            onClick={onBookNow}
            className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black px-4 py-2 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(163,230,53,0.3)] transition-all transform active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>BOOK NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
