import type { Stats } from '../types'

export function statTotal(stats: Stats): number {
  return stats.power + stats.intelligence + stats.charm
}

export function calcRank(stats: Stats): string {
  const total = statTotal(stats)
  if (total >= 150) return 'S'
  if (total >= 110) return 'A'
  if (total >= 80) return 'B'
  if (total >= 50) return 'C'
  return 'D'
}

export const CONDITION_LABELS = ['絶不調', '不調', '普通', '好調', '絶好調']

export function conditionLabel(condition: number): string {
  return CONDITION_LABELS[condition + 2]
}

export function conditionMultiplier(condition: number): number {
  return [0.7, 0.85, 1, 1.15, 1.3][condition + 2]
}
