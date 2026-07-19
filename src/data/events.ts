import type { EventCard } from '../types'

export const EVENTS: EventCard[] = [
  {
    id: 'senpai-consult',
    title: '先輩に相談された',
    description: '先輩から「ちょっと話を聞いてほしい」と相談を持ちかけられた。',
    choices: [
      {
        label: '話を聞く',
        effects: { charm: 6, stamina: -10 },
        resultText: '親身に話を聞き、頼りにされた。魅力が上がった。',
      },
      {
        label: '自主練を優先する',
        effects: { power: 6 },
        resultText: '練習を優先した。パワーが上がった。',
      },
    ],
  },
  {
    id: 'festival',
    title: '商店街のお祭り',
    description: '商店街でお祭りが開催されている。',
    choices: [
      {
        label: '祭りを楽しむ',
        effects: { charm: 5, condition: 1 },
        resultText: '気分転換になり、調子が上がった。',
      },
      {
        label: '会場の隅で素振りする',
        effects: { power: 5, stamina: -10 },
        resultText: '人混みの中でも自主練を続けた。',
      },
    ],
  },
  {
    id: 'bookstore',
    title: '本屋で気になる本を発見',
    description: '本屋で専門書を見つけた。',
    choices: [
      {
        label: '読み込む',
        effects: { intelligence: 8 },
        resultText: 'じっくり読み込み、知力が上がった。',
      },
      {
        label: '今日はやめておく',
        effects: { stamina: 5 },
        resultText: '無理せず体力を温存した。',
      },
    ],
  },
  {
    id: 'poor-condition',
    title: '体調を崩し気味',
    description: '少し体が重い。無理をするか、休むか。',
    choices: [
      {
        label: '無理して練習する',
        effects: { power: 8, stamina: -25, condition: -1 },
        resultText: '無理をして練習した。調子を崩してしまった。',
      },
      {
        label: 'しっかり休む',
        effects: { stamina: 30, condition: 1 },
        resultText: 'しっかり休養し、調子が上向いた。',
      },
    ],
  },
  {
    id: 'rival-watch',
    title: 'ライバルの練習を見学',
    description: 'ライバルが練習しているところに出くわした。',
    choices: [
      {
        label: '練習方法を研究する',
        effects: { intelligence: 6 },
        resultText: '練習方法を分析し、知力が上がった。',
      },
      {
        label: '挑発をさらりと受け流す',
        effects: { charm: 6 },
        resultText: '余裕のある対応で魅力が上がった。',
      },
    ],
  },
  {
    id: 'volunteer',
    title: '地域のボランティアに誘われる',
    description: '地域のボランティア活動に誘われた。',
    choices: [
      {
        label: '参加する',
        effects: { charm: 7, stamina: -10 },
        resultText: '地域の人と交流し、魅力が上がった。',
      },
      {
        label: '丁重に断り自主練する',
        effects: { power: 7 },
        resultText: '自主練に集中した。パワーが上がった。',
      },
    ],
  },
  {
    id: 'nice-restaurant',
    title: '美味しいご飯屋を見つけた',
    description: '評判の良い定食屋を見つけた。',
    choices: [
      {
        label: 'しっかり食べる',
        effects: { stamina: 25, condition: 1 },
        resultText: '栄養満点の食事で調子が良くなった。',
      },
      {
        label: '我慢して自主練する',
        effects: { intelligence: 6, stamina: -10 },
        resultText: '誘惑に負けず勉強を続けた。',
      },
    ],
  },
  {
    id: 'late-night-temptation',
    title: '深夜まで自主トレしたい誘惑',
    description: 'まだ頑張れる気がするが、夜も遅い。',
    choices: [
      {
        label: '頑張って練習する',
        effects: { power: 8, stamina: -20, condition: -1 },
        resultText: '無理を押して練習した。疲労が残った。',
      },
      {
        label: '我慢して早めに寝る',
        effects: { stamina: 20, condition: 1 },
        resultText: 'しっかり眠り、調子が上がった。',
      },
    ],
  },
]
