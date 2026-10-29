// [Experiment 1 & 6] Cyber-Executive Navigation Bar with Smooth Scroll & Real-Time IoT Telemetry
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Car, MapPin, LogOut, User, LayoutDashboard,
  Ticket, Menu, X, ChevronDown, Sparkles, ShieldCheck
} from 'lucide-react';

export default function Navbar({
  onOpenAuth,
  onToggleAdmin,
  showAdminView,
  onOpenMyBookings,
  bookingCount = 0,
  selectedLocation,
  onOpenLocationModal
}) {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070b14]/90 backdrop-blur-2xl border-b border-slate-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo & Cyber Tag */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-all">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-white">
                Smart<span className="text-cyan-400">Park</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800 shadow-xs">
                Live IoT 2.0
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-400 -mt-0.5 tracking-wide hidden sm:block">
              Online Parking Slot Booking System
            </p>
          </div>
        </div>

        {/* Center: Cyber Nav Links (With reliable smooth scroll) */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-wider text-slate-300">
          <button onClick={() => scrollTo('slots-section')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Parking Radar
          </button>
          <button onClick={() => scrollTo('how-it-works')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            How It Works
          </button>
          <button onClick={() => scrollTo('pricing')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            Tariffs & Rates
          </button>
          <button onClick={() => scrollTo('features')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            IoT Features
          </button>
          <button onClick={() => scrollTo('faq')} className="hover:text-cyan-400 transition-colors cursor-pointer">
            FAQs
          </button>
        </nav>

        {/* Right: City Selector, Passes & Auth */}
        <div className="hidden sm:flex items-center space-x-3">
          
          {/* Location Selector */}
          {selectedLocation && (
            <button
              onClick={onOpenLocationModal}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#0f172a] hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-white transition-all cursor-pointer shadow-sm"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-600/20 text-cyan-400 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="block text-[9px] text-slate-400 font-black uppercase">City</span>
                <span className="block text-xs font-black text-white max-w-[110px] truncate leading-tight">
                  {selectedLocation.city || selectedLocation.name}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>
          )}

          {/* User Active Passes */}
          {user && (
            <button
              onClick={onOpenMyBookings}
              className="relative px-3.5 py-2 rounded-xl text-xs font-black text-slate-200 hover:text-white bg-[#0f172a] hover:bg-slate-800 border border-slate-700 transition-all flex items-center space-x-2 cursor-pointer shadow-sm"
            >
              <Ticket className="w-4 h-4 text-cyan-400" />
              <span>My Passes</span>
              {bookingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {bookingCount}
                </span>
              )}
            </button>
          )}

          {/* Admin Switcher */}
          {user && (isAdmin || user.role === 'admin') && (
            <button
              onClick={onToggleAdmin}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all cursor-pointer ${
                showAdminView
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-amber-400 border border-amber-500/40 hover:bg-slate-700'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{showAdminView ? 'Exit Terminal' : 'Admin Terminal'}</span>
            </button>
          )}

          {/* User Profile / Auth */}
          {user ? (
            <div className="flex items-center space-x-2 pl-1">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-cyan-400 font-black text-xs flex items-center justify-center">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="text-left hidden lg:block">
                  <span className="block text-xs font-black text-white leading-none">{user.name}</span>
                  <span className="text-[10px] text-slate-400 capitalize">{user.role || 'driver'}</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              Sign In / Driver
            </button>
          )}

        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c1424] border-b border-slate-800 px-4 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-black">
            <button
              onClick={() => scrollTo('slots-section')}
              className="p-3 rounded-xl bg-slate-900 text-white text-left"
            >
              Parking Radar
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="p-3 rounded-xl bg-slate-900 text-white text-left"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('pricing')}
              className="p-3 rounded-xl bg-slate-900 text-white text-left"
            >
              Tariffs & Rates
            </button>
            <button
              onClick={() => scrollTo('features')}
              className="p-3 rounded-xl bg-slate-900 text-white text-left"
            >
              IoT Features
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black text-white">{user.name} ({user.role})</span>
                <button onClick={logout} className="text-xs text-rose-400 font-bold">Logout</button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-black"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
