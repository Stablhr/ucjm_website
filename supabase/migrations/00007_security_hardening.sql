-- ============================================================
-- Security Hardening Migration
-- Fixes open RLS policies and adds security restrictions
-- ============================================================

-- 1. Fix Songs table RLS - Restrict write access to authenticated users
DROP POLICY IF EXISTS "Songs are public" ON songs;

-- Songs: Read is public, Write requires authentication
CREATE POLICY "songs_select_public" ON songs
  FOR SELECT USING (true);

CREATE POLICY "songs_insert_auth" ON songs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "songs_update_auth" ON songs
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "songs_delete_auth" ON songs
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- 2. Fix Playlists table RLS - Restrict write access to authenticated users
DROP POLICY IF EXISTS "Playlists are public" ON playlists;

-- Playlists: Read is public, Write requires authentication
CREATE POLICY "playlists_select_public" ON playlists
  FOR SELECT USING (true);

CREATE POLICY "playlists_insert_auth" ON playlists
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "playlists_update_auth" ON playlists
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "playlists_delete_auth" ON playlists
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- 3. Fix Playlist_songs table RLS - Restrict write access to authenticated users
DROP POLICY IF EXISTS "Playlist songs are public" ON playlist_songs;

-- Playlist_songs: Read is public, Write requires authentication
CREATE POLICY "playlist_songs_select_public" ON playlist_songs
  FOR SELECT USING (true);

CREATE POLICY "playlist_songs_insert_auth" ON playlist_songs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "playlist_songs_update_auth" ON playlist_songs
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "playlist_songs_delete_auth" ON playlist_songs
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- 4. Add input validation constraints (defense in depth)
ALTER TABLE songs ADD CONSTRAINT songs_title_length CHECK (char_length(title) <= 500);
ALTER TABLE songs ADD CONSTRAINT songs_artist_length CHECK (char_length(artist) <= 300);
ALTER TABLE songs ADD CONSTRAINT songs_lyrics_length CHECK (char_length(lyrics_with_chords) <= 50000);

ALTER TABLE playlists ADD CONSTRAINT playlists_title_length CHECK (char_length(title) <= 300);
ALTER TABLE playlists ADD CONSTRAINT playlists_notes_length CHECK (char_length(notes) <= 5000);

-- 5. Add audit logging table for sensitive operations
CREATE TABLE IF NOT EXISTS audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "audit_log_select_admin" ON audit_log
  FOR SELECT USING (public.is_admin());

-- System can insert audit logs
CREATE POLICY "audit_log_insert_system" ON audit_log
  FOR INSERT WITH CHECK (true);

-- 6. Create audit trigger function
CREATE OR REPLACE FUNCTION public.log_audit_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (user_id, action, table_name, record_id, new_data)
    VALUES (auth.uid(), 'INSERT', TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (user_id, action, table_name, record_id, old_data, new_data)
    VALUES (auth.uid(), 'UPDATE', TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (user_id, action, table_name, record_id, old_data)
    VALUES (auth.uid(), 'DELETE', TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
    RETURN OLD;
  END IF;
END;
$$;

-- 7. Add audit triggers to sensitive tables
CREATE OR TRIGGER audit_announcements
  AFTER INSERT OR UPDATE OR DELETE ON announcements
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

CREATE TRIGGER audit_events
  AFTER INSERT OR UPDATE OR DELETE ON events
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

CREATE TRIGGER audit_photos
  AFTER INSERT OR UPDATE OR DELETE ON photos
  FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- Note: songs/playlists audit triggers commented out for now due to high volume
-- Uncomment if needed: CREATE TRIGGER audit_songs AFTER INSERT OR UPDATE OR DELETE ON songs FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- ============================================================
-- Security improvements applied:
-- 1. Songs/playlists now require authentication for write operations
-- 2. Input length constraints added for defense in depth
-- 3. Audit logging for admin operations (announcements, events, photos)
-- 4. Read access remains public for songs/playlists (intended behavior)
-- ============================================================