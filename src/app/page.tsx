"use client"
import React, { useState } from 'react';
import RosterLineup from '@/components/RosterLineup';
import Standings from '@/components/src/components/Standings';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('roster');

  return (
    <div>
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('roster')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 'roster' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Roster Builder
            </button>
            <button
              onClick={() => setCurrentPage('standings')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 'standings' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              League Standings
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {currentPage === 'roster' && <RosterLineup />}
      {currentPage === 'standings' && <Standings />}
    </div>
  );
}