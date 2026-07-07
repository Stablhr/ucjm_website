import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminRoute from './components/layout/AdminRoute'
import AdminLayout from './features/admin/AdminLayout'

const Home = lazy(() => import('./pages/Home'))
const Bible = lazy(() => import('./pages/Bible'))
const Songs = lazy(() => import('./pages/Songs'))
const GuidePlansPage = lazy(() => import('./pages/GuidePlansPage'))
const GuidePlanDetailPage = lazy(() => import('./pages/GuidePlanDetailPage'))
const GuideDayPage = lazy(() => import('./pages/GuideDayPage'))
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Profile = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminDashboard = lazy(() => import('./features/admin/AdminDashboard'))
const AdminAnnouncements = lazy(() => import('./features/admin/AdminAnnouncements'))
const AdminEvents = lazy(() => import('./features/admin/AdminEvents'))
const AdminPhotos = lazy(() => import('./features/admin/AdminPhotos'))

function SuspenseWrapper({ children }) {
  return (
    <Suspense fallback={
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-slate">Loading...</p>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SuspenseWrapper><Home /></SuspenseWrapper>} />
        <Route path="/bible" element={<SuspenseWrapper><Bible /></SuspenseWrapper>} />
        <Route path="/songs" element={<SuspenseWrapper><Songs /></SuspenseWrapper>} />
        <Route path="/guide" element={<SuspenseWrapper><GuidePlansPage /></SuspenseWrapper>} />
        <Route path="/guide/:planId" element={<SuspenseWrapper><GuidePlanDetailPage /></SuspenseWrapper>} />
        <Route path="/guide/:planId/:day" element={<SuspenseWrapper><GuideDayPage /></SuspenseWrapper>} />
        <Route path="/login" element={<SuspenseWrapper><Login /></SuspenseWrapper>} />
        <Route path="/signup" element={<SuspenseWrapper><SignUp /></SuspenseWrapper>} />
        <Route path="/forgot-password" element={<SuspenseWrapper><ForgotPassword /></SuspenseWrapper>} />
        <Route path="/profile" element={<SuspenseWrapper><Profile /></SuspenseWrapper>} />
        <Route path="*" element={<SuspenseWrapper><NotFound /></SuspenseWrapper>} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<SuspenseWrapper><AdminDashboard /></SuspenseWrapper>} />
          <Route path="/admin/announcements" element={<SuspenseWrapper><AdminAnnouncements /></SuspenseWrapper>} />
          <Route path="/admin/events" element={<SuspenseWrapper><AdminEvents /></SuspenseWrapper>} />
          <Route path="/admin/photos" element={<SuspenseWrapper><AdminPhotos /></SuspenseWrapper>} />
        </Route>
      </Route>
    </Routes>
  )
}
