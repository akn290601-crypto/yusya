import type { Character } from '../types'
import { TRAININGS, OUTING_STAMINA_COST } from '../data/trainings'
import { conditionLabel } from '../game/rank'
import { StatBar } from './StatBar'

interface MainScreenProps {
  character: Character
  lastMessage: string | null
  onTrain: (trainingId: string) => void
  onRest: () => void
  onOuting: () => void
}

const STAT_COLORS: Record<string, string> = {
  power: 'bg-rose-500',
  intelligence: 'bg-sky-500',
  charm: 'bg-amber-500',
}

const STAT_LABELS: Record<string, string> = {
  power: 'パワー',
  intelligence: '知力',
  charm: '魅力',
}

export function MainScreen({ character, lastMessage, onTrain, onRest, onOuting }: MainScreenProps) {
  const canOuting = character.stamina >= OUTING_STAMINA_COST

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-8">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{character.name}</h2>
        <span className="text-sm text-gray-400">
          ターン {character.turn + 1} / {character.totalTurns}
        </span>
      </header>

      <section className="flex flex-col gap-2 rounded-xl bg-gray-800/60 p-4">
        {(Object.keys(STAT_LABELS) as Array<keyof typeof STAT_LABELS>).map((key) => (
          <StatBar
            key={key}
            label={STAT_LABELS[key]}
            value={character.stats[key as 'power' | 'intelligence' | 'charm']}
            max={200}
            colorClass={STAT_COLORS[key]}
          />
        ))}
        <StatBar label="体力" value={character.stamina} max={100} colorClass="bg-emerald-500" />
        <div className="mt-1 text-sm text-gray-300">
          調子: <span className="font-semibold text-white">{conditionLabel(character.condition)}</span>
        </div>
      </section>

      {lastMessage && (
        <div className="rounded-lg border border-gray-700 bg-gray-900/60 p-3 text-sm text-gray-200">
          {lastMessage}
        </div>
      )}

      <section className="flex flex-col gap-2">
        {TRAININGS.map((training) => {
          const disabled = character.stamina < training.staminaCost
          return (
            <button
              key={training.id}
              disabled={disabled}
              onClick={() => onTrain(training.id)}
              className="flex items-center justify-between rounded-lg bg-gray-800 px-4 py-3 text-left text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>
                <span className="font-semibold">{training.name}</span>
                <span className="ml-2 text-xs text-gray-400">{training.description}</span>
              </span>
              <span className="text-xs text-gray-400">体力-{training.staminaCost}</span>
            </button>
          )
        })}
        <button
          onClick={onRest}
          className="rounded-lg bg-gray-800 px-4 py-3 text-left text-white hover:bg-gray-700"
        >
          <span className="font-semibold">休養</span>
          <span className="ml-2 text-xs text-gray-400">体力を回復する</span>
        </button>
        <button
          disabled={!canOuting}
          onClick={onOuting}
          className="rounded-lg bg-gray-800 px-4 py-3 text-left text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="font-semibold">お出かけ</span>
          <span className="ml-2 text-xs text-gray-400">
            何が起きるかは行ってからのお楽しみ (体力-{OUTING_STAMINA_COST})
          </span>
        </button>
      </section>
    </div>
  )
}
