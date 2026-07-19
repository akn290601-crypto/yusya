import type { TrainingOption } from '../types'

export const TRAININGS: TrainingOption[] = [
  {
    id: 'power',
    name: 'パワートレーニング',
    description: '筋力トレーニングでパワーを鍛える。',
    stat: 'power',
    staminaCost: 20,
    gainRange: [8, 14],
  },
  {
    id: 'intelligence',
    name: '座学',
    description: '座学で知力を鍛える。',
    stat: 'intelligence',
    staminaCost: 20,
    gainRange: [8, 14],
  },
  {
    id: 'charm',
    name: '魅力レッスン',
    description: '立ち居振る舞いのレッスンで魅力を鍛える。',
    stat: 'charm',
    staminaCost: 20,
    gainRange: [8, 14],
  },
]

export const REST_STAMINA_GAIN = 40
export const OUTING_STAMINA_COST = 10
