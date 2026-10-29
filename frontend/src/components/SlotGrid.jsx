// [Experiment 1 & 8] Executive Cyber-Terminal Parking Bay Terminal with Live WebSocket Synchronization
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSlot } from '../redux/bookingSlice';
import { useSocket } from '../hooks/useSocket';
import SlotCard from './SlotCard';
import ParkingGarageMap from './ParkingGarageMap';
import api from '../services/api';
import { generateLocationSlots, DEFAULT_LOCATION } from '../data/locations';
import {
  MapPin, RefreshCw, Layers, Filter, CheckCircle2,
  Building2, ChevronRight, Zap, Car, Compass, LayoutGrid
} from 'lucide-react';

export default function SlotGrid({ selectedLocation = DEFAULT_LOCATION, onOpenLocationModal, onOpenBooking }) {
  const dispatch = useDispatch();
  const selectedSlot = useSelector((state) => state.booking.selectedSlot);

  const [slots, setSlots] = useState(() => generateLocationSlots(selectedLocation));
  const [loading, setLoading] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'blueprint'

  useEffect(() => {
    setSlots(generateLocationSlots(selectedLocation));
    setSelectedFloor(1);
    fetchSlots();
  }, [selectedLocation]);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/slots?locationId=${selectedLocation.id}`);
      if (res.data?.data?.length > 0) {
        setSlots(res.data.data);
      }
    } catch {
      // Local fallback
    } finally {
      setLoading(false);
    }
  };

  // Sync with persistent bookings in localStorage for this facility
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(`smartpark_booked_${selectedLocation.id}`) || '[]');
      if (stored.length > 0) {
        setSlots((prev) =>
          prev.map((s) => (stored.includes(s.slotNumber) || stored.includes(s._id) ? { ...s, status: 'occupied' } : s))
        );
      }
    } catch {
      // ignore
    }
  }, [selectedLocation]);

  // Real-time WebSocket synchronization (Experiment 8)
  useSocket(
    ({ slotId, clientSlotId, slotNumber, status }) => {
      setSlots((prev) =>
        prev.map((s) =>
          s._id === slotId || s._id === clientSlotId || (slotNumber && s.slotNumber === slotNumber)
            ? { ...s, status: status || 'occupied' }
            : s
        )
      );
    },
    (newSlot) => { if (newSlot.locationId === selectedLocation.id) setSlots((prev) => [...prev, newSlot]); },
    ({ slotId }) => setSlots((prev) => prev.filter((s) => s._id !== slotId))
  );

  useEffect(() => {
    const handleLocalBooking = (e) => {
      const { slotId, slotNumber, status } = e.detail || {};
      setSlots((prev) =>
        prev.map((s) =>
          s._id === slotId || (slotNumber && s.slotNumber === slotNumber)
            ? { ...s, status: status || 'occupied' }
            : s
        )
      );
    };

    window.addEventListener('smartpark_slot_booked', handleLocalBooking);
    return () => window.removeEventListener('smartpark_slot_booked', handleLocalBooking);
  }, []);

  const handleSlotSelect = (slot) => {
    dispatch(selectSlot({
      ...slot,
      locationName: selectedLocation.name,
      locationAddress: selectedLocation.address
    }));
    onOpenBooking?.();
  };

  const availableFloors = selectedLocation.floors || [1, 2];
  const floorSlots = slots.filter((s) => s.floor === selectedFloor);
  const filteredSlots = floorSlots.filter((s) => selectedType === 'all' || s.type === selectedType);

  const totalFacilityBays = slots.length;
  const availableFacilityBays = slots.filter((s) => s.status === 'available').length;
  const evBaysCount = slots.filter((s) => s.type === 'EV' && s.status === 'available').length;
  const occupancyPercentage = Math.round(((totalFacilityBays - availableFacilityBays) / (totalFacilityBays || 1)) * 100);

  const rowA = filteredSlots.slice(0, Math.ceil(filteredSlots.length / 2));
  const rowB = filteredSlots.slice(Math.ceil(filteredSlots.length / 2));

  return (
    <section id="slots-section" className="py-8 space-y-6">
      
      {/* 1. Facility Header Bar (Obsidian Glassmorphism) */}
      <div className="bg-[#0b1220] p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start space-x-4 z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-950 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-800 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Active Facility Node</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-bold text-slate-400">{selectedLocation.distance || '0.8 km away'}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                <span>● 24/7 Automated Access</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {selectedLocation.name}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1.5 text-blue-400 shrink-0" />
              <span>{selectedLocation.address}</span>
            </p>
          </div>
        </div>

        {/* Live Capacity Gauge & Change Location */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 z-10">
          
          <div className="p-4 rounded-2xl bg-[#080d19] border border-slate-800 min-w-[220px] space-y-2">
            <div className="flex justify-between text-xs font-black">
              <span className="text-slate-400 uppercase tracking-wider">Live Occupancy</span>
              <span className={occupancyPercentage > 75 ? 'text-rose-400' : 'text-emerald-400'}>
                {occupancyPercentage}%
              </span>
            </div>
            
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  occupancyPercentage > 75
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                    : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                }`}
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400">
              <span className="text-emerald-400">{availableFacilityBays} Free Bays</span>
              <span className="text-amber-400">⚡ {evBaysCount} EV Stations</span>
            </div>
          </div>

          <button
            onClick={onOpenLocationModal}
            className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <MapPin className="w-4 h-4" />
            <span>Select City Hub</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* 2. Controls Bar: Deck Levels, Filters & View Mode */}
      <div className="bg-[#0b1220] p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Floor Level Tabs */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Layers className="w-4 h-4 text-cyan-400 mr-1 shrink-0" />
          {availableFloors.map((floor) => {
            const count = slots.filter((s) => s.floor === floor && s.status === 'available').length;
            return (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer ${
                  selectedFloor === floor
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400'
                    : 'bg-[#111a2e] text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>Deck Level {floor}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  selectedFloor === floor ? 'bg-white/20 text-white' : 'bg-slate-800 text-emerald-400'
                }`}>
                  {count} Free
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode & Vehicle Filter Buttons */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 justify-between md:justify-end">
          
          {/* View Mode Toggle */}
          <div className="flex bg-[#080d19] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                viewMode === 'cards' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Bay Cards Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode('blueprint')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                viewMode === 'blueprint' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Architectural Radar View"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Radar</span>
            </button>
          </div>

          <div className="w-px h-6 bg-slate-800" />

          {/* Vehicle Filters */}
          {[
            { id: 'all', label: 'All' },
            { id: '4-wheeler', label: 'Cars' },
            { id: '2-wheeler', label: 'Bikes' },
            { id: 'EV', label: '⚡ EV' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                selectedType === t.id
                  ? 'bg-slate-100 text-slate-950 shadow-md font-black'
                  : 'bg-[#111a2e] text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}

          <button
            onClick={fetchSlots}
            title="Refresh Slot Radar"
            className="p-2 rounded-xl bg-[#111a2e] hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

      </div>

      {/* 3. Main View Switcher: Cards Grid vs Architectural Radar Blueprint */}
      {viewMode === 'blueprint' ? (
        <ParkingGarageMap
          slots={floorSlots}
          selectedSlot={selectedSlot}
          onSelectSlot={handleSlotSelect}
          floor={selectedFloor}
        />
      ) : (
        <div className="bg-[#080d19] p-6 sm:p-8 rounded-3xl border border-slate-800/90 shadow-2xl space-y-6">
          
          {/* North Wing (Aisle 1) */}
          <div>
            <div className="flex items-center justify-between text-xs font-black text-cyan-400 uppercase tracking-widest px-1 mb-3">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>North Wing &bull; Bay Aisle 1</span>
              </span>
              <span className="text-slate-500 font-mono">Deck Level {selectedFloor}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
              {rowA.map((slot) => (
                <SlotCard
                  key={slot._id}
                  slot={slot}
                  isSelected={selectedSlot?._id === slot._id}
                  onSelect={handleSlotSelect}
                />
              ))}
            </div>
          </div>

          {/* Central Driving Lane Simulation */}
          <div className="py-3 px-5 rounded-2xl bg-[#0c1424] border border-slate-800/90 flex items-center justify-between text-xs font-mono font-bold text-slate-400 shadow-inner">
            <div className="flex items-center space-x-3 text-cyan-300">
              <Car className="w-4 h-4 animate-bounce" />
              <span>&larr; ENTRY LANE &bull; ONE-WAY TRAFFIC FLOW (SPEED LIMIT 10 KM/H) &rarr;</span>
            </div>
            <div className="text-slate-500 hidden sm:block">
              <span>ULTRASONIC IOT SENSORS ACTIVE</span>
            </div>
          </div>

          {/* South Wing (Aisle 2) */}
          <div>
            <div className="flex items-center justify-between text-xs font-black text-emerald-400 uppercase tracking-widest px-1 mb-3">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>South Wing &bull; Bay Aisle 2</span>
              </span>
              <span className="text-slate-500 font-mono">Deck Level {selectedFloor}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
              {rowB.map((slot) => (
                <SlotCard
                  key={slot._id}
                  slot={slot}
                  isSelected={selectedSlot?._id === slot._id}
                  onSelect={handleSlotSelect}
                />
              ))}
            </div>
          </div>

        </div>
      )}

    </section>
  );
}
