interface CheckpointModalProps {
  rank: string
  onContinue: () => void
}

export function CheckpointModal({ rank, onContinue }: CheckpointModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-sm rounded-xl bg-gray-800 p-6 text-center shadow-xl">
        <h3 className="text-lg font-bold text-white">中間試験</h3>
        <p className="mt-2 text-sm text-gray-300">現在の評価ランクは...</p>
        <p className="mt-4 text-5xl font-bold text-amber-400">{rank}</p>
        <button
          onClick={onContinue}
          className="mt-6 w-full rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white hover:bg-indigo-400"
        >
          育成を続ける
        </button>
      </div>
    </div>
  )
}
