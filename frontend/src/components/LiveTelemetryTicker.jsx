// [Experiment 8] Live IoT Telemetry Ticker across Nationwide Smart Facilities
import React, { useState, useEffect } from 'react';
import { Radio, Zap, CheckCircle2, ShieldCheck, Car } from 'lucide-react';

const INITIAL_EVENTS = [
  { id: 1, text: 'CSMI Airport T2 (Mumbai): Bay A-04 vacated • Sensor marked green', time: '5s ago', type: 'vacate' },
  { id: 2, text: 'Bandra Kurla Complex: Bay B-02 booked via FASTag (MH-02-CD-4567)', time: '18s ago', type: 'book' },
  { id: 3, text: 'Phoenix Marketcity (Pune): EV Fast Charger activated at Bay A-03 (50kW)', time: '42s ago', type: 'ev' },
  { id: 4, text: 'Indiranagar Metro (Bengaluru): Boom Barrier opened • ANPR verified', time: '1m ago', type: 'gate' },
  { id: 5, text: 'Cyber Hub DLF (Gurugram): Bay C-01 reserved for 4 hours', time: '2m ago', type: 'book' }
];

export default function LiveTelemetryTicker() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [events.length]);

  const currentEvent = events[currentIndex];

  return (
    <div className="bg-slate-900 text-white text-xs border-b border-slate-800 py-2.5 px-4 overflow-hidden relative shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Indicator */}
        <div className="flex items-center space-x-2.5 flex-shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] font-black uppercase tracking-widest text-emerald-400 flex items-center">
            <Radio className="w-3.5 h-3.5 mr-1 animate-pulse" />
            LIVE SENSOR NETWORK FEED
          </span>
        </div>

        {/* Center Animated Event Text */}
        <div className="hidden sm:flex items-center space-x-2 truncate mx-4">
          <span className="text-slate-500 font-mono text-[11px]">[{currentEvent.time}]</span>
          <span className="text-slate-200 font-medium truncate">
            {currentEvent.text}
          </span>
        </div>

        {/* Right Status */}
        <div className="flex items-center space-x-4 text-[11px] text-slate-400 flex-shrink-0">
          <span className="flex items-center text-blue-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> FASTag v2.4 Active
          </span>
          <span className="hidden md:inline text-slate-600">•</span>
          <span className="hidden md:flex items-center text-amber-400 font-semibold">
            <Zap className="w-3.5 h-3.5 mr-1" /> 98.4% Network Uptime
          </span>
        </div>

      </div>
    </div>
  );
}
