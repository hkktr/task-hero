import { createContext, useContext, useState, useEffect, type ReactNode, useMemo } from 'react'
import { jwtDecode } from 'jwt-decode'
import type { UserRole } from '../enums/user-role'

export interface JwtUser {
  sub: string
  name: string
  email: string
  role?: UserRole
  nbf: number
  exp: number
  iat: number
  iss: string
  aud: string
}

interface AuthCtx {
  token: string | null
  user: JwtUser | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthCtx>({
  token: null,
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
})

export const TOKEN_STORAGE_KEY = 'token'

const getInitialToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (!token) return null

  try {
    const decoded = jwtDecode<JwtUser>(token)
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      return null
    }
    return token
  } catch {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    return null
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => getInitialToken())
  const user = useMemo(() => {
    if (!token) return null
    try {
      return jwtDecode<JwtUser>(token)
    } catch {
      return null
    }
  }, [token])

  const login = (token: string) => {
    setToken(token)
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  }

  useEffect(() => {
    if (!token || !user) return

    const timeUntilExpiry = user.exp * 1000 - Date.now()
    const timer = setTimeout(() => logout(), Math.max(0, timeUntilExpiry))

    return () => clearTimeout(timer)
  }, [token, user])

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
