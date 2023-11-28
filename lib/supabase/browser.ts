'use client';

import { createBrowserClient } from '@supabase/ssr';
import { v4 as uuidv4 } from 'uuid';

export default function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export const uploadImage = async (
  file: File,
  filenamePrefix: string,
  bucket: string,
) => {
  if (file) {
    const supabase = createSupabaseBrowserClient();
    const filename = `${filenamePrefix}-${uuidv4()}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filename, file);

    if (error) {
      console.error('Upload error:', error.message);
      throw new Error(error.message);
    }

    // Use the uploaded file's URL
    return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${bucket}/${filename}`;
  }
  return null;
};
