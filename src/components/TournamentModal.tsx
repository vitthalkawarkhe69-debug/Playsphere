import React, { useState } from 'react';
import { X, Trophy, Shield, Users, CheckCircle } from 'lucide-react';
import { Tournament } from '../types';

interface TournamentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: Tournament;
  onSuccess: (teamName: string) => void;
}

export const TournamentModal: React.FC<TournamentModalProps> = ({
  isOpen,
  onClose,
  tournament,
  onSuccess,
}) => {
  if (!isOpen) return null;

  const [teamName, setTeamName] = useState('');
  const [captainRiotId, setCaptainRiotId] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !captainRiotId) return;
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(teamName);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#121824] border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        {/* Header Banner */}
        <div className="relative h-32 bg-gradient-to-r from-emerald-950 via-slate-900 to-lime-950 p-5 flex items-end">
          <img
            src={tournament.image}
            alt={tournament.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-lighten"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="relative z-10">
            <span className="text-[10px] font-black bg-lime-400 text-black px-2 py-0.5 rounded-full uppercase">
              REGISTRATION OPEN
            </span>
            <h3 className="text-xl font-black text-white tracking-wider uppercase mt-1">
              {tournament.title}
            </h3>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-lime-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Registration Confirmed!</h4>
            <p className="text-xs text-slate-300">
              Team <span className="text-lime-400 font-bold">{teamName}</span> is registered for {tournament.title}. Check your registered email for bracket details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#0e131d] p-3 rounded-2xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">Prize Pool</span>
                <span className="font-bold text-lime-400">{tournament.prizePool}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Entry Fee</span>
                <span className="font-bold text-white">{tournament.entryFee}</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase">Team Name *</label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Vipers Esports"
                className="w-full bg-[#0e131d] border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-lime-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase">Captain Riot ID / Tag *</label>
              <input
                type="text"
                required
                value={captainRiotId}
                onChange={(e) => setCaptainRiotId(e.target.value)}
                placeholder="e.g. GamerX#VAL"
                className="w-full bg-[#0e131d] border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-lime-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase">Contact Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[#0e131d] border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-lime-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-300 text-black py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.4)] transition-all cursor-pointer mt-2"
            >
              PAY & SUBMIT REGISTRATION ({tournament.entryFee})
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
