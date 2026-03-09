"use client"
import React, { useState } from 'react'
import All from './lawtype/all'
import Attorney from './lawtype/attorney'

const LawyersTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all group">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform">
          <span className="text-2xl">⚖️</span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">Expert Lawyer {i}</h3>
        <p className="text-gray-600 leading-relaxed mb-6">High-level legal consultation for individual and corporate clients across multiple jurisdictions.</p>
        <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
          <span className="text-blue-600 font-semibold">10+ Years Exp</span>
          <button className="text-gray-400 hover:text-blue-600 transition-colors">View Profile →</button>
        </div>
      </div>
    ))}
  </div>
)

const CaseTypesTab = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {['Corporate', 'Criminal', 'Family', 'Real Estate', 'Tax Law', 'IP Rights', 'Labor', 'Medical'].map((type) => (
      <div key={type} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:border-blue-500 transition-all cursor-pointer group text-center">
        <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform">📁</div>
        <h3 className="font-bold text-gray-800">{type}</h3>
      </div>
    ))}
  </div>
)

const Laws = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'attorney' | 'lawyers' | 'cases'>('all');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'attorney', label: 'Attorney' },
    { id: 'lawyers', label: 'Lawyers' },
    { id: 'cases', label: 'Case Types' },
  ] as const;

  return (
    <div className="relative py-24 overflow-hidden bg-slate-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="px-4 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
            Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Connect with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Right Legal Expert</span>
          </h2>
          <p className="text-gray-600 max-w-2xl text-lg mt-2">
            Browse through our network of specialized attorneys and legal professionals perfectly matched for your specific case requirements.
          </p>

          <nav className="flex flex-wrap justify-center gap-3 mt-8 p-1.5 bg-gray-100 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-600/20'
                    : 'text-gray-500 hover:text-blue-600 hover:bg-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-12 min-h-[400px]">
          {activeTab === 'all' && <All />}
          {activeTab === 'attorney' && <Attorney />}
          {activeTab === 'lawyers' && <LawyersTab />}
          {activeTab === 'cases' && <CaseTypesTab />}
        </div>
      </div>
    </div>
  )
}

export default Laws
