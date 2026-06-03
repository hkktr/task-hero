export const APPROVAL_STATUSES = {
  PENDING: 0,
  REJECTED: 1,
  APPROVED: 2,
} as const

export type ApprovalStatus = (typeof APPROVAL_STATUSES)[keyof typeof APPROVAL_STATUSES]
