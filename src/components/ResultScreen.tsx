import type { Character } from '../types'
import { statTotal } from '../game/rank'

interface ResultScreenProps {
  character: Character
  rank: string
  onRestart: () => void
}

export function ResultScreen({ character, rank, onRestart }: ResultScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-gray-400">{character.name} の最終評価</p>
      <p className="text-7xl font-bold text-amber-400">{rank}</p>
      <div className="flex w-full max-w-xs flex-col gap-2 rounded-xl bg-gray-800/60 p-4 text-left text-sm text-gray-200">
        <div className="flex justify-between">
          <span>パワー</span>
          <span>{character.stats.power}</span>
        </div>
        <div className="flex justify-between">
          <span>知力</span>
          <span>{character.stats.intelligence}</span>
        </div>
        <div className="flex justify-between">
          <span>魅力</span>
          <span>{character.stats.charm}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-gray-700 pt-2 font-semibold">
          <span>合計</span>
          <span>{statTotal(character.stats)}</span>
        </div>
      </div>
      <button
        onClick={onRestart}
        className="rounded-lg bg-indigo-500 px-8 py-3 font-semibold text-white hover:bg-indigo-400"
      >
        もう一度あそぶ
      </button>
    </div>
  )
}
