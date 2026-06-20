export default function ForgotPassword() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="hidden w-1/2 lg:block">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-bold text-charcoal">
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-slate">
            Enter your email to receive a reset link
          </p>
          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full border-b border-divider py-3 text-sm text-charcoal outline-none placeholder:text-slate focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent py-3 text-sm font-medium text-white transition hover:bg-accent/90"
            >
              Send Reset Link
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate">
            <a href="/login" className="text-accent hover:underline">
              Back to sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
