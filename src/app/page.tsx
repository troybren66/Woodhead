"use client"
import React, { useState } from 'react';
import RosterLineup from '@/components/RosterLineup';
import Standings from '@/components/src/components/Standings';
import LiveScores from '@/components/LiveScores';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('live');

  return (
    <div>
      {/* Navigation */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('live')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 'live' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Live Scores
            </button>
            <button
              onClick={() => setCurrentPage('roster')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 'roster' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Roster 
            </button>
            <button
              onClick={() => setCurrentPage('standings')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 'standings' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              League Standings
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {currentPage === 'live' && <LiveScores />}
      {currentPage === 'roster' && <RosterLineup />}
      {currentPage === 'standings' && <Standings />}
    </div>
  );
}