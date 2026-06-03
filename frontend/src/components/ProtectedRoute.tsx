import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { UserRole } from '../enums/user-role'

interface ProtectedRouteProps {
  requiredRole?: UserRole
}

export default function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/map" replace />
  }

  return <Outlet />
}
