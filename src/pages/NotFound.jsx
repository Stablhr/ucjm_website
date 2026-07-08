import { Link } from 'react-router-dom'
import { Cross } from 'lucide-react'
import SEO from '../components/ui/SEO'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" />
      <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 text-center">
        <div className="text-accent-warm">
          <Cross size={64} className="mx-auto mb-6 opacity-30" />
        </div>
        <h1 className="font-display text-7xl font-semibold text-charcoal">404</h1>
        <p className="mt-4 text-lg text-slate">
          Page not found
        </p>
        <p className="mt-2 max-w-md text-sm text-slate/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="mt-8">
          <Button>Go Home</Button>
        </Link>
      </div>
    </>
  )
}
