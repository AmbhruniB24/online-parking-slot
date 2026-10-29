// [Experiment 1] Interactive FAQ Accordion Section
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the barrier gate open when I arrive at the parking facility?',
      a: 'The entry barrier is equipped with high-resolution ANPR (Automatic Number Plate Recognition) cameras. When you drive up to the barrier, the camera scans your vehicle plate, matches it with your active reservation, and lifts the boom automatically in under 1.2 seconds. Alternatively, you can scan your digital pass QR code on the kiosk scanner.'
    },
    {
      q: 'How does the direct WhatsApp pass notification work?',
      a: 'Upon completing your reservation, our automated system generates a formal English confirmation ticket containing your Ticket ID, Bay Number, Floor, Vehicle Number, and Entry Barcode. The message is immediately queued for direct WhatsApp delivery and can also be opened instantly via the 1-click WhatsApp launcher.'
    },
    {
      q: 'What happens if I run late and arrive after my scheduled entry time?',
      a: 'Your reserved bay remains locked and protected exclusively for you for the full duration of your booked pass. If you arrive 15-30 minutes late, your bay will still be 100% empty and waiting for your vehicle.'
    },
    {
      q: 'How does the EV Fast Charging bay work?',
      a: 'When you book an EV bay (e.g. A-03 or A-04), a dedicated 60kW DC fast charging terminal is unlocked at your bay. Plug it into your vehicle, and charging commences automatically alongside your parking pass.'
    },
    {
      q: 'Is my vehicle safe while parked in the facility?',
      a: 'All deck floors are monitored 24/7 by continuous 4K CCTV surveillance cameras, automated license plate logs, fire suppression sensors, and trained on-site security marshals.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      
      <div className="text-center mb-12">
        <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3.5 py-1 rounded-full border border-cyan-800">
          Knowledge Base
        </span>
        <h2 className="text-3xl font-black text-white mt-3">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-[#0c1424] overflow-hidden transition-all shadow-md"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left font-black text-white flex items-center justify-between hover:bg-slate-800/50 transition-colors text-sm sm:text-base cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform duration-200 shrink-0 ml-4 ${
                  isOpen ? 'rotate-180 text-cyan-400' : ''
                }`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
