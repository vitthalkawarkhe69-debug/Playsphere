import React, { useState } from 'react';
import { X, LogIn, Gamepad2, Shield } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    onLoginSuccess(username);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#121824] border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative p-6 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-lime-400 text-black flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(163,230,53,0.4)]">
            <Gamepad2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-wider">
            {isSignUp ? 'CREATE GAMER ACCOUNT' : 'LOGIN TO PLAYSPHERE'}
          </h3>
          <p className="text-xs text-slate-400">Earn XP, track slot bookings & unlocks discounts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase">Gamer Tag / Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. GamerX"
              className="w-full bg-[#0e131d] border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-lime-400"
            />
          </div>

          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 uppercase">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="gamer@domain.com"
                className="w-full bg-[#0e131d] border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-lime-400"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 uppercase">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0e131d] border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-lime-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-300 text-black py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.4)] transition-all cursor-pointer"
          >
            {isSignUp ? 'REGISTER GAMER ACCOUNT' : 'LOG IN'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-slate-400 hover:text-lime-400 font-bold"
          >
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};
