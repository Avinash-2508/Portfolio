import React from 'react'
// ...existing code for EducationPopup...
const EducationPopup = ({ open, onClick, isDark, onClose }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[99] flex items-end justify-center pointer-events-none">
      <div className="mb-16 pointer-events-auto">
        <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border-2 ${isDark ? 'bg-gray-900 border-orange-500 text-white' : 'bg-white border-orange-500 text-gray-900'} animate-bounce`}>
          <span className="text-2xl cursor-pointer" onClick={onClick}>🎓</span>
          <span className="font-semibold cursor-pointer" onClick={onClick}>Want to see education details? <span className="ml-2 text-orange-500 underline">Click me</span></span>
          <button className="ml-2 text-lg text-orange-500 cursor-pointer hover:text-orange-600" onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close popup">×</button>
        </div>
      </div>
    </div>
  )
}
export default EducationPopup
