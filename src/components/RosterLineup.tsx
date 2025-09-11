"use client"
import React, { useState } from 'react';
import { Position, LineupPosition, Player, LineupSlot } from '@/types/fantasy';

const mockPlayers: Player[] = [
  { id: '1', name: 'Josh Allen', position: 'QB', team: 'BUF', projectedPoints: 24.5, isInjured: false, byeWeek: 12 },
  { id: '2', name: 'Christian McCaffrey', position: 'RB', team: 'SF', projectedPoints: 20.8, isInjured: false, byeWeek: 9 },
  { id: '3', name: 'Cooper Kupp', position: 'WR', team: 'LAR', projectedPoints: 18.9, isInjured: false, byeWeek: 6 },
  { id: '4', name: 'Travis Kelce', position: 'TE', team: 'KC', projectedPoints: 16.2, isInjured: false, byeWeek: 10 },
  { id: '5', name: 'Austin Ekeler', position: 'RB', team: 'LAC', projectedPoints: 18.5, isInjured: false, byeWeek: 5 },
  { id: '6', name: 'Tyreek Hill', position: 'WR', team: 'MIA', projectedPoints: 18.1, isInjured: false, byeWeek: 6 }
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

  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Fantasy Roster Builder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lineup Section */}
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Starting Lineup</h2>
          <div className="text-xl font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">{totalPoints.toFixed(1)} pts</div>
            {/* Submit Button */}
<div className="mt-6 p-4 border-t border-gray-200">
  {!isSubmitted ? (
    <button 
      onClick={handleSubmitLineup}
      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700"
      disabled={lineup.filter(slot => slot.player).length < 5}
    >
      Submit Lineup for Week 3
    </button>
  ) : (
    <div className="text-center text-green-600 font-bold py-3">
      ✓ Lineup submitted for Week 3
    </div>
  )}
  <p className="text-sm text-gray-500 mt-2 text-center">
    Deadline: {submitDeadline}
  </p>
</div>
          </div>
          
          <div className="space-y-4">
            {lineup.map(slot => (
              <div
                key={slot.position}
                onDrop={(e) => handleDrop(e, slot.position as LineupPosition)}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-slate-300 rounded-xl p-4 min-h-[80px] hover:border-indigo-400 hover:bg-indigo-25 transition-all duration-200 bg-white shadow-md"
              >
                {slot.player ? (
                  <div className="bg-blue-50 rounded p-2">
                    <div className="font-bold text-black-900">{slot.player?.name} ({slot.player?.position})</div>
                    <div className="text-sm text-black-600">{slot.player.team}</div>
                    <button 
                      onClick={() => removePlayer(slot.position)}
                      className="text-xs text-red-600 hover:text-red-800 mt-1"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                    <div className="text-center text-gray-700">
                    Drop {slot.position.includes('FLEX') ? 'WR/TE' : slot.position} here
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Available Players */}
        <div className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Available Players</h2>
          <div className="space-y-2">
            {availablePlayers.map(player => (
              <div 
                key={player.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, player)}
                className="bg-white rounded-lg p-3 border border-slate-200 cursor-grab hover:bg-indigo-50 hover:border-indigo-300 active:cursor-grabbing shadow-md hover:shadow-lg transition-all duration-200"
              >
                <div className="font-bold text-gray-900">{player.name} ({player.position})</div>
                <div className="text-sm text-gray-600">{player.team}</div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
