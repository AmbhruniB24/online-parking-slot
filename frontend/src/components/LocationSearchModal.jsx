// [Experiment 1] Searchable Location Modal with Nationwide Coverage (All Major Indian Cities & Hubs)
import React, { useState } from 'react';
import { POPULAR_LOCATIONS, ALL_INDIAN_CITIES, resolveLocationQuery } from '../data/locations';
import { X, Search, MapPin, Building2, Navigation, Check, Plus, Radio, Globe, ChevronRight } from 'lucide-react';

export default function LocationSearchModal({ isOpen, onClose, selectedLocation, onSelectLocation }) {
  const [query, setQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  if (!isOpen) return null;

  const regions = [
    { id: 'All', label: 'All Cities' },
    { id: 'Maharashtra', label: 'Maharashtra / Mumbai' },
    { id: 'Delhi NCR', label: 'Delhi NCR' },
    { id: 'Karnataka', label: 'Bengaluru / Karnataka' },
    { id: 'Telangana', label: 'Hyderabad' },
    { id: 'Tamil Nadu', label: 'Chennai / Coimbatore' },
    { id: 'Gujarat', label: 'Ahmedabad / Surat' },
    { id: 'Rajasthan', label: 'Jaipur' },
    { id: 'Uttar Pradesh', label: 'Lucknow / Noida' },
    { id: 'West Bengal', label: 'Kolkata' },
    { id: 'Kerala', label: 'Kochi' },
    { id: 'Madhya Pradesh', label: 'Indore / Bhopal' }
  ];

  // Resolve matching locations using the universal engine
  let displayedLocations = resolveLocationQuery(query);

  if (selectedRegion !== 'All' && !query.trim()) {
    displayedLocations = displayedLocations.filter((loc) =>
      loc.state?.toLowerCase().includes(selectedRegion.toLowerCase()) ||
      loc.city?.toLowerCase().includes(selectedRegion.toLowerCase())
    );
  }

  const handleSelect = (location) => {
    onSelectLocation(location);
    onClose();
  };

  const handleCustomLocation = () => {
    if (!query.trim()) return;
    const resolved = resolveLocationQuery(query);
    if (resolved && resolved.length > 0) {
      handleSelect(resolved[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-300" />
              <h3 className="text-xl font-black">Pan-India Parking Network</h3>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">50+ Cities Live</span>
            </div>
            <p className="text-xs text-blue-100 mt-0.5">
              Search any city, mall, airport, station, or street in India
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-100 space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 text-blue-600 absolute left-4 top-3.5" />
            <input
              type="text"
              autoFocus
              placeholder="Type ANY city or place (e.g. Pune, Jaipur, Lucknow, Surat, Kochi, Kanpur, Patna)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCustomLocation()}
              className="w-full pl-12 pr-28 py-3.5 text-sm font-semibold rounded-2xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs"
            />
            {query.trim() && (
              <button
                type="button"
                onClick={handleCustomLocation}
                className="absolute right-2 top-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            )}
          </div>

          {/* Region / State Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
              Region:
            </span>
            {regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => { setSelectedRegion(reg.id); setQuery(''); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRegion === reg.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Quick City Chips Grid */}
          {!query && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mr-1 self-center">Popular:</span>
              {ALL_INDIAN_CITIES.slice(0, 14).map((c) => (
                <button
                  key={c}
                  onClick={() => setQuery(c)}
                  className="px-2.5 py-0.5 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 text-[11px] font-semibold text-slate-700 transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Location Suggestions List */}
        <div className="p-5 sm:p-6 max-h-[52vh] overflow-y-auto space-y-3">
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1 pb-1">
            <span>AVAILABLE SMART PARKING DECKS ({displayedLocations.length})</span>
            <span>LIVE TELEMETRY</span>
          </div>

          {displayedLocations.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            const occupancyPct = Math.round(((loc.totalBays - loc.availableBays) / loc.totalBays) * 100);
            const isHighDemand = loc.availableBays <= 5;

            return (
              <div
                key={loc.id}
                onClick={() => handleSelect(loc)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-sm font-extrabold text-slate-900">{loc.name}</span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                        {loc.city}
                      </span>
                      {loc.state && (
                        <span className="text-[10px] text-slate-400 font-medium">({loc.state})</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center">
                      <MapPin className="w-3 h-3 mr-1 text-slate-400 flex-shrink-0" />
                      <span>{loc.address}</span>
                    </p>
                    
                    {/* Live Availability Telemetry Pill */}
                    <div className="flex flex-wrap items-center gap-2 text-xs mt-1.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold text-[11px] ${
                        isHighDemand
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        <Radio className="w-3 h-3 mr-1 animate-pulse" />
                        {loc.availableBays} of {loc.totalBays} Bays Free ({occupancyPct}% Full)
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-semibold">{loc.distance}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-semibold">{loc.priceRange}</span>
                    </div>
                  </div>
                </div>

                {isSelected ? (
                  <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 ml-3 shadow-sm">
                    <Check className="w-4 h-4" />
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 ml-2" />
                )}
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}
