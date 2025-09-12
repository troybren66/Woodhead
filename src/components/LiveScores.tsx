"use client"
import React, { useState, useEffect } from 'react';

const mockTeams = [
  {
    id: '1',
    name: 'Troy\'s Team',
    owner: 'Troy',
    currentScore: 87.2,
    projectedScore: 94.3,
    playersRemaining: 2,
    isLive: true,
    gameStatus: '2:34 left in 4th',
    weeklyPoints: [112.4, 98.6, 134.2]
  },
  {
    id: '2',
    name: 'Mike\'s Squad',
    owner: 'Mike',
    currentScore: 92.7,
    projectedScore: 98.1,
    playersRemaining: 1,
    isLive: true,
    gameStatus: '2:34 left in 4th',
    weeklyPoints: [98.2, 145.7, 87.3]
  },
  {
    id: '3',
    name: 'Dynasty Kings',
    owner: 'Sam',
    currentScore: 156.8,
    projectedScore: 162.4,
    playersRemaining: 0,
    isLive: false,
    gameStatus: 'Final',
    weeklyPoints: [134.5, 89.2, 167.8]
  },
  {
    id: '4',
    name: 'Thunder Bolts',
    owner: 'Alex',
    currentScore: 142.3,
    projectedScore: 145.7,
    playersRemaining: 0,
    isLive: false,
    gameStatus: 'Final',
    weeklyPoints: [98.2, 145.7, 87.3]
  },
  {
    id: '5',
    name: 'Grid Gladiators',
    owner: 'Jordan',
    currentScore: 78.9,
    projectedScore: 85.2,
    playersRemaining: 3,
    isLive: true,
    gameStatus: '1:15 left in 3rd',
    weeklyPoints: [87.6, 156.9, 94.2]
  },
  {
    id: '6',
    name: 'End Zone Elite',
    owner: 'Chris',
    currentScore: 134.6,
    projectedScore: 139.8,
    playersRemaining: 1,
    isLive: true,
    gameStatus: '5:42 left in 4th',
    weeklyPoints: [87.6, 156.9, 94.2]
  }
];

const topScorer = {
  name: 'Christian McCaffrey',
  position: 'RB',
  team: 'SF',
  points: 28.7,
  owner: 'Troy\'s Team'
};

export default function LiveScores() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('live');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const sortedTeams = [...mockTeams].sort((a, b) => b.currentScore - a.currentScore);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white p-4 sm:p-8 rounded-2xl shadow-2xl mb-4 sm:mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 text-4xl sm:text-6xl">🏈</div>
            <div className="absolute bottom-4 left-4 text-2xl sm:text-4xl">⚡</div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 gap-4">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white relative">
                  <span className="flex items-center gap-2">
                    <span className="text-yellow-300 text-xl sm:text-2xl">⚡</span>
                    <span className="bg-gradient-to-r from-white via-yellow-200 to-cyan-300 bg-clip-text text-transparent">
                      Woodhead
                    </span>
                    <span className="text-yellow-300 text-xl sm:text-2xl">⚡</span>
                  </span>
                  <span className="ml-2 text-lg sm:text-2xl font-light text-white/80">League</span>
                </h1>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-right bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 w-full sm:w-auto">
              <div className="text-xl sm:text-3xl font-bold text-yellow-300">Week 3</div>
              <div className="text-indigo-200 text-sm sm:text-base">2025 Season</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('live')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedTab === 'live' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>LIVE</span>
              </div>
              <span>Live Scores</span>
            </button>
            <button
              onClick={() => setSelectedTab('standings')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedTab === 'standings' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>📊</span>
              <span>Standings</span>
            </button>
            <button
              onClick={() => setSelectedTab('topPlayers')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedTab === 'topPlayers' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>⭐</span>
              <span>Top Players</span>
            </button>
          </div>
        </div>

        {/* Live Scores Tab */}
        {selectedTab === 'live' && (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-white">Live Scores</h2>
                </div>
                <div className="text-gray-400 text-sm">
                  {sortedTeams.filter(team => team.isLive).length} games live
                </div>
              </div>
              
              <div className="space-y-3">
                {sortedTeams.map((team, index) => (
                  <div key={team.id} className={`p-3 sm:p-4 rounded-lg border transition-all ${
                    team.isLive 
                      ? 'bg-cyan-900/20 border-cyan-500/30 hover:bg-cyan-900/30' 
                      : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                  }`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                          index === 0 ? 'bg-yellow-400 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-orange-400 text-white' :
                          'bg-gray-600 text-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                            {index === 0 && <span className="text-yellow-400 text-lg sm:text-xl">👑</span>}
                            {team.name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-400">Owner: {team.owner}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
                        <div className="text-right">
                          <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{team.currentScore}</div>
                          <div className="text-xs sm:text-sm text-gray-400">
                            Proj: <span className="text-green-400">{team.projectedScore}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {team.playersRemaining} players left
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {team.isLive ? (
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              <span className="text-red-400 text-xs sm:text-sm font-semibold">LIVE</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs sm:text-sm">Final</span>
                          )}
                          <div className="text-xs text-gray-500 mt-1">{team.gameStatus}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Standings Tab */}
        {selectedTab === 'standings' && (
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">League Standings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Team</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Owner</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">W-L</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Points</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Streak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {(() => {
                    // Create standings data with consistent W-L records
                    const standingsData = mockTeams.map(team => ({
                      ...team,
                      wins: Math.floor(Math.random() * 3),
                      losses: 2 - Math.floor(Math.random() * 3),
                      streak: Math.random() > 0.5 ? `W${Math.floor(Math.random() * 3) + 1}` : `L${Math.floor(Math.random() * 2) + 1}`,
                      totalPoints: team.weeklyPoints.reduce((sum, points) => sum + points, 0)
                    }));
                    
                    // Sort by wins first, then by total points
                    const sortedStandings = standingsData.sort((a, b) => {
                      if (b.wins !== a.wins) return b.wins - a.wins;
                      return b.totalPoints - a.totalPoints;
                    });
                    
                    return sortedStandings.map((team, index) => (
                      <tr key={team.id} className="hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-400 text-white' :
                              index === 1 ? 'bg-gray-400 text-white' :
                              index === 2 ? 'bg-orange-400 text-white' :
                              'bg-gray-600 text-gray-300'
                            }`}>
                              {index + 1}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{team.name}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{team.owner}</td>
                        <td className="px-6 py-4 text-center text-gray-300">{team.wins}-{team.losses}</td>
                        <td className="px-6 py-4 text-center font-bold text-cyan-400 text-lg">
                          {team.totalPoints.toFixed(1)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            team.streak.startsWith('W') 
                              ? 'bg-green-900/30 text-green-300 border border-green-500/30' 
                              : 'bg-red-900/30 text-red-300 border border-red-500/30'
                          }`}>
                            {team.streak}
                          </span>
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Top Players Tab */}
        {selectedTab === 'topPlayers' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Top Points Scorer</h2>
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-6 border border-yellow-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-yellow-300">{topScorer.name}</div>
                    <div className="text-gray-300">{topScorer.position} • {topScorer.team}</div>
                    <div className="text-sm text-gray-400">Owned by: {topScorer.owner}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-yellow-400">{topScorer.points}</div>
                    <div className="text-sm text-gray-300">points</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Weekly Leaders</h2>
              <div className="space-y-3">
                {[
                  { name: 'Josh Allen', position: 'QB', team: 'BUF', points: 28.7, owner: 'Troy\'s Team' },
                  { name: 'Christian McCaffrey', position: 'RB', team: 'SF', points: 26.4, owner: 'Mike\'s Squad' },
                  { name: 'Cooper Kupp', position: 'WR', team: 'LAR', points: 24.8, owner: 'Dynasty Kings' },
                  { name: 'Travis Kelce', position: 'TE', team: 'KC', points: 22.1, owner: 'Thunder Bolts' },
                  { name: 'Austin Ekeler', position: 'RB', team: 'LAC', points: 20.9, owner: 'Grid Gladiators' }
                ].map((player, index) => (
                  <div key={player.name} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-400 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-400 text-white' :
                        'bg-gray-600 text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{player.name}</div>
                        <div className="text-sm text-gray-400">{player.position} • {player.team}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-bold text-lg">{player.points}</div>
                      <div className="text-xs text-gray-500">{player.owner}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
} 