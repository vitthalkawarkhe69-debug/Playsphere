import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, ArrowRight } from 'lucide-react';
import { Tournament } from '../types';

interface UpcomingTournamentProps {
  tournament: Tournament;
  onRegister: () => void;
  onViewAll: () => void;
}

export const UpcomingTournament: React.FC<UpcomingTournamentProps> = ({
  tournament,
  onRegister,
  onViewAll,
}) => {
  // Timer State for DAYS : HRS : MINS : SECS
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 15,
    minutes: 42,
    seconds: 10,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTwo = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-[#121824] rounded-2xl border border-slate-800/80 p-5 space-y-4 shadow-xl flex flex-col justify-between">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400">
            <Trophy className="w-5 h-5" />
          </div>
          <h2 className="text-sm font-black text-white tracking-wider uppercase">
            UPCOMING TOURNAMENT
          </h2>
        </div>
        <button
          id="tournament-view-all"
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-bold text-lime-400 hover:text-lime-300 transition-colors uppercase tracking-wider group cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Main Tournament Card */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-[#0c131d] to-[#121d2b] p-5 space-y-4">
        {/* Card Background Graphics */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-80 overflow-hidden">
          <img
            src={tournament.image}
            alt={tournament.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop';
            }}
            className="w-full h-full object-cover object-center mix-blend-lighten"
            style={{
              maskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)'
            }}
          />
        </div>

        {/* Status Badge */}
        <div>
          {tournament.status === 'LIVE' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-500 font-black text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              ★ LIVE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-lime-500/20 border border-lime-500/40 text-lime-400 font-black text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
              ★ UPCOMING
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="relative z-10 space-y-1">
          <h3 className="text-xl font-black text-white tracking-tight uppercase">
            {tournament.title}
          </h3>
          <p className="text-xs font-medium text-slate-300">{tournament.subtitle}</p>
        </div>

        {/* Date & Time */}
        <div className="relative z-10 flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-lime-400" />
          <span>{tournament.date.toLowerCase() === 'upcoming' ? 'Upcoming' : `${tournament.date} · ${tournament.time}`}</span>
        </div>

        {/* Prize Pool */}
        <div className="relative z-10 pt-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prize Pool</p>
          <p className="text-2xl font-black text-lime-400 tracking-tight drop-shadow-[0_0_12px_rgba(163,230,53,0.4)]">
            {tournament.prizePool}
          </p>
        </div>

        {/* Register Button & Countdown Row */}
        <div className="relative z-10 pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
          {/* Register Button */}
          <button
            id="tournament-register-now-btn"
            onClick={onRegister}
            className="bg-lime-400 hover:bg-lime-300 text-black px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all transform active:scale-95 cursor-pointer"
          >
            REGISTER NOW
          </button>

          {/* Ticking Countdown Block */}
          <div className="flex items-center gap-2 bg-[#080c14]/80 px-3 py-1.5 rounded-xl border border-slate-800/80 font-mono text-center">
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">DAYS</p>
              <p className="text-xs font-extrabold text-white">{formatTwo(timeLeft.days)}</p>
            </div>
            <span className="text-lime-400 font-bold text-xs">:</span>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">HRS</p>
              <p className="text-xs font-extrabold text-white">{formatTwo(timeLeft.hours)}</p>
            </div>
            <span className="text-lime-400 font-bold text-xs">:</span>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">MINS</p>
              <p className="text-xs font-extrabold text-white">{formatTwo(timeLeft.minutes)}</p>
            </div>
            <span className="text-lime-400 font-bold text-xs">:</span>
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">SECS</p>
              <p className="text-xs font-extrabold text-lime-400">{formatTwo(timeLeft.seconds)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
