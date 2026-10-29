// [Experiment 1, 4, 8] Active Passes & Parking History Modal with Instant Slot Vacation
import React from 'react';
import { X, QrCode, Clock, Car, MapPin, CheckCircle, Trash2, ArrowRight, Mail, Printer } from 'lucide-react';

export default function MyBookingsModal({ isOpen, onClose, bookings = [], onVacate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#0c1322] rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.25)] max-w-2xl w-full overflow-hidden border border-slate-700/80 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white">My Digital Parking Passes</h3>
            <p className="text-xs text-slate-400 mt-0.5">Manage active reservations and digital QR entry barcodes</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          {bookings.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-blue-600/20 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto border border-cyan-500/30">
                <Car className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">No Active Parking Passes Found</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Choose an available green bay on the parking radar to book your slot.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
              >
                Browse Parking Radar
              </button>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b._id}
                className="p-5 rounded-2xl border border-slate-800 bg-[#111a2e] hover:border-cyan-500/40 hover:shadow-lg transition-all space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-black bg-cyan-950 text-cyan-300 border border-cyan-800 px-2.5 py-1 rounded-lg">
                      {b.ticketCode || 'SP-PASS'}
                    </span>
                    <span className="text-xs font-bold text-white">{b.locationName || 'SmartPark Central Facility'}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                    b.status === 'confirmed'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {b.status || 'ACTIVE'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Bay Number</span>
                    <span className="font-black text-white text-base">Slot {b.slotNumber || b.slotId?.slotNumber || 'Bay'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Vehicle Reg</span>
                    <span className="font-mono font-bold text-white">{b.vehicleNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
                    <span className="font-bold text-white">{b.durationHours || 1} Hour(s)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Tariff Paid</span>
                    <span className="font-black text-emerald-400">₹{b.totalAmount}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-mono flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Pass sent to: {b.email || 'customer@gmail.com'}</span>
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center space-x-1 transition-colors cursor-pointer"
                      title="Print Pass Voucher"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Pass</span>
                    </button>

                    {onVacate && b.status === 'confirmed' && (
                      <button
                        onClick={() => onVacate(b._id, b.slotNumber)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-950/60 text-rose-300 border border-rose-800 hover:bg-rose-900 transition-colors cursor-pointer"
                      >
                        Vacate Bay & Release
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
