import React, { useEffect } from 'react';
import { X, Star, Heart, Gamepad2, Calendar, Tv, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Game } from '../types';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
  onToggleFavorite: (gameId: string) => void;
  onBookGameSlot: (game: Game) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  onClose,
  onToggleFavorite,
  onBookGameSlot,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#121824] border border-slate-800 rounded-2xl sm:rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Image Header */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
          <img src={game.image} alt={game.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-black/40" />

          {/* 1 Step Back Button */}
          <button
            id="game-detail-back-top-btn"
            onClick={onClose}
            className="absolute top-4 left-4 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/75 hover:bg-black text-white text-xs font-black uppercase tracking-wider backdrop-blur-md border border-slate-700/80 transition-all hover:scale-105 cursor-pointer shadow-xl z-10"
            title="Go 1 Step Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5] text-lime-400" />
            <span>← GO BACK</span>
          </button>

          {/* Close & Fav Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => onToggleFavorite(game.id)}
              className={`p-2.5 rounded-full transition-all ${
                game.isFavorite ? 'bg-lime-400 text-black' : 'bg-black/60 text-white hover:bg-black'
              }`}
              title={game.isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${game.isFavorite ? 'fill-black' : ''}`} />
            </button>
            <button
              id="game-detail-close-btn"
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
              title="Close (Go Back)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-lime-400 text-black px-2.5 py-0.5 rounded-full">
              {game.category}
            </span>
            <h2 className="text-2xl font-black text-white tracking-wide uppercase mt-1">
              {game.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1.5 text-sm font-bold text-white">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{game.rating} / 5.0 Rating</span>
            </div>
            <div>
              <span className="text-xl font-black text-lime-400">₹{game.pricePerHour}</span>
              <span className="text-xs text-slate-400"> / hour</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {game.description || 'Experience high frame-rate, 4K ray-traced graphics on our premium gaming rigs and consoles.'}
          </p>

          {/* Platforms */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available On Platforms</h4>
            <div className="flex flex-wrap gap-2">
              {(game.platforms || ['PS5', 'Xbox Series X', 'High-End PC']).map((p) => (
                <span key={p} className="px-3 py-1 rounded-xl bg-[#0e131d] border border-slate-800 text-xs font-extrabold text-lime-400">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-[#0e131d] p-3 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
            <span>Sanitized wireless controller & 7.1 surround sound gaming headset provided.</span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="bg-[#0e131d] p-5 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            id="game-detail-back-footer-btn"
            onClick={onClose}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>GO BACK</span>
          </button>

          <button
            id="book-this-game-btn"
            onClick={() => {
              onClose();
              onBookGameSlot(game);
            }}
            className="flex items-center gap-2 bg-lime-400 hover:bg-lime-300 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.4)] transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 stroke-[2.5]" />
            <span>BOOK SLOT FOR THIS GAME</span>
          </button>
        </div>
      </div>
    </div>
  );
};
