import { useState, useEffect, useCallback } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import Loader from '../../components/ui/Loader'

export default function GuideAudioButton({ planTitle, dayTitle, verseRef, reflection, prayer }) {
  const [speaking, setSpeaking] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    setSupported('speechSynthesis' in window)
  }, [])

  const handleToggle = useCallback(() => {
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    const text = [
      `${planTitle} — ${dayTitle}.`,
      `Scripture: ${verseRef}.`,
      reflection,
      `Let us pray. ${prayer}`,
    ].join(' ')

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }, [speaking, planTitle, dayTitle, verseRef, reflection, prayer])

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  if (!supported) return null

  return (
    <button
      onClick={handleToggle}
      aria-label={speaking ? 'Stop reading aloud' : 'Read aloud'}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
        speaking
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-divider text-slate hover:border-accent/30 hover:text-accent'
      }`}
    >
      {speaking ? (
        <>
          <Loader size={16} speed={2} />
          Playing...
        </>
      ) : (
        <>
          <Volume2 size={14} />
          Read Aloud
        </>
      )}
    </button>
  )
}
