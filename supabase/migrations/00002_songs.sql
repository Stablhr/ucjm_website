CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist TEXT NOT NULL DEFAULT '',
  key TEXT NOT NULL DEFAULT 'G',
  category TEXT NOT NULL DEFAULT 'Worship',
  language TEXT NOT NULL DEFAULT 'English',
  lyrics_with_chords TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_name TEXT NOT NULL DEFAULT 'Anonymous',
  title TEXT NOT NULL,
  service_date DATE,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE playlist_songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id UUID NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  song_id UUID NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  key_override TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(playlist_id, position)
);

ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

ALTER TABLE songs ADD COLUMN IF NOT EXISTS youtube_url TEXT DEFAULT '';
ALTER TABLE songs ADD COLUMN IF NOT EXISTS album TEXT DEFAULT '';
ALTER TABLE songs ADD COLUMN IF NOT EXISTS album_year INTEGER;
ALTER TABLE songs ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';
ALTER TABLE songs ADD COLUMN IF NOT EXISTS image_color TEXT DEFAULT '';

CREATE POLICY "Songs are public" ON songs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Playlists are public" ON playlists FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Playlist songs are public" ON playlist_songs FOR ALL USING (true) WITH CHECK (true);
