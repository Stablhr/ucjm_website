import { LogIn, Cross, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import SEO from '../components/ui/SEO'
import Button from '../components/ui/Button'
import useAuthStore from '../store/authStore'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const signIn = useAuthStore((s) => s.signIn)
  const signInWithOAuth = useAuthStore((s) => s.signInWithOAuth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn(email, password)
      toast.success('Welcome back!')
      navigate('/guide')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEO title="Sign In" />
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
          <h2 className="font-display text-4xl font-semibold">UCJM Church</h2>
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
              <LogIn size={20} />
            </div>
            <h1 className="font-display text-3xl font-semibold text-charcoal">
              Welcome Back
            </h1>
          </div>
          <p className="ml-12 text-sm text-slate">Sign in to your account</p>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => signInWithOAuth('google')}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-divider px-4 py-2.5 text-sm text-slate transition hover:border-accent/30 hover:bg-accent/5 hover:text-charcoal"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => signInWithOAuth('facebook', { scopes: 'public_profile' })}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-divider px-4 py-2.5 text-sm text-slate transition hover:border-accent/30 hover:bg-accent/5 hover:text-charcoal"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-divider" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-ivory px-4 text-slate">or continue with email</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
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
                  className="w-full rounded-lg border border-divider py-3 pl-10 pr-3 text-sm text-charcoal outline-none placeholder:text-slate transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
                />
              </div>
            </div>
            <div className="group relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate transition-colors group-focus-within:text-accent" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full rounded-lg border border-divider py-3 pl-10 pr-10 text-sm text-charcoal outline-none placeholder:text-slate transition-colors focus:border-accent focus:ring-1 focus:ring-accent/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate">
                <input type="checkbox" className="h-3.5 w-3.5 accent-accent" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-accent transition-colors hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={loading} className="w-full justify-center py-3">
              Sign In
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-accent transition-colors hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}
