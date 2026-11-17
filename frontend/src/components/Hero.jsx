// [Experiment 1] Futuristic Cyber-Executive Hero Section with Live IoT Radar HUD
import React, { useState } from 'react';
import {
  Search, MapPin, Clock, Car, ChevronDown, CheckCircle2,
  Sparkles, ArrowRight, ShieldCheck, Zap, QrCode, Radio, Compass
} from 'lucide-react';

export default function Hero({ selectedLocation, onOpenLocationModal }) {
  const [vehicleType, setVehicleType] = useState('4-wheeler');
  const [duration, setDuration] = useState('2');

  const handleSearch = (e) => {
    e.preventDefault();
    document.getElementById('slots-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const availBays = selectedLocation?.availableBays ?? 12;
  const totalBays = selectedLocation?.totalBays ?? 18;
  const occupancyPct = Math.round(((totalBays - availBays) / totalBays) * 100);

  return (
    <section className="relative pt-10 pb-20 overflow-hidden bg-[#070b14] border-b border-slate-800 text-white">
      
      {/* High-Tech Glowing Ambient Mesh Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Cyber Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Vision & Interactive Search (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Live Telemetry Pill Badge */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#0d1627] border border-cyan-500/30 text-xs font-black text-cyan-300 shadow-md shadow-cyan-500/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>NATIONWIDE IOT PARKING NETWORK &bull; 50+ SMART CITIES</span>
            </div>

            {/* Main Cyber Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
                NEXT-GEN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                  SMART PARKING
                </span> <br />
                RESERVATION.
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl leading-relaxed">
                Autonomous ultrasonic occupancy detection, instant digital QR pass barcodes, and automated email ticket dispatch in real-time.
              </p>
            </div>

            {/* Sleek Floating Search Console */}
            <div className="bg-[#0c1424]/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-[0_0_40px_rgba(30,58,138,0.25)] max-w-xl space-y-4">
              <form onSubmit={handleSearch} className="space-y-3.5">
                
                {/* Location Select Button */}
                <div
                  onClick={onOpenLocationModal}
                  className="p-3.5 rounded-2xl bg-[#111c33] hover:bg-[#152340] border border-slate-700/80 transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <span className="block text-[10px] uppercase font-black tracking-wider text-cyan-400">Selected Facility</span>
                      <span className="block text-sm font-black text-white truncate">
                        {selectedLocation?.name || 'SmartPark Cyber City Facility'}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors ml-2 shrink-0" />
                </div>

                {/* Vehicle Type & Reserved Duration Controls */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Vehicle Type Selector */}
                  <div className="p-3 rounded-2xl bg-[#111c33] border border-slate-700/80">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                      Vehicle Type
                    </label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="w-full bg-transparent text-xs font-black text-white focus:outline-none cursor-pointer"
                    >
                      <option value="4-wheeler" className="bg-slate-900 text-white">4-Wheeler Car</option>
                      <option value="2-wheeler" className="bg-slate-900 text-white">2-Wheeler Bike</option>
                      <option value="EV" className="bg-slate-900 text-white">⚡ EV Fast Charging</option>
                    </select>
                  </div>

                  {/* Duration Selector */}
                  <div className="p-3 rounded-2xl bg-[#111c33] border border-slate-700/80">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                      Duration
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-transparent text-xs font-black text-white focus:outline-none cursor-pointer"
                    >
                      <option value="1" className="bg-slate-900 text-white">1 Hour Pass</option>
                      <option value="2" className="bg-slate-900 text-white">2 Hours Pass</option>
                      <option value="4" className="bg-slate-900 text-white">4 Hours Pass</option>
                      <option value="8" className="bg-slate-900 text-white">Full Day (8 Hrs)</option>
                    </select>
                  </div>

                </div>

                {/* Primary Action Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 flex items-center justify-center space-x-2 transition-all cursor-pointer group"
                >
                  <Search className="w-4 h-4" />
                  <span>Inspect Available Bays on Radar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </form>
            </div>

            {/* Quick Guarantees */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 font-bold">
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant Bay Locking</span>
              </span>
              <span className="flex items-center space-x-1.5 text-cyan-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>FASTag Gate Auto-Lift</span>
              </span>
              <span className="flex items-center space-x-1.5 text-amber-400">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>60kW DC EV Charging</span>
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Radar HUD & Garage Telemetry (5 cols) */}
          <div className="lg:col-span-5 relative select-none">
            
            {/* High-Tech Terminal Card */}
            <div className="bg-[#0b1220] rounded-3xl p-6 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] space-y-5 relative overflow-hidden">
              
              {/* Spinning Radar Sweep Animation */}
              <div className="relative w-48 h-48 mx-auto rounded-full border-2 border-cyan-500/30 bg-[#070e1b] flex items-center justify-center overflow-hidden shadow-inner">
                {/* Concentric Radar Rings */}
                <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-12 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-20 rounded-full border border-cyan-500/20" />
                {/* Crosshairs */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/20" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/20" />
                {/* Rotating Beam */}
                <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(6,182,212,0.45)_360deg)] animate-spin" style={{ animationDuration: '4s' }} />
                {/* Center Core */}
                <div className="relative z-10 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                  <Radio className="w-4 h-4 animate-pulse" />
                </div>
                {/* Blips */}
                <span className="absolute top-10 left-12 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="absolute bottom-12 right-14 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="absolute top-16 right-10 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
                <span className="text-cyan-400 font-bold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>IOT SENSOR RADAR #09</span>
                </span>
                <span className="text-slate-400">FREQ: 2.4 GHz</span>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-3 text-left font-mono">
                <div className="p-3 rounded-2xl bg-[#080d19] border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Available Bays</span>
                  <span className="text-2xl font-black text-emerald-400 block mt-0.5">{availBays} Free</span>
                  <span className="text-[10px] text-slate-400">Deck 1 &bull; Ready</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#080d19] border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Deck Capacity</span>
                  <span className="text-2xl font-black text-white block mt-0.5">{occupancyPct}%</span>
                  <span className="text-[10px] text-cyan-400">{totalBays} Total Bays</span>
                </div>
              </div>

              {/* Live Sensor Ticker */}
              <div className="p-3 rounded-xl bg-[#080d19] border border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>SENSOR: HC-SR04 #A04</span>
                <span className="text-emerald-400 font-bold">STATE: CLEAR (4.2m)</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
