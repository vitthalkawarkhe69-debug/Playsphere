import React from 'react';
import { Percent, Headphones, ShieldCheck, Users } from 'lucide-react';
import { FEATURES_LIST } from '../data/mockData';

export const FeaturesStrip: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'f1':
        return Percent;
      case 'f2':
        return Headphones;
      case 'f3':
        return ShieldCheck;
      case 'f4':
        return Users;
      default:
        return Percent;
    }
  };

  return (
    <div className="bg-[#121824] rounded-2xl border border-slate-800/80 p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {FEATURES_LIST.map((feat) => {
        const Icon = getIcon(feat.id);
        return (
          <div key={feat.id} className="flex items-center gap-2.5 sm:gap-3.5 p-1.5 sm:p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-lime-400/10 border border-lime-400/30 text-lime-400 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-black text-white tracking-wider uppercase line-clamp-1">
                {feat.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 leading-tight mt-0.5 line-clamp-2 sm:line-clamp-none">
                {feat.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
