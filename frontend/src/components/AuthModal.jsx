// [Experiment 6] JWT Authentication & Role Selection Modal (Dark Cyber-Executive Theme)
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'driver'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(formData.name, formData.email, formData.password, formData.role);
      } else {
        await login(formData.email, formData.password);
      }
      onClose();
    } catch (err) {
      // Local fallback for smooth testing if backend is in startup
      if (formData.email === 'admin@smartpark.com' && formData.password === 'admin123') {
        const dummyAdmin = { id: 'admin1', name: 'Admin Manager', email: 'admin@smartpark.com', role: 'admin' };
        localStorage.setItem('smartpark_token', 'demo_admin_jwt_token_2026');
        window.location.reload();
        return;
      }
      if (formData.email === 'driver@smartpark.com' && formData.password === 'driver123') {
        const dummyDriver = { id: 'driver1', name: 'Rahul Sharma', email: 'driver@smartpark.com', role: 'driver' };
        localStorage.setItem('smartpark_token', 'demo_driver_jwt_token_2026');
        window.location.reload();
        return;
      }

      setError(err.response?.data?.message || err.message || 'Authentication failed. Check your email & password.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    if (role === 'admin') {
      setFormData({ name: 'Admin Manager', email: 'admin@smartpark.com', password: 'admin123', role: 'admin' });
    } else {
      setFormData({ name: 'Rahul Sharma', email: 'driver@smartpark.com', password: 'driver123', role: 'driver' });
    }
    setIsRegister(false);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#0c1322] rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.25)] max-w-md w-full overflow-hidden border border-slate-700/80 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">{isRegister ? 'Create Account' : 'Terminal Sign In'}</h3>
              <p className="text-xs text-slate-400 mt-0.5">JWT Role-Based Security (Exp 6)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-700 bg-[#111a2e] text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="driver@smartpark.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-700 bg-[#111a2e] text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-700 bg-[#111a2e] text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  Account Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-700 bg-[#111a2e] text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
                >
                  <option value="driver" className="bg-slate-900">Driver (Book & Reserve Bays)</option>
                  <option value="admin" className="bg-slate-900">Admin (Manage Parking Bays)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black rounded-xl shadow-lg shadow-blue-500/30 transition-all text-xs uppercase tracking-wider disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Authenticating...' : isRegister ? 'Register Account' : 'Sign In'}
            </button>
          </form>

          {/* Quick Demo Autofill */}
          <div className="pt-3 border-t border-slate-800">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center mb-2">
              Instant 1-Click Demo Credentials
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemo('driver')}
                className="py-2 px-3 bg-[#111a2e] hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 transition-colors cursor-pointer"
              >
                🚗 Demo Driver
              </button>
              <button
                type="button"
                onClick={() => fillDemo('admin')}
                className="py-2 px-3 bg-[#111a2e] hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-cyan-300 transition-colors cursor-pointer"
              >
                🛡️ Demo Admin
              </button>
            </div>
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create Driver Account"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
