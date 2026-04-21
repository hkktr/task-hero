import { getToken } from './context/AuthContext'

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
  const res = await fetch(`${BASE}/users/me`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  })
  if (!res.ok) throw new Error('Unauthorized')
  return res.json()
}
