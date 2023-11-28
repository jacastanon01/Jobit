'use client';

import { FaRegTrashCan } from 'react-icons/fa6';
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';
import { Button } from '../ui/button';

import createSupabaseBrowserClient from '@/lib/supabase/browser';
import { removeUserObject } from '@/lib/supabase/actions';

const DeleteEducationButton = ({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl?: string | null;
}) => {
  const supabase = createSupabaseBrowserClient();
  const handleDelete = async () => {
    removeUserObject(id, 'educations');
    if (imageUrl) {
      const img = imageUrl.split('/').pop();
      await supabase.storage.from('educations').remove([img!]);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className='mt-6 flex items-center gap-2 rounded-lg bg-natural-5 p-2 font-semibold text-natural-7 transition-all hover:bg-red-500 hover:text-white dark:bg-natural-8 dark:text-white dark:hover:bg-red-500'>
        <FaRegTrashCan />
      </DialogTrigger>
      <DialogContent className='dark:border-darkbg-2 dark:bg-darkbg-1 '>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-lg dark:text-natural-4'>
            Are you sure you want to delete this education?
          </DialogTitle>
          <DialogDescription className='mt-2 dark:text-natural-6'>
            You will not be able to recover this education.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button
              onClick={handleDelete}
              type='button'
              className='flex items-center gap-3'
              variant='destructive'
            >
              <FaRegTrashCan /> Delete this Education
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEducationButton;
