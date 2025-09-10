export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'FLEX';

export type LineupPosition = 
  | 'QB' 
  | 'RB1' 
  | 'RB2' 
  | 'FLEX1'
  | 'FLEX2';

export interface Player {
  id: string;
  name: string;
  position: Position;
  team: string;
  projectedPoints: number;
  actualPoints?: number;
  isInjured: boolean;
  byeWeek: number;
}

export interface LineupSlot {
  position: LineupPosition;
  player: Player | null;
  isFlexEligible?: boolean;
  eligiblePositions?: Position[];
}