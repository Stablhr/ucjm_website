import { useState } from 'react'
import { Music, ListMusic } from 'lucide-react'
import useSongsStore from '../features/songs/songsStore'
import SongList from '../features/songs/SongList'
import SongDetail from '../features/songs/SongDetail'
import PlaylistManager from '../features/songs/PlaylistManager'
import PlaylistDetail from '../features/songs/PlaylistDetail'

const TABS = [
  { id: 'library', label: 'Song Library', icon: Music },
  { id: 'playlists', label: 'Playlists', icon: ListMusic },
]

export default function Songs() {
  const [activeTab, setActiveTab] = useState('library')
  const [selectedSong, setSelectedSong] = useState(null)
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)

  const setTransposeOffset = useSongsStore((s) => s.setTransposeOffset)

  const handleSelectSong = (song) => {
    setTransposeOffset(0)
    setSelectedSong(song)
  }

  const handleBackToLibrary = () => {
    setSelectedSong(null)
  }

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist)
  }

  const handleBackToPlaylists = () => {
    setSelectedPlaylist(null)
  }

  // Song detail view
  if (selectedSong) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SongDetail song={selectedSong} onBack={handleBackToLibrary} />
        </div>
      </section>
    )
  }

  // Playlist detail view
  if (selectedPlaylist) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <PlaylistDetail
            playlist={selectedPlaylist}
            onBack={handleBackToPlaylists}
          />
        </div>
      </section>
    )
  }

  // Main view: tabs
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-charcoal">
            Songs
          </h1>
          <p className="mt-2 text-slate">
            Browse worship songs and manage Sunday service playlists.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 border-b border-divider">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-slate hover:border-divider hover:text-charcoal'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        {activeTab === 'library' ? (
          <SongList onSelectSong={handleSelectSong} />
        ) : (
          <PlaylistManager onSelectPlaylist={handleSelectPlaylist} />
        )}
      </div>
    </section>
  )
}
