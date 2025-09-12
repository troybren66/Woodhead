"use client"
import React, { useState } from 'react';
import { Position, LineupPosition, Player, LineupSlot } from '@/types/fantasy';

const mockPlayers: Player[] = [
  { id: '1', name: 'Josh Allen', position: 'QB', team: 'BUF', projectedPoints: 24.5, isInjured: false, byeWeek: 12, usedInWeek: 1 },
  { id: '2', name: 'Christian McCaffrey', position: 'RB', team: 'SF', projectedPoints: 20.8, isInjured: false, byeWeek: 9, usedInWeek: null },
  { id: '3', name: 'Cooper Kupp', position: 'WR', team: 'LAR', projectedPoints: 18.9, isInjured: false, byeWeek: 6, usedInWeek: 2 },
  // etc... null means not used yet, number means used in that week
];

const initialLineup: LineupSlot[] = [
  { position: 'QB', player: null },
  { position: 'RB1', player: null },
  { position: 'RB2', player: null },
  { position: 'FLEX1', player: null },
  { position: 'FLEX2', player: null }
];

function canPlayerFillSlot(playerPosition: Position, slotPosition: LineupPosition) {
  if (slotPosition === 'QB') return playerPosition === 'QB';
  if (slotPosition === 'RB1' || slotPosition === 'RB2') return playerPosition === 'RB';
  if (slotPosition === 'FLEX1' || slotPosition === 'FLEX2') return playerPosition === 'WR' || playerPosition === 'TE';
  return false;
}

export default function RosterLineup() {
  const [lineup, setLineup] = useState<LineupSlot[]>(initialLineup);
  const [isSubmitted, setIsSubmitted] = useState(false);
const [submitDeadline, setSubmitDeadline] = useState('Friday 11:59 PM');
  const [availablePlayers, setAvailablePlayers] = useState<Player[]>(mockPlayers);
  const [searchTerm, setSearchTerm] = useState('');
const [selectedPosition, setSelectedPosition] = useState('ALL');
const [sortBy, setSortBy] = useState('points');

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, player: Player) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(player));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, slotPosition: LineupPosition) => {
    e.preventDefault();
    const playerData = e.dataTransfer.getData('text/plain');
    const player = JSON.parse(playerData) as Player;
    
    if (!canPlayerFillSlot(player.position, slotPosition)) {
      alert(`${player.name} (${player.position}) cannot be placed in ${slotPosition} slot`);
      return;
    }
  
    // Remove player from available players
    setAvailablePlayers(prev => prev.filter(p => p.id !== player.id));
  
    // Add player to lineup
    setLineup(prev => prev.map(slot => 
      slot.position === slotPosition ? { ...slot, player } : slot
    ));
  };
  
  const filteredAndSortedPlayers = availablePlayers
    .filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.team.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = selectedPosition === 'ALL' || player.position === selectedPosition;
      return matchesSearch && matchesPosition;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'team': return a.team.localeCompare(b.team);
        case 'points': return b.projectedPoints - a.projectedPoints;
        default: return 0;
      }
    });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removePlayer = (slotPosition: string) => {
    const slot = lineup.find(s => s.position === slotPosition)!;
    if (slot.player) {
      setAvailablePlayers(prev => [...prev, slot.player!]);
      setLineup(prev => prev.map(s => 
        s.position === slotPosition ? { ...s, player: null } : s
      ));
    }
  };
  const handleSubmitLineup = () => {
    const filledSlots = lineup.filter(slot => slot.player).length;
    
    if (filledSlots === 5) {
      setIsSubmitted(true);
      alert('Lineup submitted successfully!');
      // Later: API call to backend will go here
    } else {
      alert(`Please fill all 5 roster spots. You have ${filledSlots}/5 filled.`);
    }
  };

  const totalPoints = lineup
    .filter((slot) => Boolean(slot.player))
    .reduce((total, slot) => total + (slot.player?.projectedPoints ?? 0), 0);

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedPosition('ALL');
    setSortBy('points');
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* New Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white p-8 rounded-2xl shadow-2xl mb-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 text-6xl">🏈</div>
          <div className="absolute bottom-4 left-4 text-4xl">⚡</div>
        </div>
        
        <div className="flex justify-between items-center relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Woodhead League
              </h1>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-right bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-3xl font-bold text-yellow-300">Week 3</div>
            <div className="text-indigo-200">2025 Season</div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lineup Section */}
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Starting Lineup</h2>
              <div className="text-xl font-bold text-cyan-400 bg-cyan-900/30 px-4 py-2 rounded-lg border border-cyan-500/30">
                {totalPoints.toFixed(1)} pts
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mb-6 p-4 border-t border-gray-700">
              {!isSubmitted ? (
                <button 
                  onClick={handleSubmitLineup}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                  disabled={lineup.filter(slot => slot.player).length < 5}
                >
                  Submit Lineup for Week 3
                </button>
              ) : (
                <div className="text-center text-green-400 font-bold py-3 bg-green-900/30 rounded-lg border border-green-500/30">
                  ✓ Lineup submitted for Week 3
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {lineup.map(slot => (
                <div
                  key={slot.position}
                  onDrop={(e) => handleDrop(e, slot.position as LineupPosition)}
                  onDragOver={handleDragOver}
                  className="border-2 border-dashed border-gray-600 rounded-xl p-4 min-h-[80px] hover:border-cyan-400 hover:bg-gray-700/50 transition-all duration-200 bg-gray-700/30 shadow-md"
                >
                  {slot.player ? (
                    <div className="bg-cyan-900/30 rounded-lg p-3 border border-cyan-500/30">
                      <div className="font-bold text-lg text-white">{slot.player?.name} ({slot.player?.position})</div>
                      <div className="text-sm text-gray-300">{slot.player.team}</div>
                      <button 
                        onClick={() => removePlayer(slot.position)}
                        className="text-xs text-red-400 hover:text-red-300 mt-2 px-2 py-1 bg-red-900/30 rounded border border-red-500/30"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                      <div className="text-center text-gray-400">
                      Drop {slot.position.includes('FLEX') ? 'WR/TE' : slot.position} here
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Available Players */}
          <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Available Players</h2>
            
            {/* Search Controls */}
            <div className="mb-6">
              <div className="relative mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search players or teams..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                >
                  <option value="ALL">All Positions</option>
                  <option value="QB">QB</option>
                  <option value="RB">RB</option>
                  <option value="WR">WR</option>
                  <option value="TE">TE</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                >
                  <option value="points">Sort by Points</option>
                  <option value="name">Sort by Name</option>
                  <option value="team">Sort by Team</option>
                </select>
                
                <button
                  onClick={clearSearch}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Clear
                </button>
              </div>

              <div className="text-sm text-gray-400 mb-4">
                Showing {filteredAndSortedPlayers.length} of {availablePlayers.length} players
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredAndSortedPlayers.map((player) => (
                <div
                  key={player.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, player)}
                  className={`bg-gray-700 rounded-lg p-3 border border-gray-600 cursor-grab hover:bg-cyan-900/30 hover:border-cyan-500/50 active:cursor-grabbing shadow-md hover:shadow-lg transition-all duration-200 ${
                    player.usedInWeek ? 'opacity-60 bg-gray-600' : ''
                  }`}
                >
                  <div className="font-bold text-white">
                    <span className={player.usedInWeek ? 'line-through text-gray-500' : ''}>
                      {player.name} ({player.position})
                    </span>
                    {player.usedInWeek && (
                      <span className="ml-2 text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                        Used Week {player.usedInWeek}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-300">{player.team}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}