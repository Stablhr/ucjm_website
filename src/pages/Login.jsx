import { LogIn, Cross } from 'lucide-react'

export default function Login() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Cross size={64} className="text-white/20" />
        </div>
      </div>
      <div className="flex w-full animate-fade-up items-center justify-center px-4 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-2 flex items-center gap-2 text-accent">
            <LogIn size={20} />
            <h1 className="font-display text-3xl font-bold text-charcoal">
              Welcome Back
            </h1>
          </div>
          <p className="text-sm text-slate">Sign in to your account</p>
          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="group relative">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full border-b border-divider py-3 text-sm text-charcoal outline-none placeholder:text-slate transition-colors focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full border-b border-divider py-3 text-sm text-charcoal outline-none placeholder:text-slate transition-colors focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent py-3 text-sm font-medium text-white transition hover:bg-accent/90 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate">
            <a href="/forgot-password" className="transition-colors hover:text-accent">
              Forgot password?
            </a>
          </p>
          <p className="mt-4 text-center text-sm text-slate">
            Don't have an account?{' '}
            <a href="/signup" className="text-accent transition-colors hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
