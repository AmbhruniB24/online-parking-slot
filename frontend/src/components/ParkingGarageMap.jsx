// [Experiment 1 & 8] Ultra-unique, interactive 2D Architectural Garage Floorplan with Top-Down Parked Vehicles
import React from 'react';
import { Car, Bike, Zap, Check, Lock, ArrowUp, ArrowRight, ShieldCheck, Radio } from 'lucide-react';

export default function ParkingGarageMap({ slots, selectedSlot, onSelectSlot, floor = 1 }) {
  const rowA = slots.slice(0, Math.ceil(slots.length / 2));
  const rowB = slots.slice(Math.ceil(slots.length / 2));

  return (
    <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-2xl relative overflow-hidden select-none">
      
      {/* Ambient Floor Glow Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

      {/* Garage Architectural Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3 text-xs font-mono">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white font-bold text-sm tracking-wider">
            GARAGE DECK LEVEL {floor} &bull; LIVE RADAR VIEW
          </span>
        </div>

        <div className="flex items-center space-x-4 text-[11px] text-slate-400">
          <span className="flex items-center text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 shadow-sm shadow-emerald-400/50" />
            Green = Empty Bay
          </span>
          <span className="flex items-center text-slate-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 mr-1.5" />
            Vehicle Parked
          </span>
          <span className="flex items-center text-amber-400">
            <Zap className="w-3.5 h-3.5 mr-1 fill-amber-400" />
            EV Charger
          </span>
        </div>
      </div>

      {/* Top Row Bays (North Wing) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-slate-400 px-1">
          <span>Aisle A (North Bay Deck)</span>
          <span>CCTV Monitored Zone</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {rowA.map((slot) => (
            <GarageBayItem
              key={slot._id}
              slot={slot}
              isSelected={selectedSlot?._id === slot._id}
              onSelect={onSelectSlot}
            />
          ))}
        </div>
      </div>

      {/* Central Asphalt Roadway with Entry Boom Barrier & Driving Lane */}
      <div className="my-7 relative bg-slate-800/90 rounded-2xl border border-slate-700/80 p-4 overflow-hidden">
        
        {/* Entry Barrier Gate Simulation (Left Side) */}
        <div className="flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            {/* Barrier Gate Post */}
            <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-[10px] font-mono leading-tight">
                <span className="text-white font-bold block">GATE 01</span>
                <span className="text-emerald-400 font-extrabold text-[9px]">FASTag OPEN</span>
              </div>
            </div>

            {/* Striped Barrier Arm */}
            <div className="w-16 h-2 rounded-full bg-gradient-to-r from-rose-500 via-white to-rose-500 shadow-sm hidden sm:block -rotate-12 origin-left transition-transform" />
          </div>

          {/* Central Dashed Yellow Centerline */}
          <div className="flex items-center space-x-3 text-amber-400/80 font-mono text-xs font-bold">
            <ArrowRight className="w-4 h-4 animate-pulse text-amber-400" />
            <span className="tracking-widest hidden md:inline">ONE WAY DRIVING AISLE &bull; SPEED LIMIT 10 KM/H</span>
            <div className="flex space-x-2">
              <span className="w-6 h-1 bg-amber-400 rounded-full" />
              <span className="w-6 h-1 bg-amber-400 rounded-full" />
              <span className="w-6 h-1 bg-amber-400 rounded-full" />
            </div>
          </div>

          {/* Exit Gate Indicator */}
          <div className="flex items-center space-x-2 text-right">
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
              TO EXIT &rarr;
            </span>
          </div>

        </div>

      </div>

      {/* Bottom Row Bays (South Wing) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-slate-400 px-1">
          <span>Aisle B (South Bay Deck)</span>
          <span>Automated ANPR Zone</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {rowB.map((slot) => (
            <GarageBayItem
              key={slot._id}
              slot={slot}
              isSelected={selectedSlot?._id === slot._id}
              onSelect={onSelectSlot}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

// Subcomponent: Individual Architectural Parking Bay with Parked Car Graphics
function GarageBayItem({ slot, isSelected, onSelect }) {
  const isAvailable = slot.status === 'available';
  const isOccupied = slot.status === 'occupied';
  const isReserved = slot.status === 'reserved';

  let borderStyle = 'border-dashed border-slate-700 bg-slate-800/40 hover:border-emerald-400 hover:bg-slate-800/70 cursor-pointer';
  let lightColor = 'bg-emerald-500 shadow-emerald-500/50';

  if (isSelected) {
    borderStyle = 'border-2 border-blue-500 bg-blue-950/50 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/20 cursor-pointer';
    lightColor = 'bg-blue-400 shadow-blue-400/80';
  } else if (isOccupied) {
    borderStyle = 'border-solid border-slate-800 bg-slate-800/80 opacity-90 cursor-not-allowed';
    lightColor = 'bg-rose-500 shadow-rose-500/50';
  } else if (isReserved) {
    borderStyle = 'border-solid border-amber-900/60 bg-amber-950/30 cursor-not-allowed';
    lightColor = 'bg-amber-400 shadow-amber-400/50';
  }

  return (
    <div
      onClick={() => isAvailable && onSelect(slot)}
      className={`relative rounded-2xl p-3 h-44 flex flex-col justify-between transition-all duration-200 ${borderStyle}`}
    >
      {/* Top Bay Indicator */}
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="font-bold text-slate-300">{slot.slotNumber}</span>
        {/* Overhead Sensor Light */}
        <span className={`w-2.5 h-2.5 rounded-full ${lightColor} ${isAvailable ? 'animate-pulse' : ''}`} />
      </div>

      {/* Center Bay Visual Representation */}
      <div className="my-auto flex flex-col items-center justify-center">
        {isOccupied ? (
          // Realistic Top-Down Car Silhouette
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <svg className="w-14 h-20 text-slate-400 filter drop-shadow-md" viewBox="0 0 60 100" fill="currentColor">
              {/* Car Body Silhouette */}
              <rect x="10" y="5" width="40" height="90" rx="14" fill="#334155" />
              {/* Windshield Front */}
              <rect x="14" y="24" width="32" height="14" rx="4" fill="#0f172a" />
              {/* Rear Glass */}
              <rect x="14" y="65" width="32" height="12" rx="3" fill="#0f172a" />
              {/* Sunroof */}
              <rect x="17" y="42" width="26" height="18" rx="2" fill="#1e293b" />
              {/* Headlights */}
              <circle cx="16" cy="9" r="3" fill="#94a3b8" />
              <circle cx="44" cy="9" r="3" fill="#94a3b8" />
              {/* Taillights */}
              <rect x="14" y="91" width="6" height="3" rx="1" fill="#ef4444" />
              <rect x="40" y="91" width="6" height="3" rx="1" fill="#ef4444" />
              {/* Side Mirrors */}
              <rect x="5" y="26" width="5" height="4" rx="1" fill="#475569" />
              <rect x="50" y="26" width="5" height="4" rx="1" fill="#475569" />
            </svg>
            <span className="text-[9px] font-mono font-bold text-rose-400 mt-1 uppercase">OCCUPIED</span>
          </div>
        ) : isReserved ? (
          <div className="text-center py-2">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-1">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-mono font-bold text-amber-400 uppercase">HELD</span>
          </div>
        ) : (
          // Empty Glowing Bay with Docking Target & Price
          <div className="text-center py-1 group">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-1 transition-transform group-hover:scale-110 ${
              isSelected ? 'bg-blue-600 text-white' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}>
              {slot.type === 'EV' ? (
                <Zap className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
              ) : (
                <span className="text-lg font-black font-mono">P</span>
              )}
            </div>
            <span className="text-xs font-black text-white font-mono block">₹{slot.pricePerHour}/hr</span>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">TAP TO PARK</span>
          </div>
        )}
      </div>

      {/* Bottom Bay Tag */}
      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-700/60 pt-1.5">
        <span className="capitalize">{slot.type}</span>
        {isAvailable && (
          <span className="text-emerald-400 font-bold">FREE</span>
        )}
      </div>
    </div>
  );
}
