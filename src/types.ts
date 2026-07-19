export type StatKey = 'power' | 'intelligence' | 'charm'

export type Stats = Record<StatKey, number>

export interface Character {
  name: string
  stats: Stats
  stamina: number
  /** -2 (絶不調) 〜 2 (絶好調) */
  condition: number
  turn: number
  totalTurns: number
}

export interface StatDelta {
  power?: number
  intelligence?: number
  charm?: number
  stamina?: number
  condition?: number
}

export interface TrainingOption {
  id: string
  name: string
  description: string
  stat: StatKey
  staminaCost: number
  gainRange: [number, number]
}

export interface EventChoice {
  label: string
  effects: StatDelta
  resultText: string
}

export interface EventCard {
  id: string
  title: string
  description: string
  choices: [EventChoice, EventChoice]
}

export type Phase =
  | 'title'
  | 'create'
  | 'playing'
  | 'event'
  | 'checkpoint'
  | 'result'

export interface GameState {
  phase: Phase
  character: Character | null
  pendingEvent: EventCard | null
  lastMessage: string | null
  checkpointRank: string | null
  finalRank: string | null
}
