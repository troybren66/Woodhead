"use client"
import React, { useState } from 'react';

const mockTeams = [
  {
    id: '1',
    name: 'Team Alpha',
    owner: 'Troy',
    weeklyPoints: [112.4, 98.6, 134.2, 89.7, 127.3, 156.1, 91.8, 143.9, 108.2, 125.7, 159.9, 142.3, 167.8, 134.5, 189.2, 201.4, 178.6],
    usedPlayers: [
      { id: '1', name: 'Josh Allen', position: 'QB', weekUsed: 1, points: 24.5 },
      { id: '4', name: 'Christian McCaffrey', position: 'RB', weekUsed: 1, points: 20.8 },
      { id: '8', name: 'Cooper Kupp', position: 'WR', weekUsed: 1, points: 18.9 },
      { id: '12', name: 'Travis Kelce', position: 'TE', weekUsed: 1, points: 16.2 },
      { id: '5', name: 'Austin Ekeler', position: 'RB', weekUsed: 1, points: 18.5 }
    ]
  },
  {
    id: '2',
    name: 'Thunder Bolts',
    owner: 'Alex',
    weeklyPoints: [98.2, 145.7, 87.3, 132.6, 109.8, 142.1, 95.4, 167.2, 124.5, 95.6, 134.7, 156.9, 178.4, 145.2, 198.7, 167.3, 189.1],
    usedPlayers: [
      { id: '3', name: 'Patrick Mahomes', position: 'QB', weekUsed: 1, points: 23.2 },
      { id: '6', name: 'Derrick Henry', position: 'RB', weekUsed: 1, points: 17.2 }
    ]
  },
  {
    id: '3',
    name: 'Grid Gladiators',
    owner: 'Sam',
    weeklyPoints: [134.5, 89.2, 167.8, 92.1, 145.6, 87.4, 156.3, 98.7, 142.8, 142.5, 167.9, 134.2, 145.6, 178.9, 156.4, 189.7, 167.2],
    usedPlayers: []
  },
  {
    id: '4',
    name: 'End Zone Elite',
    owner: 'Jordan',
    weeklyPoints: [87.6, 156.9, 94.2, 142.7, 89.5, 167.1, 92.8, 134.6, 87.4, 136.5, 145.8, 123.4, 189.2, 156.7, 134.9, 178.3, 145.6],
    usedPlayers: []
  }
];

const currentWeek = 3;
const regularSeasonWeeks = 17;
const playoffWeeks = [18, 19, 20];
const isPlayoffs = currentWeek > regularSeasonWeeks;

const rounds = {
  round1: { weeks: [1, 2, 3, 4, 5], name: 'Round 1' },
  round2: { weeks: [6, 7, 8, 9], name: 'Round 2' },
  round3: { weeks: [10, 11, 12, 13], name: 'Round 3' },
  round4: { weeks: [14, 15, 16, 17], name: 'Round 4' },
  playoff1: { weeks: [18], name: 'Playoff 1' },
  playoff2: { weeks: [19], name: 'Playoff 2' },
  playoff3: { weeks: [20], name: 'Playoff 3' }
};

function calculateRoundPoints(weeklyPoints: number[], roundWeeks: number[], multiplier: number = 1): number {
    return roundWeeks.reduce((total, week) => {
      const weekIndex = week - 1;
      return total + (weeklyPoints[weekIndex] || 0) * multiplier;
    }, 0);
  }
  
  function calculateSeasonTotal(weeklyPoints: number[]): number {
    const regularSeasonTotal = weeklyPoints.slice(0, regularSeasonWeeks).reduce((sum, points) => sum + points, 0);
    const playoffTotal = weeklyPoints.slice(regularSeasonWeeks).reduce((sum, points) => sum + (points * 1.5), 0);
    return regularSeasonTotal + playoffTotal;
  }
  
  function getPositionColor(position: string): string {
    const colors: Record<string, string> = {
      QB: 'bg-red-900/30 text-red-300 border-red-500/30',
      RB: 'bg-green-900/30 text-green-300 border-green-500/30',
      WR: 'bg-blue-900/30 text-blue-300 border-blue-500/30',
      TE: 'bg-yellow-900/30 text-yellow-300 border-yellow-500/30'
    };
    return colors[position] || 'bg-gray-900/30 text-gray-300 border-gray-500/30';
  }
  
  export default function LeagueStandings() {
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<string>('overall');
    const [selectedWeek, setSelectedWeek] = useState<number>(currentWeek);
  
    const getTeamStandings = (standingsType: string) => {
    return mockTeams.map(team => {
      let points = 0;
      
      switch(standingsType) {
        case 'overall':
          points = calculateSeasonTotal(team.weeklyPoints);
          break;
        case 'season':
          points = team.weeklyPoints.slice(0, regularSeasonWeeks).reduce((sum, pts) => sum + pts, 0);
          break;
        case 'week':
          points = team.weeklyPoints[selectedWeek - 1] || 0;
          break;
        case 'round1':
          points = calculateRoundPoints(team.weeklyPoints, rounds.round1.weeks);
          break;
        case 'round2':
          points = calculateRoundPoints(team.weeklyPoints, rounds.round2.weeks);
          break;
        case 'round3':
          points = calculateRoundPoints(team.weeklyPoints, rounds.round3.weeks);
          break;
        case 'round4':
          points = calculateRoundPoints(team.weeklyPoints, rounds.round4.weeks);
          break;
        case 'playoff1':
          points = calculateRoundPoints(team.weeklyPoints, rounds.playoff1.weeks, 1.5);
          break;
        case 'playoff2':
          points = calculateRoundPoints(team.weeklyPoints, rounds.playoff2.weeks, 1.5);
          break;
        case 'playoff3':
          points = calculateRoundPoints(team.weeklyPoints, rounds.playoff3.weeks, 1.5);
          break;
        case 'playoffsTotal':
          points = calculateRoundPoints(team.weeklyPoints, rounds.playoff1.weeks, 1.5) +
                  calculateRoundPoints(team.weeklyPoints, rounds.playoff2.weeks, 1.5) +
                  calculateRoundPoints(team.weeklyPoints, rounds.playoff3.weeks, 1.5);
          break;
        default:
          points = calculateSeasonTotal(team.weeklyPoints);
      }
      
      return { ...team, points };
    }).sort((a, b) => b.points - a.points);
  };

  const standings = getTeamStandings(viewMode === 'week' ? 'week' : viewMode);

  const getStandingsTitle = () => {
    switch(viewMode) {
      case 'overall': return 'Overall Standings';
      case 'season': return 'Regular Season Standings';
      case 'week': return `Week ${selectedWeek} Standings`;
      case 'round1': return 'Round 1 Standings (Weeks 1-5)';
      case 'round2': return 'Round 2 Standings (Weeks 6-9)';
      case 'round3': return 'Round 3 Standings (Weeks 10-13)';
      case 'round4': return 'Round 4 Standings (Weeks 14-17)';
      case 'playoff1': return 'Playoff 1 Standings (Week 18)';
      case 'playoff2': return 'Playoff 2 Standings (Week 19)';
      case 'playoff3': return 'Playoff 3 Standings (Week 20)';
      case 'playoffsTotal': return 'Total Playoffs Standings';
      case 'usedPlayers': return 'Used Players Tracker';
      default: return 'Standings';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl"></div>
              <div className="absolute bottom-4 left-4 text-4xl">📊</div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                  League Standings
                </h1>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center gap-4 text-lg">
                <span className="text-indigo-200">Week {currentWeek} of {regularSeasonWeeks}</span>
                {isPlayoffs && (
                  <span className="bg-orange-900/30 text-orange-300 px-3 py-1 rounded-full font-semibold border border-orange-500/30">
                    PLAYOFFS - 1.5x Points
                  </span>
                )}
                {!isPlayoffs && (
                  <span className="bg-green-900/30 text-green-300 px-3 py-1 rounded-full font-semibold border border-green-500/30">
                    Regular Season
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setViewMode('overall')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'overall' ? 'bg-cyan-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Overall
            </button>
            <button
              onClick={() => setViewMode('season')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'season' ? 'bg-cyan-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Season
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'week' ? 'bg-cyan-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('round1')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'round1' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Round 1
            </button>
            <button
              onClick={() => setViewMode('round2')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'round2' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Round 2
            </button>
            <button
              onClick={() => setViewMode('round3')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'round3' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Round 3
            </button>
            <button
              onClick={() => setViewMode('round4')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'round4' ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Round 4
            </button>
            <button
              onClick={() => setViewMode('playoff1')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'playoff1' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Playoff 1
            </button>
            <button
              onClick={() => setViewMode('playoff2')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'playoff2' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Playoff 2
            </button>
            <button
              onClick={() => setViewMode('playoff3')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'playoff3' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Playoff 3
            </button>
            <button
              onClick={() => setViewMode('playoffsTotal')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'playoffsTotal' ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Total Playoffs
            </button>
            <button
              onClick={() => setViewMode('usedPlayers')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                viewMode === 'usedPlayers' ? 'bg-purple-500 text-white shadow-lg' : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
              }`}
            >
              Used Players
            </button>
          </div>
          
          {viewMode === 'week' && (
            <div className="mt-3">
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(Number(e.target.value))}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {Array.from({length: 20}, (_, i) => i + 1).map(week => (
                  <option key={week} value={week}>Week {week}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {viewMode !== 'usedPlayers' && (
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">{getStandingsTitle()}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Team</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Owner</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {standings.map((team, index) => (
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
                      <td className="px-6 py-4 text-center font-bold text-cyan-400 text-lg">
                        {team.points.toFixed(1)}
                        {(viewMode.includes('playoff') || viewMode === 'playoffsTotal') && (
                          <span className="text-sm text-orange-400 ml-1">(1.5x)</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewMode === 'usedPlayers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockTeams.map(team => (
              <div key={team.id} className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{team.name}</h3>
                  <span className="text-sm text-gray-400">Owner: {team.owner}</span>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-300 mb-2">
                    Players Used: {team.usedPlayers.length}
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((team.usedPlayers.length / 20) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {team.usedPlayers.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {team.usedPlayers.map(player => (
                      <div key={player.id} className="flex items-center justify-between p-2 bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPositionColor(player.position)}`}>
                            {player.position}
                          </span>
                          <span className="text-white font-medium">{player.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-cyan-400 font-bold">Week {player.weekUsed}</div>
                          <div className="text-xs text-gray-400">{player.points} pts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-4">
                    No players used yet this season
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Player Usage Rules */}
        <div className="mt-8 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-2 text-white">Player Usage Rules:</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Each player can only be used ONCE during regular season (Weeks 1-17)</li>
                <li>• After regular season ends, player pool completely resets for playoffs</li>
                <li>• Players not used in the regular season are worth 1.5x points in playoffs</li>
                <li>• Current status: <strong className="text-cyan-400">{isPlayoffs ? 'PLAYOFFS - Player pool reset, 1.5x points' : 'REGULAR SEASON - Track player usage carefully'}</strong></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
