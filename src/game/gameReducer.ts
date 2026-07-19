import type { Character, EventCard, GameState, StatDelta } from '../types'
import { TRAININGS, REST_STAMINA_GAIN, OUTING_STAMINA_COST } from '../data/trainings'
import { EVENTS } from '../data/events'
import { calcRank } from './rank'

export const TOTAL_TURNS = 12
export const CHECKPOINT_TURN = 6

const MAX_STAMINA = 100

export type GameAction =
  | { type: 'START_CREATE' }
  | { type: 'CREATE_CHARACTER'; name: string }
  | { type: 'TRAIN'; trainingId: string }
  | { type: 'REST' }
  | { type: 'OUTING' }
  | { type: 'RESOLVE_EVENT'; choiceIndex: 0 | 1 }
  | { type: 'ACK_CHECKPOINT' }
  | { type: 'RESTART' }
  | { type: 'LOAD'; state: GameState }

export const initialState: GameState = {
  phase: 'title',
  character: null,
  pendingEvent: null,
  lastMessage: null,
  checkpointRank: null,
  finalRank: null,
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function applyDelta(character: Character, delta: StatDelta): Character {
  return {
    ...character,
    stats: {
      power: character.stats.power + (delta.power ?? 0),
      intelligence: character.stats.intelligence + (delta.intelligence ?? 0),
      charm: character.stats.charm + (delta.charm ?? 0),
    },
    stamina: clamp(character.stamina + (delta.stamina ?? 0), 0, MAX_STAMINA),
    condition: clamp(character.condition + (delta.condition ?? 0), -2, 2),
  }
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickRandomEvent(): EventCard {
  return EVENTS[randomInt(0, EVENTS.length - 1)]
}

/** ターンを1進め、チェックポイント/最終結果への遷移を判定する */
function advanceTurn(character: Character): {
  character: Character
  phase: GameState['phase']
  checkpointRank: string | null
  finalRank: string | null
} {
  const nextTurn = character.turn + 1
  const nextCharacter = { ...character, turn: nextTurn }

  if (nextTurn >= character.totalTurns) {
    return {
      character: nextCharacter,
      phase: 'result',
      checkpointRank: null,
      finalRank: calcRank(nextCharacter.stats),
    }
  }
  if (nextTurn === CHECKPOINT_TURN) {
    return {
      character: nextCharacter,
      phase: 'checkpoint',
      checkpointRank: calcRank(nextCharacter.stats),
      finalRank: null,
    }
  }
  return {
    character: nextCharacter,
    phase: 'playing',
    checkpointRank: null,
    finalRank: null,
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_CREATE':
      return { ...initialState, phase: 'create' }

    case 'CREATE_CHARACTER': {
      const name = action.name.trim() || '名無し'
      const character: Character = {
        name,
        stats: { power: 10, intelligence: 10, charm: 10 },
        stamina: MAX_STAMINA,
        condition: 0,
        turn: 0,
        totalTurns: TOTAL_TURNS,
      }
      return {
        ...initialState,
        phase: 'playing',
        character,
        lastMessage: `${name}の育成が始まった。`,
      }
    }

    case 'TRAIN': {
      if (!state.character || state.phase !== 'playing') return state
      const training = TRAININGS.find((t) => t.id === action.trainingId)
      if (!training) return state
      if (state.character.stamina < training.staminaCost) return state

      const [min, max] = training.gainRange
      const baseGain = randomInt(min, max)
      const multiplier = [0.7, 0.85, 1, 1.15, 1.3][state.character.condition + 2]
      const gain = Math.max(1, Math.round(baseGain * multiplier))

      let trained = applyDelta(state.character, {
        [training.stat]: gain,
        stamina: -training.staminaCost,
      })

      let message = `${training.name}で${gain}成長した。`
      if (Math.random() < 0.2) {
        trained = applyDelta(trained, { condition: -1 })
        message += ' 少し疲れが出てきたようだ。'
      }

      const { character, phase, checkpointRank, finalRank } = advanceTurn(trained)
      return { ...state, character, phase, checkpointRank, finalRank, lastMessage: message }
    }

    case 'REST': {
      if (!state.character || state.phase !== 'playing') return state
      let rested = applyDelta(state.character, { stamina: REST_STAMINA_GAIN })
      let message = 'しっかり休んで体力が回復した。'
      if (Math.random() < 0.4) {
        rested = applyDelta(rested, { condition: 1 })
        message += ' 調子も上向いてきた。'
      }
      const { character, phase, checkpointRank, finalRank } = advanceTurn(rested)
      return { ...state, character, phase, checkpointRank, finalRank, lastMessage: message }
    }

    case 'OUTING': {
      if (!state.character || state.phase !== 'playing') return state
      if (state.character.stamina < OUTING_STAMINA_COST) return state
      const event = pickRandomEvent()
      return { ...state, phase: 'event', pendingEvent: event }
    }

    case 'RESOLVE_EVENT': {
      if (!state.character || !state.pendingEvent) return state
      const choice = state.pendingEvent.choices[action.choiceIndex]
      let resolved = applyDelta(state.character, {
        ...choice.effects,
        stamina: (choice.effects.stamina ?? 0) - OUTING_STAMINA_COST,
      })
      const { character, phase, checkpointRank, finalRank } = advanceTurn(resolved)
      return {
        ...state,
        character,
        phase,
        checkpointRank,
        finalRank,
        pendingEvent: null,
        lastMessage: choice.resultText,
      }
    }

    case 'ACK_CHECKPOINT': {
      if (!state.character) return state
      return { ...state, phase: 'playing', checkpointRank: null }
    }

    case 'RESTART':
      return { ...initialState }

    case 'LOAD':
      return action.state

    default:
      return state
  }
}
