// [Experiment 1] Build responsive and interactive UIs using Tailwind CSS
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        park: {
          available: '#10b981', // emerald-500
          reserved: '#f59e0b',  // amber-500
          occupied: '#ef4444',  // red-500
          brand: '#2563eb'      // blue-600
        }
      }
    },
  },
  plugins: [],
}
