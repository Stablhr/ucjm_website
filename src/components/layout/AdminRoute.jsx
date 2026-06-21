import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

export default function AdminRoute() {
  const user = useAuthStore((s) => s.user)
  const profile = useAuthStore((s) => s.profile)
  const loading = useAuthStore((s) => s.loading)

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (profile?.role !== 'admin') return <Navigate to="/" replace />

  return <Outlet />
}
