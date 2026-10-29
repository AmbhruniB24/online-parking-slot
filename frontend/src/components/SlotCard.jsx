// [Experiment 1 & 8] High-Tech Cyber-Deck Parking Bay Card with Ambient Neon Glows
import React from 'react';
import { Car, Bike, Zap, Check, ArrowRight, ShieldCheck, Radio } from 'lucide-react';

export default function SlotCard({ slot, onSelect, isSelected }) {
  const isAvailable = slot.status === 'available';
  const isOccupied = slot.status === 'occupied';

  const typeConfig = {
    '4-wheeler': { label: 'Car Bay', icon: <Car className="w-4 h-4 text-cyan-400" />, badge: 'bg-cyan-950 text-cyan-300 border-cyan-800' },
    '2-wheeler': { label: 'Bike Bay', icon: <Bike className="w-4 h-4 text-violet-400" />, badge: 'bg-violet-950 text-violet-300 border-violet-800' },
    'EV': { label: 'EV Station', icon: <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />, badge: 'bg-amber-950 text-amber-300 border-amber-800' }
  }[slot.type] || { label: 'Vehicle Bay', icon: <Car className="w-4 h-4 text-slate-400" />, badge: 'bg-slate-800 text-slate-300 border-slate-700' };

  let cardClass = "bg-[#0f172a] border-slate-800 hover:border-emerald-500/80 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] cursor-pointer hover:-translate-y-1";
  let statusBadge = "bg-emerald-950/80 text-emerald-400 border-emerald-500/50 shadow-sm shadow-emerald-500/20";
  let statusText = "Ready to Park";

  if (isSelected) {
    cardClass = "bg-[#131d36] border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] ring-2 ring-cyan-400/50 scale-[1.02] cursor-pointer";
    statusBadge = "bg-cyan-500 text-slate-950 border-cyan-400 font-black";
    statusText = "Selected";
  } else if (isOccupied) {
    cardClass = "bg-[#090d16] border-slate-800/80 text-slate-600 opacity-65 cursor-not-allowed";
    statusBadge = "bg-rose-950/60 text-rose-400 border-rose-900/60";
    statusText = "Occupied";
  }

  return (
    <div
      onClick={() => isAvailable && onSelect(slot)}
      className={`p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between h-48 select-none relative overflow-hidden group ${cardClass}`}
    >
      {/* Background Subtle Bay Lane Marking Simulation */}
      <div className="absolute top-0 left-3 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-slate-800 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-3 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-slate-800 to-transparent pointer-events-none" />

      {/* Top Bar: Vehicle Type and Deck */}
      <div className="flex items-center justify-between z-10">
        <span className="flex items-center space-x-1.5 text-xs font-black">
          <span className="p-1.5 rounded-xl bg-slate-900 border border-slate-700/80 shadow-inner">
            {typeConfig.icon}
          </span>
          <span className="text-slate-300">{typeConfig.label}</span>
        </span>
        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
          Deck {slot.floor}
        </span>
      </div>

      {/* Center: Slot Number & Tariff */}
      <div className="text-center my-auto z-10">
        <span className="text-3xl sm:text-4xl font-black tracking-tight text-white block leading-none font-mono group-hover:scale-105 transition-transform">
          {slot.slotNumber}
        </span>
        <div className="flex items-center justify-center space-x-1 mt-1.5">
          <span className="text-sm font-black text-emerald-400 font-mono">₹{slot.pricePerHour}</span>
          <span className="text-[10px] text-slate-400 font-medium">/ hour</span>
        </div>
      </div>

      {/* Bottom: Status Pill & Action */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-xs z-10">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-black tracking-wide ${statusBadge}`}>
          {isAvailable && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>}
          {statusText}
        </span>

        {isAvailable && !isSelected && (
          <span className="text-xs font-black text-cyan-400 flex items-center group-hover:translate-x-1 transition-transform">
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </span>
        )}

        {isSelected && (
          <span className="text-xs font-black text-cyan-300 flex items-center">
            <Check className="w-3.5 h-3.5 mr-0.5" /> Locked
          </span>
        )}

        {isOccupied && (
          <span className="text-[11px] font-bold text-slate-500 font-mono">
            Sensor Active
          </span>
        )}
      </div>
    </div>
  );
}
