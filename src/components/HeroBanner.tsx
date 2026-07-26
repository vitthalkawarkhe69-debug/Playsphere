import React from 'react';
import { Calendar, Play, Gamepad2, Users, Trophy, Star, MapPin } from 'lucide-react';
import { STATS_LIST } from '../data/mockData';

interface HeroBannerProps {
  onBookSlot: () => void;
  onWatchTrailer: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onBookSlot,
  onWatchTrailer,
}) => {
  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2':
        return Gamepad2;
      case 'Users':
        return Users;
      case 'Trophy':
        return Trophy;
      case 'Star':
        return Star;
      default:
        return Gamepad2;
    }
  };

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a0e17] via-[#0d1420] to-[#121c2c] border border-slate-800/90 p-5 sm:p-8 md:p-10 min-h-[360px] sm:min-h-[420px] flex items-center shadow-2xl">
      {/* Background Neon Glow Overlay */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Operator Background Character Graphic Overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-2/3 pointer-events-none opacity-20 sm:opacity-40 md:opacity-90 overflow-hidden flex items-center justify-end">
        <img
          src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop"
          alt="PlaySphere Hero Character"
          className="h-full w-full object-cover object-right mix-blend-lighten mask-gradient"
          style={{
            maskImage: 'linear-gradient(to left, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%)'
          }}
        />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
        {/* Left Content Area (Columns 1-8) */}
        <div className="md:col-span-8 space-y-4 sm:space-y-6">
          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#121c27] border border-lime-400/40 text-lime-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(163,230,53,0.2)]">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping" />
              NEXT LEVEL EXPERIENCE
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#121c27]/90 border border-slate-700/80 text-slate-300 text-[10px] sm:text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Near Bangar Coaching Classes, Beside Amul Cafe - Akola Naka Road - Washim</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-none">
              PLAY. COMPETE.
            </h1>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-lime-400 tracking-tight uppercase leading-none drop-shadow-[0_0_20px_rgba(163,230,53,0.4)]">
              CONQUER.
            </h1>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-xs sm:text-base max-w-xl font-medium leading-relaxed">
            Step into <span className="text-white font-bold">PLAYSPHERE</span> – where gaming meets passion.
            Premium consoles, epic tournaments & a next-gen café – all under one roof.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <button
              id="hero-book-slot-btn"
              onClick={onBookSlot}
              className="flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-black px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Calendar className="w-4 h-4 stroke-[2.5]" />
              <span>BOOK YOUR SLOT</span>
            </button>

            <button
              id="hero-watch-trailer-btn"
              onClick={onWatchTrailer}
              className="flex items-center justify-center gap-2 bg-[#141b27]/80 hover:bg-[#1e2738] text-white border border-slate-700/80 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer backdrop-blur-sm"
            >
              <div className="w-5 h-5 rounded-full bg-lime-400/20 text-lime-400 flex items-center justify-center">
                <Play className="w-3 h-3 fill-lime-400 ml-0.5" />
              </div>
              <span>WATCH TRAILER</span>
            </button>
          </div>
        </div>

        {/* Right Stats Vertical Grid (Columns 9-12) */}
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3.5 justify-end">
          {STATS_LIST.map((stat, idx) => {
            const IconComp = getStatIcon(stat.icon);
            return (
              <div
                key={idx}
                className="bg-[#0f1724]/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800/80 flex items-center gap-3 shadow-lg hover:border-lime-400/40 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-lime-400/10 text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-colors">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight leading-none">
                    {stat.count}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
