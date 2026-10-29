// [Experiment 1] Transparent Parking Tariffs & Pricing Tiers
import React from 'react';
import { Check, Zap, Bike, Car, ArrowRight } from 'lucide-react';

export default function PricingSection() {
  const tiers = [
    {
      name: '2-Wheeler Deck',
      icon: <Bike className="w-6 h-6 text-violet-400" />,
      rate: '₹30',
      period: 'per hour',
      description: 'Covered parking bays designated for motorcycles and scooters.',
      features: [
        'Deck Level 2 Access',
        '24/7 CCTV Optical Surveillance',
        'Direct UPI QR & WhatsApp Pass',
        '15-Minute Free Grace Period'
      ],
      cta: 'Reserve Bike Bay',
      highlighted: false
    },
    {
      name: 'Standard 4-Wheeler',
      icon: <Car className="w-6 h-6 text-cyan-400" />,
      rate: '₹60',
      period: 'per hour',
      description: 'Spacious bays with wide door clearance for sedans, hatchbacks, and SUVs.',
      features: [
        'Deck Level 1 Prime Bay',
        'Automated ANPR Plate Scanning',
        'Overhead Ultrasonic Sensor Guidance',
        'Guaranteed Bay Lock with Barrier Sync',
        'Instant WhatsApp Confirmation Pass'
      ],
      cta: 'Reserve Car Bay',
      highlighted: true
    },
    {
      name: 'EV Hypercharger Bay',
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      rate: '₹90',
      period: 'per hour',
      description: 'Dedicated electric vehicle parking bay with integrated DC fast charging.',
      features: [
        'Deck Level 1 Entry Aisle',
        'High-Speed 60kW DC Dual Guns',
        'Automatic Cut-Off at 100% Charge',
        'Universal CCS2 / Type-2 Plugs',
        'Live Battery Telemetry in App'
      ],
      cta: 'Reserve EV Station',
      highlighted: false
    }
  ];

  const scrollToSlots = () => {
    document.getElementById('slots-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800">
          Transparent Tariffs
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
          Predictable Hourly Pricing
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          No hidden surge charges or surprise gate fees. Pay only for the duration reserved.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative select-none ${
              tier.highlighted
                ? 'bg-gradient-to-b from-[#111e3b] to-[#0c1424] border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.25)] -translate-y-2'
                : 'bg-[#0c1424] border border-slate-800 hover:border-slate-700'
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-[10px] tracking-widest uppercase px-4 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  {tier.icon}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                  {tier.period}
                </span>
              </div>

              <h3 className="text-xl font-black text-white mb-1">
                {tier.name}
              </h3>

              <div className="flex items-baseline space-x-1 mb-4">
                <span className="text-4xl font-black text-white font-mono">{tier.rate}</span>
                <span className="text-xs text-slate-400 font-medium">/ hr</span>
              </div>

              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                {tier.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                {tier.features.map((feat) => (
                  <div key={feat} className="flex items-center space-x-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToSlots}
              className={`mt-8 w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                tier.highlighted
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              <span>{tier.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
