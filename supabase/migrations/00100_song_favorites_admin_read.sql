-- Patch: allow admins to read all favorites (for analytics/counts)
-- Only applies if the policy doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'song_favorites' AND policyname = 'Admins can read all favorites'
  ) THEN
    EXECUTE 'CREATE POLICY "Admins can read all favorites"
      ON song_favorites FOR SELECT
      USING (public.is_admin())';
  END IF;
END $$;
