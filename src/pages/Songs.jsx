import { useState } from 'react'
import { ListMusic, ArrowLeft } from 'lucide-react'
import SEO from '../components/ui/SEO'
import useSongsStore from '../features/songs/songsStore'
import SongList from '../features/songs/SongList'
import SongDetail from '../features/songs/SongDetail'
import PlaylistManager from '../features/songs/PlaylistManager'
import PlaylistDetail from '../features/songs/PlaylistDetail'

export default function Songs() {
  const [showPlaylists, setShowPlaylists] = useState(false)
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

  if (showPlaylists) {
    return (
      <>
        <SEO title="Playlists" />
        <section>
          <div className="border-b border-divider bg-ivory/80 backdrop-blur-sm">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <button
                onClick={() => setShowPlaylists(false)}
                className="flex items-center gap-1.5 py-3 text-sm text-slate transition-colors hover:text-charcoal"
              >
                <ArrowLeft size={16} />
                Back to Song Library
              </button>
            </div>
          </div>
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <PlaylistManager onSelectPlaylist={handleSelectPlaylist} />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO title="Songs" />
      <section>
        <SongList
          onSelectSong={handleSelectSong}
          onShowPlaylists={() => setShowPlaylists(true)}
        />
      </section>
    </>
  )
}
