"use client"
import React, { useState } from 'react';

const mockPlayers = [
  { id: '1', name: 'Josh Allen', position: 'QB', team: 'BUF', projectedPoints: 24.5, isInjured: false, byeWeek: 12 },
  { id: '2', name: 'Christian McCaffrey', position: 'RB', team: 'SF', projectedPoints: 20.8, isInjured: false, byeWeek: 9 },
  { id: '3', name: 'Cooper Kupp', position: 'WR', team: 'LAR', projectedPoints: 18.9, isInjured: false, byeWeek: 6 },
  { id: '4', name: 'Travis Kelce', position: 'TE', team: 'KC', projectedPoints: 16.2, isInjured: false, byeWeek: 10 },
  { id: '5', name: 'Austin Ekeler', position: 'RB', team: 'LAC', projectedPoints: 18.5, isInjured: false, byeWeek: 5 },
  { id: '6', name: 'Tyreek Hill', position: 'WR', team: 'MIA', projectedPoints: 18.1, isInjured: false, byeWeek: 6 }
];

const initialLineup = [
  { position: 'QB', player: null },
  { position: 'RB1', player: null },
  { position: 'RB2', player: null },
  { position: 'FLEX1', player: null },
  { position: 'FLEX2', player: null }
];

function canPlayerFillSlot(playerPosition, slotPosition) {
  if (slotPosition === 'QB') return playerPosition === 'QB';
  if (slotPosition === 'RB1' || slotPosition === 'RB2') return playerPosition === 'RB';
  if (slotPosition === 'FLEX1' || slotPosition === 'FLEX2') return playerPosition === 'WR' || playerPosition === 'TE';
  return false;
}

export default function RosterLineup() {
  const [lineup, setLineup] = useState(initialLineup);
  const [availablePlayers, setAvailablePlayers] = useState(mockPlayers);

  const handleDragStart = (e, player) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(player));
  };

  const handleDrop = (e, slotPosition) => {
    e.preventDefault();
    const playerData = e.dataTransfer.getData('text/plain');
    const player = JSON.parse(playerData);
    
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removePlayer = (slotPosition) => {
    const slot = lineup.find(s => s.position === slotPosition);
    if (slot.player) {
      setAvailablePlayers(prev => [...prev, slot.player]);
      setLineup(prev => prev.map(s => 
        s.position === slotPosition ? { ...s, player: null } : s
      ));
    }
  };

  const totalPoints = lineup
    .filter(slot => slot.player)
    .reduce((total, slot) => total + slot.player.projectedPoints, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Fantasy Roster Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lineup Section */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Starting Lineup</h2>
            <div className="text-lg font-bold text-blue-600">{totalPoints.toFixed(1)} pts</div>
          </div>
          
          <div className="space-y-4">
            {lineup.map(slot => (
              <div
                key={slot.position}
                onDrop={(e) => handleDrop(e, slot.position)}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded p-4 min-h-[80px] hover:border-blue-400 transition-colors"
              >
                {slot.player ? (
                  <div className="bg-blue-50 rounded p-2">
                    <div className="font-bold">{slot.player.name} ({slot.player.position})</div>
                    <div className="text-sm text-gray-600">{slot.player.team} • {slot.player.projectedPoints} pts</div>
                    <button 
                      onClick={() => removePlayer(slot.position)}
                      className="text-xs text-red-600 hover:text-red-800 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    Drop {slot.position.includes('FLEX') ? 'WR/TE' : slot.position} here
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Players */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Available Players</h2>
          <div className="space-y-2">
            {availablePlayers.map(player => (
              <div 
                key={player.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, player)}
                className="bg-gray-50 rounded p-3 border cursor-grab hover:bg-gray-100 active:cursor-grabbing"
              >
                <div className="font-bold">{player.name} ({player.position})</div>
                <div className="text-sm text-gray-600">{player.team} • {player.projectedPoints} pts</div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
