"use client"
import React from 'react';

// Types matching your structure
interface Player {
  id: string;
  name: string;
  position: 'QB' | 'RB' | 'WR' | 'TE';
  team: string;
  projectedPoints: number;
  actualPoints?: number;
  isInjured: boolean;
  byeWeek: number;
}

const mockPlayers: Player[] = [
  { id: '1', name: 'Josh Allen', position: 'QB', team: 'BUF', projectedPoints: 24.5, isInjured: false, byeWeek: 12 },
  { id: '2', name: 'Christian McCaffrey', position: 'RB', team: 'SF', projectedPoints: 20.8, isInjured: false, byeWeek: 9 },
  { id: '3', name: 'Cooper Kupp', position: 'WR', team: 'LAR', projectedPoints: 18.9, isInjured: false, byeWeek: 6 },
  { id: '4', name: 'Travis Kelce', position: 'TE', team: 'KC', projectedPoints: 16.2, isInjured: false, byeWeek: 10 },
  { id: '5', name: 'Nick Chubb', position: 'RB', team: 'CLE', projectedPoints: 16.8, isInjured: true, byeWeek: 5 },
  { id: '6', name: 'Tyreek Hill', position: 'WR', team: 'MIA', projectedPoints: 18.1, isInjured: false, byeWeek: 6 },
  { id: '7', name: 'Lamar Jackson', position: 'QB', team: 'BAL', projectedPoints: 23.8, isInjured: false, byeWeek: 14 },
  { id: '8', name: 'Austin Ekeler', position: 'RB', team: 'LAC', projectedPoints: 18.5, isInjured: false, byeWeek: 5 }
];

function getPositionColor(position: string): string {
  const colors = {
    QB: 'bg-red-100 text-red-800 border-red-300',
    RB: 'bg-green-100 text-green-800 border-green-300',
    WR: 'bg-blue-100 text-blue-800 border-blue-300',
    TE: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  };
  return colors[position as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-300';
}

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
  isSelected?: boolean;
  showDetailedStats?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  onClick, 
  isSelected = false, 
  showDetailedStats = true 
}) => {
  return (
    <div
      className={`
        relative bg-white rounded-xl border-2 shadow-lg transition-all duration-300 cursor-pointer
        hover:shadow-xl hover:scale-105 hover:border-blue-400
        ${isSelected ? 'border-blue-500 ring-2 ring-blue-200 shadow-xl' : 'border-gray-200'}
        ${player.isInjured ? 'opacity-80' : ''}
      `}
      onClick={onClick}
    >
      {/* Injury Badge */}
      {player.isInjured && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-lg">
          INJ
        </div>
      )}
      
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getPositionColor(player.position)}`}>
            {player.position}
          </span>
          <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded">
            {player.team}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {player.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {player.projectedPoints.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Proj. Pts
            </div>
          </div>
          
          {player.actualPoints && (
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">
                {player.actualPoints.toFixed(1)}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Actual
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Stats Section */}
      {showDetailedStats && (
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-600 text-xs uppercase font-semibold mb-1">
                  Bye Week
                </div>
                <div className="font-bold text-gray-900 text-lg">
                  {player.byeWeek}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl bg-blue-500 bg-opacity-10 pointer-events-none">
          <div className="absolute top-2 left-2 w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default function EnhancedPlayerCardDemo() {
  const [selectedPlayer, setSelectedPlayer] = React.useState<string | null>(null);
  const [filterPosition, setFilterPosition] = React.useState<string>('ALL');
  
  const filteredPlayers = filterPosition === 'ALL' 
    ? mockPlayers 
    : mockPlayers.filter(player => player.position === filterPosition);
  
  const positions = ['ALL', 'QB', 'RB', 'WR', 'TE'];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Fantasy Football Player Cards
          </h1>
          <p className="text-gray-600 text-lg">
            Select players for your lineup. Click cards to select/deselect them.
          </p>
        </div>
        
        {/* Position Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {positions.map((position) => (
              <button
                key={position}
                onClick={() => setFilterPosition(position)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  filterPosition === position
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {position}
              </button>
            ))}
          </div>
        </div>
        
        {/* Player Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={selectedPlayer === player.id}
              onClick={() => setSelectedPlayer(
                selectedPlayer === player.id ? null : player.id
              )}
            />
          ))}
        </div>
        
        {/* Selection Info */}
        {selectedPlayer && (
          <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              Selected Player
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-lg">
                  <strong className="text-blue-800">
                    {filteredPlayers.find(p => p.id === selectedPlayer)?.name}
                  </strong>
                  {' '}({filteredPlayers.find(p => p.id === selectedPlayer)?.position})
                </p>
                <p className="text-gray-600">
                  {filteredPlayers.find(p => p.id === selectedPlayer)?.team} • 
                  {' '}{filteredPlayers.find(p => p.id === selectedPlayer)?.projectedPoints.toFixed(1)} projected points
                </p>
              </div>
              <button
                onClick={() => setSelectedPlayer(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}