import React from 'react';
import { Gamepad2, Heart, Star, ArrowRight } from 'lucide-react';
import { Game } from '../types';

interface FeaturedGamesProps {
  games: Game[];
  onToggleFavorite: (gameId: string) => void;
  onSelectGame: (game: Game) => void;
  onViewAll: () => void;
}

export const FeaturedGames: React.FC<FeaturedGamesProps> = ({
  games,
  onToggleFavorite,
  onSelectGame,
  onViewAll,
}) => {
  return (
    <section className="space-y-4">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-black text-white tracking-wider uppercase">
            FEATURED GAMES
          </h2>
        </div>
        <button
          id="featured-games-view-all"
          onClick={onViewAll}
          className="flex items-center gap-1.5 text-xs font-bold text-lime-400 hover:text-lime-300 transition-colors uppercase tracking-wider group cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 4 Games Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="group bg-[#121824] rounded-2xl border border-slate-800/80 hover:border-lime-400/50 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            onClick={() => onSelectGame(game)}
          >
            {/* Card Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
              <img
                src={game.image}
                alt={game.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121824] via-transparent to-black/30" />

              {/* Heart Favorite Toggle Button */}
              <button
                id={`fav-btn-${game.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(game.id);
                }}
                className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                  game.isFavorite
                    ? 'bg-lime-400 text-black shadow-[0_0_10px_rgba(163,230,53,0.6)] scale-105'
                    : 'bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm'
                }`}
                title={game.isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${game.isFavorite ? 'fill-black' : ''}`} />
              </button>
            </div>

            {/* Card Info Content */}
            <div className="p-2.5 sm:p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-xs sm:text-base group-hover:text-lime-400 transition-colors line-clamp-1">
                  {game.title}
                </h3>
                <p className="text-[10px] sm:text-xs font-medium text-slate-400 line-clamp-1">{game.category}</p>
              </div>

              {/* Bottom Rating & Price */}
              <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-200">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400" />
                  <span>{game.rating}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-black text-lime-400">₹{game.pricePerHour}</span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400"> /hr</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
