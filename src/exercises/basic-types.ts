export type PracticeUser = {
  id: number
  name: string
  email: string
  isActive: boolean
  score: number
}

export const practiceUsers: PracticeUser[] = [
  {
    id: 1,
    name: 'Kota',
    email: 'kota@example.com',
    isActive: true,
    score: 82,
  },
  {
    id: 2,
    name: 'Mika',
    email: 'mika@example.com',
    isActive: true,
    score: 91,
  },
  {
    id: 3,
    name: 'Ren',
    email: 'ren@example.com',
    isActive: false,
    score: 74,
  },
]

export const createUserLabel = (user: PracticeUser): string => `${user.name} <${user.email}>`

export const getActiveUsers = (users: PracticeUser[]): PracticeUser[] =>
  users.filter((user) => user.isActive)

export const getAverageScore = (users: PracticeUser[]): number => {
  if (users.length === 0) {
    return 0
  }

  const totalScore = users.reduce((total, user) => total + user.score, 0)

  return Math.round((totalScore / users.length) * 10) / 10
}
