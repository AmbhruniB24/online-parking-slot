// [Experiment 1] Modern Enterprise Features Section
import React from 'react';
import { ShieldCheck, Zap, Radio, Camera, Smartphone, Award, MessageSquare } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Radio className="w-6 h-6 text-emerald-400" />,
      title: 'Ultrasonic Sensor Guidance',
      desc: 'Overhead dual-frequency IoT indicators detect occupancy in under 200ms with real-time green/red state telemetry.'
    },
    {
      icon: <Camera className="w-6 h-6 text-cyan-400" />,
      title: 'ANPR Optical Boom Barriers',
      desc: 'High-speed automated cameras read high-security registration plates for effortless gate lifting in under 1.2s.'
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      title: 'Instant WhatsApp Pass Dispatch',
      desc: 'Automated digital QR ticket codes dispatched directly to your WhatsApp mobile with gate barrier entry barcodes.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Integrated Fast EV Chargers',
      desc: 'High-power 60kW DC chargers mounted directly at dedicated EV bays so your vehicle refuels while you work or shop.'
    },
    {
      icon: <Smartphone className="w-6 h-6 text-blue-400" />,
      title: 'UPI & Multi-Card Contactless Pay',
      desc: 'Zero manual cash queues. Google Pay, PhonePe, Paytm, RuPay, Visa, and Mastercard with 256-bit SSL encryption.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
      title: 'Guaranteed Reservation SLA',
      desc: 'Your reserved slot is locked exclusively for your vehicle license plate with strict automated violation enforcement.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3.5 py-1 rounded-full border border-cyan-800">
          Hardware & Cloud Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
          Engineered for Smart Urban Mobility
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Combining WebSocket telemetry, relational MongoDB models, and real-time WhatsApp automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-[#0c1424] border border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all space-y-4 select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
              {f.icon}
            </div>

            <h3 className="text-lg font-black text-white">
              {f.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
