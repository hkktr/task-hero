import { TOKEN_STORAGE_KEY } from './context/AuthContext'
import type { Coordinates } from './interfaces/coordinates'
import type { Image } from './interfaces/image'
import type { Request, SimplifiedRequest } from './interfaces/request'
import type { RequestFormPayload } from './interfaces/request-form'

const BASE = 'https://task-hero-api.azurewebsites.net'

export const register = async (nickname: string, emailAddress: string, password: string) => {
  const res = await fetch(`${BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, emailAddress, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message ?? 'Registration failed')
  }
}

export const signIn = async (nickname: string, password: string): Promise<string> => {
  const res = await fetch(`${BASE}/users/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, password }),
  })
  if (!res.ok) {
    throw new Error('Invalid nickname or password')
  }
  const data = await res.json()
  return data.token as string
}

export const getMe = async (): Promise<{ id: number; emailAddress: string; nickname: string }> => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  const res = await fetch(`${BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Unauthorized')
  return res.json()
}

export const uploadImage = async (file: File): Promise<Image> => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch(`${BASE}/images/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  if (!res.ok) throw new Error('Image upload failed')

  return res.json()
}

export const createRequest = async (form: RequestFormPayload): Promise<Request> => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)

  const res = await fetch(`${BASE}/requests/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(form),
  })
  if (!res.ok) throw new Error('Request creation failed')

  return res.json()
}

export const getRequests = async (): Promise<SimplifiedRequest[]> => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)

  const res = await fetch(`${BASE}/requests`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch requests')

  return res.json()
}

export const getRequest = async (id: number): Promise<Request> => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)

  const res = await fetch(`${BASE}/requests/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch request details')

  return res.json()
}

export const geocodeAddress = async (query: string): Promise<Coordinates | null> => {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&limit=1`,
  )
  if (!res.ok) throw new Error('Geocoding failed')

  const data = await res.json()
  const feature = data.features?.at(0)
  if (!feature) return null

  const [longitude, latitude] = feature.center
  return { latitude, longitude }
}
