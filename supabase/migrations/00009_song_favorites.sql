-- Song favorites: users can favorite songs for quick access
CREATE TABLE IF NOT EXISTS song_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  song_id UUID NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, song_id)
);

ALTER TABLE song_favorites ENABLE ROW LEVEL SECURITY;

-- Users can read their own favorites
CREATE POLICY "Users can read their own favorites"
  ON song_favorites FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can read all favorites (for analytics / counts)
CREATE POLICY "Admins can read all favorites"
  ON song_favorites FOR SELECT
  USING (public.is_admin());

-- Users can insert their own favorites
CREATE POLICY "Users can insert their own favorites"
  ON song_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own favorites
CREATE POLICY "Users can delete their own favorites"
  ON song_favorites FOR DELETE
  USING (auth.uid() = user_id);
