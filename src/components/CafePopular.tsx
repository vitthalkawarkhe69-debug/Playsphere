import React from 'react';
import { Coffee, Plus, ArrowRight, Check } from 'lucide-react';
import { FoodItem } from '../types';

interface CafePopularProps {
  items: FoodItem[];
  onAddToCart: (item: FoodItem) => void;
  onViewMenu: () => void;
  addedItemIds: string[];
}

export const CafePopular: React.FC<CafePopularProps> = ({
  items,
  onAddToCart,
  onViewMenu,
  addedItemIds,
}) => {
  return (
    <div className="bg-[#121824] rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400">
            <Coffee className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-black text-white tracking-wider uppercase">
            CAFÉ POPULAR
          </h2>
        </div>
        <button
          id="cafe-view-menu-btn"
          onClick={onViewMenu}
          className="flex items-center gap-1 text-xs font-bold text-lime-400 hover:text-lime-300 transition-colors uppercase tracking-wider group cursor-pointer"
        >
          <span>View Menu</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 4 Food Items Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((food) => {
          const isJustAdded = addedItemIds.includes(food.id);
          return (
            <div
              key={food.id}
              className="bg-[#0e131d] rounded-2xl border border-slate-800/80 p-2.5 space-y-2 hover:border-lime-400/40 transition-all group flex flex-col justify-between"
            >
              {/* Food Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title & Price Row */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-lime-400 transition-colors">
                  {food.name}
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-extrabold text-lime-400">₹{food.price}</span>
                  <button
                    id={`add-cafe-btn-${food.id}`}
                    onClick={() => onAddToCart(food)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                      isJustAdded
                        ? 'bg-emerald-500 text-white shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                        : 'bg-lime-400 hover:bg-lime-300 text-black shadow-[0_0_8px_rgba(163,230,53,0.4)] active:scale-90'
                    }`}
                    title="Add to Cart"
                  >
                    {isJustAdded ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[3]" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
