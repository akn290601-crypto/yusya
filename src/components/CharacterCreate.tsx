import { useState } from 'react'

interface CharacterCreateProps {
  onCreate: (name: string) => void
}

export function CharacterCreate({ onCreate }: CharacterCreateProps) {
  const [name, setName] = useState('')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h2 className="text-2xl font-bold text-white">キャラクター作成</h2>
      <form
        className="flex w-full max-w-sm flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          onCreate(name)
        }}
      >
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="名前を入力"
          maxLength={12}
          className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-400"
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-500 px-8 py-3 font-semibold text-white hover:bg-indigo-400"
        >
          育成をはじめる
        </button>
      </form>
    </div>
  )
}
