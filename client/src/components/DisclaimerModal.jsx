import React from 'react'
// ...existing code for DisclaimerModal...
const DisclaimerModal = ({ open, onClose, isDark }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className={`max-w-sm w-full mx-4 rounded-2xl shadow-2xl p-8 text-center ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="mb-4 text-4xl">⚠️</div>
        <h2 className="mb-2 text-2xl font-bold text-orange-500">Best Viewed on Laptop/Desktop</h2>
        <p className="mb-6 text-base opacity-80">
          For the best experience, please open this portfolio on a laptop or desktop device. Some features and animations may not work optimally on mobile.
        </p>
        <button
          className="px-6 py-2 font-medium text-white transition-colors bg-orange-600 rounded-lg hover:bg-orange-500"
          onClick={onClose}
        >
          Continue Anyway
        </button>
      </div>
    </div>
  )
}
export default DisclaimerModal
