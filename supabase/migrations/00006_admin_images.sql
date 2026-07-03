-- Create admin-images storage bucket (5 MB limit, images only)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('admin-images', 'admin-images', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: allow public reads
CREATE POLICY "admin_images_select_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'admin-images');

-- Storage RLS: allow authenticated uploads
CREATE POLICY "admin_images_insert_authenticated" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'admin-images' AND auth.role() = 'authenticated');

-- Storage RLS: allow users to update own files
CREATE POLICY "admin_images_update_own" ON storage.objects
  FOR UPDATE USING (bucket_id = 'admin-images' AND auth.uid() = owner);

-- Storage RLS: allow users to delete own files
CREATE POLICY "admin_images_delete_own" ON storage.objects
  FOR DELETE USING (bucket_id = 'admin-images' AND auth.uid() = owner);
