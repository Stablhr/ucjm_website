import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Bible from './pages/Bible'
import Songs from './pages/Songs'
import Guide from './pages/Guide'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import AdminRoute from './components/layout/AdminRoute'
import AdminLayout from './features/admin/AdminLayout'
import AdminDashboard from './features/admin/AdminDashboard'
import AdminAnnouncements from './features/admin/AdminAnnouncements'
import AdminAnnouncementForm from './features/admin/AdminAnnouncementForm'
import AdminEvents from './features/admin/AdminEvents'
import AdminEventForm from './features/admin/AdminEventForm'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bible" element={<Bible />} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin routes — protected by AdminRoute */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/announcements/new" element={<AdminAnnouncementForm />} />
          <Route path="/admin/announcements/:id/edit" element={<AdminAnnouncementForm />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/events/new" element={<AdminEventForm />} />
          <Route path="/admin/events/:id/edit" element={<AdminEventForm />} />
        </Route>
      </Route>
    </Routes>
  )
}
