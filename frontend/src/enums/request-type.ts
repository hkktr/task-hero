export const REQUEST_TYPES = {
  MOVING: 0,
  GARDENING: 1,
  PET_CARE: 2,
  GROCERY: 3,
  HANDYMAN: 4,
} as const

export type RequestType = (typeof REQUEST_TYPES)[keyof typeof REQUEST_TYPES]
