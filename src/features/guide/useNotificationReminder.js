import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'ucjm-reminder-time'

function loadReminderTime() {
  try {
    return localStorage.getItem(STORAGE_KEY) || null
  } catch {
    return null
  }
}

function saveReminderTime(time) {
  try {
    if (time) localStorage.setItem(STORAGE_KEY, time)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

export default function useNotificationReminder() {
  const [permission, setPermission] = useState(Notification?.permission || 'default')
  const [reminderTime, setReminderTimeState] = useState(loadReminderTime)

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return 'denied'
    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [])

  const setReminderTime = useCallback((time) => {
    setReminderTimeState(time)
    saveReminderTime(time)
  }, [])

  const clearReminder = useCallback(() => {
    setReminderTime(null)
    saveReminderTime(null)
  }, [])

  useEffect(() => {
    if (!reminderTime || permission !== 'granted') return

    const check = () => {
      const now = new Date()
      const current = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

      if (current === reminderTime && 'Notification' in window) {
        new Notification('📖 Daily Reading Reminder', {
          body: 'Time for your daily Scripture reading!',
          icon: '/images/logo.jpg',
        })
      }
    }

    check()
    const interval = setInterval(check, 30000)
    return () => clearInterval(interval)
  }, [reminderTime, permission])

  return {
    permission,
    reminderTime,
    requestPermission,
    setReminderTime,
    clearReminder,
  }
}
