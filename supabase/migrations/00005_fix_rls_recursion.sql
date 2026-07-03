-- Fix infinite recursion in RLS policies caused by querying profiles inside profiles policy
-- https://supabase.com/docs/guides/auth/row-level-security#use-security-definer-functions

-- Create a SECURITY DEFINER function to check admin role (bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin');
$$;

-- Fix profiles_select_own policy
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (
    auth.uid() = id OR public.is_admin()
  );

-- Fix announcements admin policies
DROP POLICY IF EXISTS "announcements_insert_admin" ON announcements;
CREATE POLICY "announcements_insert_admin" ON announcements
  FOR INSERT WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "announcements_update_admin" ON announcements;
CREATE POLICY "announcements_update_admin" ON announcements
  FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "announcements_delete_admin" ON announcements;
CREATE POLICY "announcements_delete_admin" ON announcements
  FOR DELETE USING (public.is_admin());

-- Fix events admin policies
DROP POLICY IF EXISTS "events_insert_admin" ON events;
CREATE POLICY "events_insert_admin" ON events
  FOR INSERT WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "events_update_admin" ON events;
CREATE POLICY "events_update_admin" ON events
  FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "events_delete_admin" ON events;
CREATE POLICY "events_delete_admin" ON events
  FOR DELETE USING (public.is_admin());

-- Fix photos admin policies
DROP POLICY IF EXISTS "photos_insert_admin" ON photos;
CREATE POLICY "photos_insert_admin" ON photos
  FOR INSERT WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "photos_update_admin" ON photos;
CREATE POLICY "photos_update_admin" ON photos
  FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "photos_delete_admin" ON photos;
CREATE POLICY "photos_delete_admin" ON photos
  FOR DELETE USING (public.is_admin());
