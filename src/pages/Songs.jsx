import { useState } from 'react'
import { Music, ListMusic, Plus } from 'lucide-react'
import SEO from '../components/ui/SEO'
import useSongsStore from '../features/songs/songsStore'
import SongList from '../features/songs/SongList'
import SongDetail from '../features/songs/SongDetail'
import AddSongModal from '../features/songs/AddSongModal'
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
  const [showAddSong, setShowAddSong] = useState(false)

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

  if (selectedSong) {
    return (
      <>
        <SEO title={selectedSong.title} />
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <SongDetail song={selectedSong} onBack={handleBackToLibrary} />
          </div>
        </section>
      </>
    )
  }

  if (selectedPlaylist) {
    return (
      <>
        <SEO title={selectedPlaylist.title} />
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <PlaylistDetail
              playlist={selectedPlaylist}
              onBack={handleBackToPlaylists}
            />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO title="Songs" />
      <section className="">
        {/* Tabs + Add Song button */}
        <div className="border-b border-divider bg-ivory/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl items-end justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1">
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
            {activeTab === 'library' && (
              <button
                onClick={() => setShowAddSong(true)}
                className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition hover:bg-accent/90 active:scale-[0.97]"
              >
                <Plus size={14} />
                Add Song
              </button>
            )}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'library' ? (
          <SongList onSelectSong={handleSelectSong} />
        ) : (
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <PlaylistManager onSelectPlaylist={handleSelectPlaylist} />
          </div>
        )}
      </section>

      {showAddSong && <AddSongModal onClose={() => setShowAddSong(false)} />}
    </>
  )
}
