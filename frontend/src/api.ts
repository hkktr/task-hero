const BASE = '/api'

export async function register(nickname: string, emailAddress: string, password: string) {
  const res = await fetch(`${BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nickname, emailAddress, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message ?? 'Registration failed')
  }
}

export async function signIn(nickname: string, password: string): Promise<string> {
  const res = await fetch(`${BASE}/sign-in`, {
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

export async function getMe(): Promise<{ id: number; emailAddress: string; nickname: string }> {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Unauthorized')
  return res.json()
}

export function saveToken(token: string) {
  localStorage.setItem('token', token)
}

export function clearToken() {
  localStorage.removeItem('token')
}

export function getToken() {
  return localStorage.getItem('token')
}
