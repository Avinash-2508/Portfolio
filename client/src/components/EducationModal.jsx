import React from 'react'
const educationData = [
    {
        degree: 'B.Tech Computer Science',
        institution: 'SRM University',
        year: '2024 - 2028',
        grade: '9.2 CGPA (Current)',
        details: 'Major in Computer Science and Engineering. Coursework in Data Structures, Algorithms, Web Development, Cybersecurity.'
    },
    {
        degree: 'Intermediate (MPC)',
        institution: 'FIIJEE Junior College',
        year: '2022 - 2024',
        grade: '92.5%',
        details: 'Maths, Physics, Chemistry. Focused on problem-solving and competitive exams.'
    },
    {
        degree: 'SSC',
        institution: 'Dr.kkr Gowtham Concept School',
        year: '2021 - 2022',
        grade: '9.2 GPA',
        details: 'General studies with emphasis on science and mathematics.'
    }
]

const EducationModal = ({ open, onClose, isDark }) => {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className={`relative w-full max-w-lg mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 overflow-y-auto max-h-[90vh] transition-all duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <button
                    className="absolute text-2xl text-orange-500 top-4 right-4 hover:text-orange-600 focus:outline-none"
                    onClick={onClose}
                    aria-label="Close education modal"
                >
                    ×
                </button>
                <h2 className="mb-6 text-3xl font-bold text-center text-orange-500">Education Details</h2>
                <div className="relative flex flex-col gap-8 pl-12">

                    {educationData.map((edu, idx) => (
                        <div key={idx} className="relative flex items-center">
                            {/* Dot aligned with institution */}
                            <div className="absolute mt-1 -translate-x-1/2 left-4">
                                <div className="w-5 h-5 bg-orange-500 border-4 border-white rounded-full dark:border-gray-900" />
                            </div>

                            {/* Content */}
                            <div className="ml-12">
                                <div className="text-lg font-semibold">{edu.degree}</div>
                                <div className="text-sm font-medium text-orange-500">{edu.institution}</div>
                                <div className="mb-1 text-xs opacity-70">{edu.year} | {edu.grade}</div>
                                <div className="text-sm opacity-80">{edu.details}</div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default EducationModal
