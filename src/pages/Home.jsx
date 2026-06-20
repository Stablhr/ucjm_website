export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-4 text-center text-white">
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
            Welcome to UCJM Church
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            A community of faith, hope, and love.
          </p>
          <a
            href="/signup"
            className="mt-8 inline-block bg-accent px-8 py-3 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            Join Us
          </a>
        </div>
      </section>

      {/* Daily Verse Placeholder */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold text-charcoal">
              Verse of the Day
            </h2>
            <div className="mt-8 rounded-sm border border-divider p-8">
              <p className="font-display text-xl leading-relaxed text-charcoal">
                "For God so loved the world that he gave his one and only Son,
                that whoever believes in him shall not perish but have eternal
                life."
              </p>
              <p className="mt-4 font-mono text-sm text-slate">John 3:16</p>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Placeholder */}
      <section className="border-t border-divider py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-charcoal">
            Announcements
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-sm border border-divider p-6 transition hover:-translate-y-1"
              >
                <div className="mb-3 h-40 bg-divider" />
                <h3 className="font-display text-xl font-bold text-charcoal">
                  Announcement Title {i}
                </h3>
                <p className="mt-2 text-sm text-slate">
                  Announcement description goes here.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-accent py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-white">
            Join Our Community
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/80">
            Become part of our church family.
          </p>
          <a
            href="/signup"
            className="mt-8 inline-block border border-white px-8 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-accent"
          >
            Sign Up Today
          </a>
        </div>
      </section>
    </>
  )
}
