import React from 'react';
import { MessageSquare, Star, ArrowRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface WhatGamersSayProps {
  testimonials: Testimonial[];
  onViewAll: () => void;
}

export const WhatGamersSay: React.FC<WhatGamersSayProps> = ({
  testimonials,
  onViewAll,
}) => {
  return (
    <section className="space-y-4">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-black text-white tracking-wider uppercase">
            WHAT GAMERS SAY
          </h2>
        </div>
        <button
          id="testimonials-view-all"
          onClick={onViewAll}
          className="flex items-center gap-1.5 text-xs font-bold text-lime-400 hover:text-lime-300 transition-colors uppercase tracking-wider group cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 3 Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-[#121824] rounded-2xl border border-slate-800/80 p-4 space-y-3 relative overflow-hidden hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            {/* User Info Header */}
            <div className="flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop';
                }}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-lime-400/60"
              />
              <div>
                <h4 className="text-xs font-bold text-white">{item.name}</h4>
                {/* Stars Rating */}
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < item.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-700 fill-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Comment Body */}
            <p className="text-xs text-slate-300 italic font-medium leading-relaxed z-10">
              "{item.comment}"
            </p>

            {/* Quotation Icon Decor */}
            <Quote className="absolute bottom-2 right-2 w-8 h-8 text-slate-800/60 rotate-180 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};
