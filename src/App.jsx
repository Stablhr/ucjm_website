import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Bible from './pages/Bible'
import Songs from './pages/Songs'
import GuidePlansPage from './pages/GuidePlansPage'
import GuidePlanDetailPage from './pages/GuidePlanDetailPage'
import GuideDayPage from './pages/GuideDayPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import AdminRoute from './components/layout/AdminRoute'
import AdminLayout from './features/admin/AdminLayout'
import AdminDashboard from './features/admin/AdminDashboard'
import AdminAnnouncements from './features/admin/AdminAnnouncements'
import AdminEvents from './features/admin/AdminEvents'
import AdminPhotos from './features/admin/AdminPhotos'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bible" element={<Bible />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/guide" element={<GuidePlansPage />} />
        <Route path="/guide/:planId" element={<GuidePlanDetailPage />} />
        <Route path="/guide/:planId/:day" element={<GuideDayPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin routes — protected by AdminRoute */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/photos" element={<AdminPhotos />} />
        </Route>
      </Route>
    </Routes>
  )
}
