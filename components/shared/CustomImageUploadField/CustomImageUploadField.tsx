'use client';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import React from 'react';

const CustomImageUploadField = ({
  setSelectedFile,
  setImagePreview,
  imageRef,
  className,
}: {
  setSelectedFile: Function;
  setImagePreview: Function;
  imageRef: React.MutableRefObject<HTMLInputElement | null>;
  className?: string | null | undefined;
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5242880) {
        // 5MB in bytes
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 5MB',
          variant: 'destructive',
          duration: 2000,
        });
        if (imageRef.current) {
          imageRef.current.value = '';
        }
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Input
      type='file'
      ref={imageRef}
      name='image_url'
      onChange={handleImageChange}
      placeholder='Upload your image'
      accept='image/jpeg, image/png, image/bmp, image/gif, image/webp'
      className={cn(
        `cursor-pointer  border border-natural-5/60 bg-natural-2 px-5 py-3 text-[13px] font-bold text-natural-8 outline-none file:mr-4 file:rounded-lg file:border-none file:bg-primary/10 file:px-4 file:py-2 file:text-primary hover:cursor-pointer hover:file:bg-primary/20 dark:border-natural-8 dark:bg-darkbg-2 dark:text-white dark:focus:ring-1 dark:focus:ring-primary dark:active:ring-1 dark:active:ring-primary`,
        className,
      )}
    />
  );
};

export default CustomImageUploadField;
