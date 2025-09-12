"use client"
import React, { useState } from 'react';
import RosterLineup from '@/components/RosterLineup';
import Standings from '@/components/src/components/Standings';
import LiveScores from '@/components/LiveScores';
import LeagueChat from '@/components/LeagueChat';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('lineup');

  return (
    <div>
      {/* Navigation */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button
              onClick={() => setCurrentPage('lineup')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 min-h-[44px] ${
                currentPage === 'lineup'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Roster Lineup
            </button>
            <button
              onClick={() => setCurrentPage('live')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 min-h-[44px] ${
                currentPage === 'live'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Live Scores
            </button>
            <button
              onClick={() => setCurrentPage('standings')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 min-h-[44px] ${
                currentPage === 'standings'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Standings
            </button>
            <button
              onClick={() => setCurrentPage('chat')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 min-h-[44px] ${
                currentPage === 'chat'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              League Chat
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {currentPage === 'lineup' && <RosterLineup />}
        {currentPage === 'live' && <LiveScores />}
        {currentPage === 'standings' && <Standings />}
        {currentPage === 'chat' && (
          <div className="p-4 sm:p-8">
            <LeagueChat />
          </div>
        )}
      </div>
    </div>
  );
}