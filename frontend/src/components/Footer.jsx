// Clean, high-end commercial footer with payment badges, security certifications, and app links
import React, { useState } from 'react';
import { Car, Mail, Send, ShieldCheck, Lock, Smartphone, Globe, Award } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Smart<span className="text-blue-500">Park</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India's leading automated parking network. Real-time ultrasonic IoT occupancy, contactless FASTag boom barrier access, and instant digital reservation passes across 50+ major cities.
            </p>
            
            {/* Security & Compliance Badges */}
            <div className="pt-2 flex items-center space-x-4 text-xs text-slate-400">
              <div className="flex items-center space-x-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>PCI-DSS Certified</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#slots-section" className="hover:text-white transition-colors">Find Parking Bay</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Tariffs & Hourly Rates</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">EV Fast Charging</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Help & FAQs</a></li>
            </ul>
          </div>

          {/* Top Covered Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Top Cities</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Mumbai & MMR (850+ Hubs)</li>
              <li className="hover:text-white cursor-pointer">Delhi NCR (720+ Hubs)</li>
              <li className="hover:text-white cursor-pointer">Bengaluru (640+ Hubs)</li>
              <li className="hover:text-white cursor-pointer">Hyderabad & Pune (490+ Hubs)</li>
              <li className="hover:text-white cursor-pointer">Chennai & Kolkata (380+ Hubs)</li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Get Offers & Alerts</h4>
            <p className="text-xs text-slate-400">Receive instant alerts for newly opened parking bays and discount tariffs.</p>
            {subscribed ? (
              <div className="p-3 bg-emerald-950/50 border border-emerald-800 rounded-xl text-emerald-400 text-xs font-bold">
                ✓ Subscribed! You will receive updates.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3 pr-9 py-2.5 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button type="submit" title="Subscribe" className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Corporate Copyright & Policy Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <p>© 2026 SmartPark - Online Parking Slot Booking System.</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              VES Institute of Technology (Autonomous Institute Affiliated to University of Mumbai) • Web Engineering Lab Experiments 1–10
            </p>
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">FASTag Guidelines</span>
            <span className="hover:text-slate-400 cursor-pointer">Lab Experiments (1-10)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
