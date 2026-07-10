import toast from 'react-hot-toast'

const SEEN_ANNOUNCEMENTS_KEY = 'ucjm-seen-announcements'
const REMINDED_EVENTS_KEY = 'ucjm-reminded-events'

function loadJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}')
  } catch {
    return {}
  }
}

function saveJson(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function requestNotificationPermission() {
  if (!('Notification' in window)) return Promise.resolve('denied')
  if (Notification.permission === 'granted') return Promise.resolve('granted')
  if (Notification.permission === 'denied') return Promise.resolve('denied')
  return Notification.requestPermission()
}

function fireBrowserNotification(title, body, tag) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  try {
    new Notification(title, {
      body,
      icon: '/images/logo.jpg',
      tag,
    })
  } catch {}
}

export function checkAndNotifyAnnouncements(announcements) {
  if (!announcements || announcements.length === 0) return

  const seen = loadJson(SEEN_ANNOUNCEMENTS_KEY)
  const lastSeenAt = seen.lastSeenAt || null
  const latest = announcements[0]

  if (!latest) return

  const postedAt = new Date(latest.posted_at).getTime()
  if (lastSeenAt && postedAt <= lastSeenAt) return

  fireBrowserNotification(
    '📢 New Announcement',
    latest.title,
    `announcement-${latest.id}`
  )

  toast.custom((t) => (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm rounded-lg border border-divider bg-surface p-4 shadow-lg`}>
      <p className="text-xs font-medium uppercase tracking-wider text-accent mb-1">New Announcement</p>
      <p className="text-sm font-bold text-charcoal">{latest.title}</p>
      {latest.description && (
        <p className="mt-1 text-xs text-slate line-clamp-2">{latest.description}</p>
      )}
    </div>
  ), { duration: 6000 })

  saveJson(SEEN_ANNOUNCEMENTS_KEY, { lastSeenAt: Date.now() })
}

export function checkAndNotifyEvents(events) {
  if (!events || events.length === 0) return

  const reminded = loadJson(REMINDED_EVENTS_KEY)
  const now = Date.now()
  const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000

  events.forEach((event) => {
    const eventDate = new Date(event.date).getTime()
    const diff = eventDate - now

    if (diff <= 0 || diff > TWO_DAYS_MS) return
    if (reminded[event.id]) return

    fireBrowserNotification(
      '📅 Upcoming Event',
      `${event.title} — ${event.date}`,
      `event-${event.id}`
    )

    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm rounded-lg border border-divider bg-surface p-4 shadow-lg`}>
        <p className="text-xs font-medium uppercase tracking-wider text-accent-warm mb-1">Upcoming Event</p>
        <p className="text-sm font-bold text-charcoal">{event.title}</p>
        <p className="mt-1 text-xs text-slate">{event.date}{event.time ? ` • ${event.time}` : ''}</p>
      </div>
    ), { duration: 6000 })

    reminded[event.id] = Date.now()
  })

  saveJson(REMINDED_EVENTS_KEY, reminded)
}
