import type { EventCard } from '../types'

interface EventModalProps {
  event: EventCard
  onChoose: (choiceIndex: 0 | 1) => void
}

export function EventModal({ event, onChoose }: EventModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white">{event.title}</h3>
        <p className="mt-2 text-sm text-gray-300">{event.description}</p>
        <div className="mt-6 flex flex-col gap-3">
          {event.choices.map((choice, index) => (
            <button
              key={choice.label}
              onClick={() => onChoose(index as 0 | 1)}
              className="rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white hover:bg-indigo-400"
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
