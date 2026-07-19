interface StatBarProps {
  label: string
  value: number
  max: number
  colorClass: string
}

export function StatBar({ label, value, max, colorClass }: StatBarProps) {
  const percent = clampPercent((value / max) * 100)
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-sm text-gray-300">{label}</span>
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-700">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-sm tabular-nums text-gray-200">
        {value}
      </span>
    </div>
  )
}

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value))
}
