import { User, Mail, Shield, Save, LogOut, Cross } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuthStore from '../store/authStore'

export default function Profile() {
  const user = useAuthStore((s) => s.user)
  const profile = useAuthStore((s) => s.profile)
  const signOut = useAuthStore((s) => s.signOut)
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    setFullName(profile?.full_name || '')
    setLoading(false)
  }, [user, profile, navigate])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile({ full_name: fullName })
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (loading || !user) return null

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-accent/60 to-charcoal/80" />
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-12 text-center text-white">
          <Cross size={48} className="mb-6 text-white/30" />
          <h2 className="font-display text-4xl font-bold">UCJM Church</h2>
          <p className="mt-3 max-w-sm text-white/70">
            "For where two or three gather in my name, there am I with them."
          </p>
          <p className="mt-2 font-mono text-xs text-white/40">Matthew 18:20</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <div className="w-full max-w-sm animate-fade-up">
          <div className="mb-2 flex items-center gap-3 text-accent">
            <div className="rounded-lg bg-accent/10 p-2">
              <User size={20} />
            </div>
            <h1 className="font-display text-3xl font-bold text-charcoal">
              Profile
            </h1>
          </div>
          <p className="ml-12 text-sm text-slate">Manage your account</p>

          <form className="mt-8 space-y-5" onSubmit={handleSave}>
            <div className="group relative">
              <label htmlFor="fullName" className="sr-only">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate transition-colors group-focus-within:text-accent" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full rounded-lg border border-divider py-3 pl-10 pr-3 text-sm text-charcoal outline-none placeholder:text-slate transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
                />
              </div>
            </div>

            <div className="group relative">
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
                <input
                  id="email"
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-divider bg-ivory/50 py-3 pl-10 pr-3 text-sm text-slate outline-none"
                />
              </div>
            </div>

            <div className="group relative">
              <label htmlFor="role" className="sr-only">Role</label>
              <div className="relative">
                <Shield size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
                <input
                  id="role"
                  type="text"
                  value={profile?.role || 'member'}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-divider bg-ivory/50 py-3 pl-10 pr-3 text-sm capitalize text-slate outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-medium text-white transition hover:bg-accent/90 active:scale-[0.98] disabled:opacity-60"
            >
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>

          <div className="mt-8 border-t border-divider pt-6">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-divider py-3 text-sm font-medium text-slate transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-[0.98]"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
