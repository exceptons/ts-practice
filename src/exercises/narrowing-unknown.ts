export type ApiUser = {
  id: number
  name: string
  email: string
}

export type ParseResult =
  | {
      ok: true
      user: ApiUser
    }
  | {
      ok: false
      error: string
    }

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

export const parseApiUser = (payload: unknown): ParseResult => {
  if (!isRecord(payload)) {
    return {
      ok: false,
      error: 'Payload must be an object.',
    }
  }

  const { id, name, email } = payload

  if (typeof id !== 'number') {
    return {
      ok: false,
      error: 'User id must be a number.',
    }
  }

  if (typeof name !== 'string') {
    return {
      ok: false,
      error: 'User name must be a string.',
    }
  }

  if (typeof email !== 'string') {
    return {
      ok: false,
      error: 'User email must be a string.',
    }
  }

  return {
    ok: true,
    user: {
      id,
      name,
      email,
    },
  }
}

export const sampleApiPayloads: unknown[] = [
  {
    id: 1,
    name: 'Kota',
    email: 'kota@example.com',
  },
  {
    id: '2',
    name: 'Mika',
    email: 'mika@example.com',
  },
  null,
]

export const parseSamplePayloads = (): ParseResult[] =>
  sampleApiPayloads.map(parseApiUser)
