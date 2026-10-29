// [Experiment 1] Cyber-Themed 3-Step Process Section
import React from 'react';
import { Search, CreditCard, QrCode, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Bay',
      desc: 'Browse multi-level interactive deck radar with live green/red sensor indicators and clear hourly pricing.',
      icon: <Search className="w-6 h-6 text-cyan-400" />,
      color: 'bg-cyan-950/60 text-cyan-400 border-cyan-800'
    },
    {
      step: '02',
      title: 'Lock & Pay Instantly',
      desc: 'Lock the slot, enter your vehicle registration plate, and pay securely via UPI (GPay/PhonePe), Credit Card, or Debit Card.',
      icon: <CreditCard className="w-6 h-6 text-blue-400" />,
      color: 'bg-blue-950/60 text-blue-400 border-blue-800'
    },
    {
      step: '03',
      title: 'Auto WhatsApp & Park',
      desc: 'Get instant WhatsApp confirmation with digital QR ticket. Approach boom barrier for automatic optical recognition & entry.',
      icon: <QrCode className="w-6 h-6 text-emerald-400" />,
      color: 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3.5 py-1 rounded-full border border-cyan-800">
          Autonomous Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
          How SmartPark Operates
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          From online bay selection to contactless automated boom barrier access in three simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item) => (
          <div
            key={item.step}
            className="relative bg-[#0c1424] p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all group select-none"
          >
            {/* Step Number Watermark */}
            <span className="absolute top-6 right-6 text-4xl font-black text-slate-800 group-hover:text-cyan-950 transition-colors font-mono">
              {item.step}
            </span>

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.color} mb-6 shadow-md`}>
              {item.icon}
            </div>

            <h3 className="text-xl font-black text-white mb-2">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
