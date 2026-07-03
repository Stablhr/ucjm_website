export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-divider ${className}`}
    />
  )
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`rounded-lg border border-divider p-6 ${className}`}>
      <Skeleton className="mb-3 h-40 w-full" />
      <Skeleton className="mb-2 h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

export function SkeletonLine({ className = '' }) {
  return <Skeleton className={`h-4 w-full ${className}`} />
}

export function SkeletonAvatar({ className = '' }) {
  return <Skeleton className={`h-10 w-10 rounded-full ${className}`} />
}
