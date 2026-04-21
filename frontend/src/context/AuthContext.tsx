import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'

export interface JwtUser {
  sub: string
  name: string
  email: string
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

const TOKEN_STORAGE_KEY = 'token'

export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => getToken())
  const [user, setUser] = useState<JwtUser | null>(null)

  useEffect(() => {
    if (!token) {
      setUser(null)
      return
    }

    let user: JwtUser
    try {
      user = jwtDecode<JwtUser>(token)
    } catch (error) {
      console.error('Invalid token:', error)
      logout()
      return
    }

    if (user.exp * 1000 < Date.now()) {
      logout()
      return
    }

    setUser(user)
  }, [token])

  const login = (token: string) => {
    setToken(token)
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
