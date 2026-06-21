import { KeyRound, Cross, Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuthStore from '../store/authStore'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const resetPassword = useAuthStore((s) => s.resetPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
      toast.success('Reset link sent!')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/60 to-charcoal/80 z-10" />
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-12 text-center text-white">
          <Cross size={48} className="mb-6 text-white/30" />
          <h2 className="font-display text-4xl font-bold">Forgot Password?</h2>
          <p className="mt-3 max-w-sm text-white/70">
            "Call to me and I will answer you and tell you great and
            unsearchable things you do not know."
          </p>
          <p className="mt-2 font-mono text-xs text-white/40">Jeremiah 33:3</p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <div className="w-full max-w-sm animate-fade-up">
          <div className="mb-2 flex items-center gap-3 text-accent">
            <div className="rounded-sm bg-accent/10 p-2">
              <KeyRound size={20} />
            </div>
            <h1 className="font-display text-3xl font-bold text-charcoal">
              Reset Password
            </h1>
          </div>
          <p className="ml-12 text-sm text-slate">
            Enter your email to receive a reset link
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="group relative">
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate transition-colors group-focus-within:text-accent" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  disabled={sent}
                  className="w-full rounded-sm border border-divider py-3 pl-10 pr-3 text-sm text-charcoal outline-none placeholder:text-slate transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20 disabled:opacity-60"
                />
              </div>
            </div>

            {sent ? (
              <div className="flex items-center gap-2 rounded-sm border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                <CheckCircle size={16} />
                Reset link sent! Check your email.
              </div>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-sm bg-accent py-3 text-sm font-medium text-white transition hover:bg-accent/90 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-slate">
            <Link to="/login" className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:underline">
              <ArrowLeft size={14} />
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
