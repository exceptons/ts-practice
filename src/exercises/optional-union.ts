export type MemberRole = 'admin' | 'editor' | 'viewer'

export type MemberStatus = 'active' | 'invited' | 'suspended'

export type TeamMember = {
  id: number
  name: string
  role: MemberRole
  status: MemberStatus
  lastLoginAt?: string | null
  profile?: {
    bio?: string
    websiteUrl?: string | null
  }
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Kota',
    role: 'admin',
    status: 'active',
    lastLoginAt: '2026-04-25T10:30:00Z',
    profile: {
      bio: 'Laravel developer learning TypeScript.',
      websiteUrl: null,
    },
  },
  {
    id: 2,
    name: 'Mika',
    role: 'editor',
    status: 'invited',
  },
  {
    id: 3,
    name: 'Ren',
    role: 'viewer',
    status: 'suspended',
    lastLoginAt: null,
    profile: {
      websiteUrl: 'https://example.com/ren',
    },
  },
]

export const getStatusLabel = (status: MemberStatus): string => {
  switch (status) {
    case 'active':
      return 'Active'
    case 'invited':
      return 'Invited'
    case 'suspended':
      return 'Suspended'
  }
}

export const formatLastLogin = (lastLoginAt?: string | null): string => {
  if (!lastLoginAt) {
    return 'No login yet'
  }

  return lastLoginAt.slice(0, 10)
}

export const getMembersByStatus = (
  members: TeamMember[],
  status: MemberStatus,
): TeamMember[] => members.filter((member) => member.status === status)

export const getWebsiteLabel = (member: TeamMember): string =>
  member.profile?.websiteUrl ?? 'No website'
