// [Experiment 1 & 8] Interactive FASTag & ANPR Boom Barrier Gate Simulator Widget
import React, { useState } from 'react';
import { Radio, Car, ShieldCheck, Zap, CheckCircle2, Play, RefreshCw, Camera } from 'lucide-react';

export default function BarrierGateSimulator({ selectedLocation }) {
  const [plate, setPlate] = useState('MH 02 CD 4567');
  const [gateState, setGateState] = useState('idle'); // 'idle' | 'scanning' | 'authorized' | 'open'
  const [barrierAngle, setBarrierAngle] = useState(0); // 0 deg = horizontal, 75 deg = open

  const handleSimulateEntry = () => {
    if (gateState !== 'idle') return;

    setGateState('scanning');
    setBarrierAngle(0);

    // Step 1: Camera scans plate
    setTimeout(() => {
      setGateState('authorized');

      // Step 2: Boom barrier lifts
      setTimeout(() => {
        setGateState('open');
        setBarrierAngle(75);

        // Step 3: Vehicle enters and gate closes after 4 seconds
        setTimeout(() => {
          setBarrierAngle(0);
          setGateState('idle');
        }, 4000);
      }, 900);
    }, 1200);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900/50 shadow-2xl relative overflow-hidden my-8">
      
      {/* Background Decorative Ambient */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Explanation */}
        <div className="space-y-3 max-w-lg text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
            <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>INTERACTIVE HARDWARE DEMO</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Live Automated Boom Barrier & FASTag Simulator
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Test how our automated ANPR optical cameras scan your vehicle registration plate and raise the boom barrier in under 1.2 seconds.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 pt-1">
            <span className="flex items-center text-emerald-400">
              <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" /> RFID FASTag Active
            </span>
            <span className="flex items-center text-blue-400">
              <Camera className="w-4 h-4 mr-1 text-blue-400" /> 4K ANPR Optical Scan
            </span>
          </div>
        </div>

        {/* Right: Interactive Barrier & Vehicle Simulation Station */}
        <div className="w-full lg:w-auto bg-slate-950/80 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-w-[320px] sm:min-w-[360px] space-y-5">
          
          {/* Top Camera Scanner Animation */}
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
            <span className="text-slate-400">GATE 01 (ENTRY)</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              gateState === 'open'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                : gateState === 'scanning'
                ? 'bg-amber-950 text-amber-400 border border-amber-700 animate-pulse'
                : 'bg-slate-800 text-slate-400'
            }`}>
              {gateState === 'open' ? 'BARRIER LIFTED' : gateState === 'scanning' ? 'ANPR SCANNING...' : 'WAITING FOR VEHICLE'}
            </span>
          </div>

          {/* Graphical Barrier Arm & Gate Graphic */}
          <div className="w-full h-32 bg-slate-900 rounded-2xl border border-slate-800 relative flex items-end justify-between px-6 pb-4 overflow-hidden">
            
            {/* Entry Lane Road Texture */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-800 border-t border-slate-700 flex items-center justify-around px-8">
              <span className="w-8 h-1 bg-amber-400/70 rounded-full" />
              <span className="w-8 h-1 bg-amber-400/70 rounded-full" />
              <span className="w-8 h-1 bg-amber-400/70 rounded-full" />
            </div>

            {/* Approaching Car Silhouette */}
            <div className={`relative z-10 transition-all duration-700 flex flex-col items-center ${
              gateState === 'open' ? 'translate-x-32 opacity-30' : gateState === 'scanning' ? 'translate-x-6' : 'translate-x-0'
            }`}>
              <div className="w-12 h-6 bg-blue-600 rounded-t-lg relative border border-blue-400">
                <span className="w-2 h-1 bg-amber-300 absolute left-1 bottom-1 rounded-sm" />
                <span className="w-2 h-1 bg-amber-300 absolute right-1 bottom-1 rounded-sm" />
              </div>
              <span className="text-[9px] font-mono text-white font-bold mt-0.5">{plate}</span>
            </div>

            {/* Barrier Gate Post and Pivot Arm */}
            <div className="relative z-20 flex items-end">
              {/* Animated Barrier Arm */}
              <div
                className="w-28 h-3 rounded-full bg-gradient-to-r from-rose-500 via-white to-rose-500 shadow-md origin-bottom-left transition-transform duration-500 ease-out -mb-1.5 ml-2 border border-slate-900"
                style={{ transform: `rotate(-${barrierAngle}deg)` }}
              />

              {/* Metal Base Post */}
              <div className="w-6 h-16 bg-slate-700 rounded-t-md border border-slate-600 flex flex-col items-center justify-start pt-1.5">
                <span className={`w-3 h-3 rounded-full transition-colors ${
                  gateState === 'open' ? 'bg-emerald-400 shadow-lg shadow-emerald-400' : 'bg-rose-500 shadow-lg shadow-rose-500'
                }`} />
              </div>
            </div>

          </div>

          {/* Control Bar */}
          <div className="w-full space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                placeholder="MH 02 AB 1234"
                className="flex-1 px-3 py-2 text-xs font-mono font-bold bg-slate-900 border border-slate-700 rounded-xl text-white uppercase text-center focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSimulateEntry}
                disabled={gateState !== 'idle'}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{gateState === 'idle' ? 'Test Gate Open' : 'Authorizing...'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center font-mono">
              {gateState === 'open' ? '✅ Gate lifted! Vehicle authorized to enter bay.' : 'Click "Test Gate Open" to run live optical verification.'}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
