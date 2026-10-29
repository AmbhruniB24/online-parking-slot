// [Experiment 3] AI Smart Slot Recommender - Fast 1-Click Bay Selector
import React from 'react';
import { Sparkles, Zap, DollarSign, Navigation, ShieldCheck } from 'lucide-react';

export default function SmartFinderWidget({ slots, onAutoSelect }) {
  const handleRecommend = (type) => {
    let chosen = null;

    if (type === 'fastest') {
      // Closest to exit gate on Floor 1
      chosen = slots.find((s) => s.floor === 1 && s.status === 'available');
    } else if (type === 'ev') {
      // EV bay
      chosen = slots.find((s) => s.type === 'EV' && s.status === 'available');
    } else if (type === 'budget') {
      // Cheapest available bay
      const available = slots.filter((s) => s.status === 'available');
      if (available.length > 0) {
        chosen = available.reduce((min, s) => (s.pricePerHour < min.pricePerHour ? s : min), available[0]);
      }
    }

    if (chosen) {
      onAutoSelect(chosen);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50/70 to-blue-50 border border-blue-200/80 rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
      <div className="flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-black text-slate-900 block">AI Smart Bay Recommender</span>
          <span className="text-[11px] text-slate-500 font-medium">Auto-pick the best available parking bay in 1-click:</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <button
          type="button"
          onClick={() => handleRecommend('fastest')}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 text-slate-700 text-xs font-bold transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
        >
          <Navigation className="w-3 h-3 text-blue-500" />
          <span>Closest to Exit</span>
        </button>

        <button
          type="button"
          onClick={() => handleRecommend('ev')}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-500 hover:text-white border border-slate-200 hover:border-amber-500 text-slate-700 text-xs font-bold transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
        >
          <Zap className="w-3 h-3 text-amber-500" />
          <span>Fast EV Bay</span>
        </button>

        <button
          type="button"
          onClick={() => handleRecommend('budget')}
          className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-600 hover:text-white border border-slate-200 hover:border-emerald-600 text-slate-700 text-xs font-bold transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
        >
          <DollarSign className="w-3 h-3 text-emerald-600" />
          <span>Lowest Tariff</span>
        </button>
      </div>
    </div>
  );
}
