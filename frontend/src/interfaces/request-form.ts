import type { RequestType } from '../enums/request-type'
import type { Coordinates } from './coordinates'
import type { Image } from './image'

export interface RequestFormStep1 {
  title: string
  type: RequestType
  description: string
}

export interface RequestFormStep2 extends RequestFormStep1 {
  dateTimeSlot: {
    date: string
    from: string
    to: string
  }
  numberOfVolunteers: number
}

export interface RequestFormStep3 extends RequestFormStep2 {
  images: Image[]
  imageIds: string[]
}

export type RequestFormPayload = Omit<RequestFormStep3, 'images'> & {
  location: Coordinates
}
