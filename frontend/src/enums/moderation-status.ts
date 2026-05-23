export const MODERATION_STATUSES = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
} as const

export type ModerationStatus = (typeof MODERATION_STATUSES)[keyof typeof MODERATION_STATUSES]
