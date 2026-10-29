// [Experiment 1, 2, 3, 6, 8] Cyber-Executive SmartPark Application Root with Automated Email Dispatch
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSlot } from './redux/bookingSlice';
import { useAuth } from './context/AuthContext';
import { DEFAULT_LOCATION } from './data/locations';
import api from './services/api';

// Components
import Navbar from './components/Navbar';
import LiveTelemetryTicker from './components/LiveTelemetryTicker';
import Hero from './components/Hero';
import SlotGrid from './components/SlotGrid';
import BarrierGateSimulator from './components/BarrierGateSimulator';
import HowItWorks from './components/HowItWorks';
import PricingSection from './components/PricingSection';
import FeaturesSection from './components/FeaturesSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

// Modals
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import MyBookingsModal from './components/MyBookingsModal';
import LocationSearchModal from './components/LocationSearchModal';

export default function App() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  // State Management
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [showAdminView, setShowAdminView] = useState(false);
  const [userBookings, setUserBookings] = useState([]);

  // Fetch active bookings for logged in user
  const fetchUserBookings = async () => {
    if (!user) {
      setUserBookings([]);
      return;
    }
    try {
      const res = await api.get('/bookings/my-bookings');
      const list = res.data?.bookings || res.data?.data || [];
      if (Array.isArray(list)) {
        setUserBookings(list);
      }
    } catch {
      // Local fallback
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, [user]);

  // Handle slot reservation creation & automatic Email dispatch
  const handlePassCreated = (newPass) => {
    setUserBookings((prev) => [newPass, ...prev]);

    // Save to localStorage for instant persistence
    try {
      const stored = JSON.parse(localStorage.getItem(`smartpark_booked_${selectedLocation.id}`) || '[]');
      if (!stored.includes(newPass.slotNumber)) {
        stored.push(newPass.slotNumber);
        localStorage.setItem(`smartpark_booked_${selectedLocation.id}`, JSON.stringify(stored));
      }
    } catch {
      // ignore
    }
  };

  // Handle vacating a slot
  const handleVacateSlot = async (bookingId, slotNumber) => {
    try {
      await api.put(`/bookings/${bookingId}/vacate`);
      setUserBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: 'vacated' } : b))
      );
      // Remove from localStorage
      const stored = JSON.parse(localStorage.getItem(`smartpark_booked_${selectedLocation.id}`) || '[]');
      const filtered = stored.filter((s) => s !== slotNumber);
      localStorage.setItem(`smartpark_booked_${selectedLocation.id}`, JSON.stringify(filtered));

      window.dispatchEvent(new CustomEvent('smartpark_slot_booked', {
        detail: { slotNumber, status: 'available' }
      }));
    } catch (err) {
      console.error('Failed to vacate slot:', err);
      setUserBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: 'vacated' } : b))
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* 1. Live Telemetry Ticker */}
      <LiveTelemetryTicker selectedLocation={selectedLocation} />

      {/* 2. Sticky Cyber Navbar */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onToggleAdmin={() => setShowAdminView((prev) => !prev)}
        showAdminView={showAdminView}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingCount={userBookings.filter((b) => b.status === 'confirmed').length}
        selectedLocation={selectedLocation}
        onOpenLocationModal={() => setIsLocationOpen(true)}
      />

      {/* Main View: Toggle between Admin Terminal and Driver Radar */}
      {showAdminView ? (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">Admin Control Terminal</h2>
              <p className="text-xs text-slate-400">Manage real-time bay allocation, override tariffs, and review system logs</p>
            </div>
            <button
              onClick={() => setShowAdminView(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all border border-slate-700 cursor-pointer"
            >
              &larr; Back to Driver Terminal
            </button>
          </div>
          <AdminPanel />
        </main>
      ) : (
        <main className="flex-1">
          {/* 3. Hero Section with Live Radar HUD */}
          <Hero
            selectedLocation={selectedLocation}
            onOpenLocationModal={() => setIsLocationOpen(true)}
          />

          {/* 4. Interactive Parking Bay Grid & 2D Architectural Radar */}
          <section id="slots-section" className="py-10 bg-[#070b14] border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SlotGrid
                selectedLocation={selectedLocation}
                onOpenLocationModal={() => setIsLocationOpen(true)}
                onOpenBooking={() => setIsBookingOpen(true)}
              />
            </div>
          </section>

          {/* 5. FASTag & ANPR Boom Barrier Gate Simulator */}
          <section className="py-14 bg-[#090e1a] text-white border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <BarrierGateSimulator selectedLocation={selectedLocation} />
            </div>
          </section>

          {/* 6. How It Works Step Progression */}
          <section id="how-it-works" className="py-16 bg-[#070b14]">
            <HowItWorks />
          </section>

          {/* 7. Transparent Tariffs & Pricing */}
          <section id="pricing" className="py-16 bg-[#090e1a] border-t border-slate-800">
            <PricingSection />
          </section>

          {/* 8. IoT & Cloud Features Showcase */}
          <section id="features" className="py-16 bg-[#070b14] border-t border-slate-800">
            <FeaturesSection />
          </section>

          {/* 9. FAQs Section */}
          <section id="faq" className="py-16 bg-[#090e1a] border-t border-slate-800">
            <FaqSection />
          </section>
        </main>
      )}

      {/* 10. Footer with Academic Experiment Mapping */}
      <Footer />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedLocation={selectedLocation}
        onPassCreated={handlePassCreated}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={userBookings}
        onVacate={handleVacateSlot}
      />

      <LocationSearchModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedLocation={selectedLocation}
        onSelectLocation={(loc) => {
          setSelectedLocation(loc);
          setIsLocationOpen(false);
        }}
      />

    </div>
  );
}
