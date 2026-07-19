interface TitleScreenProps {
  hasSave: boolean
  onStart: () => void
  onContinue: () => void
}

export function TitleScreen({ hasSave, onStart, onContinue }: TitleScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
      <div>
        <h1 className="text-4xl font-bold tracking-wide text-white">育成シミュレーション</h1>
        <p className="mt-2 text-gray-400">オリジナルキャラクターを育てよう</p>
      </div>
      <div className="flex flex-col gap-3">
        {hasSave && (
          <button
            onClick={onContinue}
            className="rounded-lg bg-indigo-500 px-8 py-3 font-semibold text-white hover:bg-indigo-400"
          >
            つづきから
          </button>
        )}
        <button
          onClick={onStart}
          className="rounded-lg border border-gray-600 px-8 py-3 font-semibold text-gray-200 hover:bg-gray-800"
        >
          {hasSave ? '最初から始める' : 'はじめる'}
        </button>
      </div>
    </div>
  )
}
