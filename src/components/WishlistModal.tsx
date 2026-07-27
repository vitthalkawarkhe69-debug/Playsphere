import React, { useEffect } from 'react';
import { X, Heart, Star, Calendar } from 'lucide-react';
import { Game } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteGames: Game[];
  onRemoveFavorite: (gameId: string) => void;
  onBookGame: (game: Game) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  favoriteGames,
  onRemoveFavorite,
  onBookGame,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#121824] border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        <div className="bg-[#0e131d] px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400">
              <Heart className="w-5 h-5 fill-lime-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                MY WISHLIST ({favoriteGames.length})
              </h3>
              <p className="text-xs text-slate-400">Saved games for your next session</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {favoriteGames.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-8">
              No games added to wishlist yet. Click the heart icon on any game card!
            </p>
          ) : (
            favoriteGames.map((game) => (
              <div
                key={game.id}
                className="bg-[#0e131d] p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={game.image}
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop';
                    }}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{game.title}</h4>
                    <p className="text-[10px] text-slate-400">{game.category}</p>
                    <p className="text-xs font-extrabold text-lime-400 mt-0.5">₹{game.pricePerHour}/hr</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onBookGame(game);
                    }}
                    className="bg-lime-400 text-black px-3 py-1.5 rounded-xl font-bold text-[11px] uppercase flex items-center gap-1"
                  >
                    <Calendar className="w-3 h-3" /> Book
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(game.id)}
                    className="p-2 text-slate-500 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
