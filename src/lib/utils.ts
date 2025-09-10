import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwindcss-merge"
import { Player, Position, LineupSlot } from "@/types/fantasy"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPositionColor(position: Position): string {
  const colors = {
    QB: 'bg-red-100 text-red-800 border-red-200',
    RB: 'bg-green-100 text-green-800 border-green-200',
    WR: 'bg-blue-100 text-blue-800 border-blue-200',
    TE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    FLEX: 'bg-purple-100 text-purple-800 border-purple-200'
  }
  return colors[position] || 'bg-gray-100 text-gray-800 border-gray-200'
}

export function isFlexEligible(position: Position): boolean {
  return position === 'WR' || position === 'TE'
}

export function createEmptyLineup(): LineupSlot[] {
  return [
    { position: 'QB', player: null },
    { position: 'RB1', player: null },
    { position: 'RB2', player: null },
    { position: 'FLEX1', player: null, isFlexEligible: true, eligiblePositions: ['WR', 'TE'] },
    { position: 'FLEX2', player: null, isFlexEligible: true, eligiblePositions: ['WR', 'TE'] }
  ]
}

export function formatPoints(points: number): string {
  return points.toFixed(1)
}

export function generateMockPlayers(): Player[] {
  return [
    { id: '1', name: 'Josh Allen', position: 'QB', team: 'BUF', projectedPoints: 24.5, isInjured: false, byeWeek: 12 },
    { id: '2', name: 'Christian McCaffrey', position: 'RB', team: 'SF', projectedPoints: 20.8, isInjured: false, byeWeek: 9 },
    { id: '3', name: 'Cooper Kupp', position: 'WR', team: 'LAR', projectedPoints: 18.9, isInjured: false, byeWeek: 6 },
    { id: '4', name: 'Travis Kelce', position: 'TE', team: 'KC', projectedPoints: 16.2, isInjured: false, byeWeek: 10 },
    { id: '5', name: 'Nick Chubb', position: 'RB', team: 'CLE', projectedPoints: 16.8, isInjured: true, byeWeek: 5 }
  ]
}
