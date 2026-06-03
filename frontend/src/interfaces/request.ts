import type { ApprovalStatus } from '../enums/approval-status'
import type { RequestType } from '../enums/request-type'
import type { Coordinates } from './coordinates'

export type SimplifiedRequest = Pick<Request, 'id' | 'title' | 'type' | 'images' | 'location' | 'approvalStatus'>

export interface Request {
  id: number
  title: string
  type: RequestType
  description: string
  requestDateTime: {
    date: string
    from: string
    to: string
  }
  numberOfVolunteers: number
  images: string[]
  requestedBy: {
    id: number
    nickname: string
  }
  location: {
    fullAddress: string
    latLong: Coordinates
  }
  approvalStatus: ApprovalStatus
}
