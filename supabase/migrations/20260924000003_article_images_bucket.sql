-- Article hero images uploaded from the /admin editor.
-- Public-read bucket so article images render for all visitors;
-- only the authenticated editor can upload, overwrite, or remove files.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'article-images',
  'article-images',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do nothing;

create policy "article images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'article-images');

create policy "authenticated users can upload article images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'article-images');

create policy "authenticated users can update article images"
  on storage.objects for update to authenticated
  using (bucket_id = 'article-images')
  with check (bucket_id = 'article-images');

create policy "authenticated users can delete article images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'article-images');
