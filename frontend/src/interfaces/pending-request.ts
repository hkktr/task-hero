import type { RequestType } from '../enums/request-type'

// GET /admin/requests/pending — list shape for the moderation queue
export interface PendingRequest {
  id: number
  title: string
  type: RequestType
  createdAt: string
  thumbnailUrl: string
  author: {
    id: number
    nickname: string
  }
}

// POST /admin/requests/{id}/approve
export interface ApproveRequestPayload {
  note?: string
}

// POST /admin/requests/{id}/reject
export interface RejectRequestPayload {
  reason: string
}
