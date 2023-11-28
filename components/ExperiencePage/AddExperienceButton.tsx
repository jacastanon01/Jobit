'use client';

import React, { useState } from 'react';
import { LuPlusCircle } from 'react-icons/lu';
import { PiBagSimpleDuotone } from 'react-icons/pi';
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';

import AddOrEditExperienceForm from './AddOrEditExperienceForm';

const AddExperienceButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='mt-6 flex items-center gap-2 rounded-lg bg-natural-8 px-4 py-2 font-semibold text-white transition-all hover:bg-primary'>
        Add Experience <LuPlusCircle />
      </DialogTrigger>
      <DialogContent className='dark:border-darkbg-2 dark:bg-darkbg-1 '>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 dark:text-natural-4'>
            <div className='text-xl'>
              <PiBagSimpleDuotone />
            </div>
            Add experiences to your profile
          </DialogTitle>
          <DialogDescription className='mt-2 dark:text-natural-6'>
            Here you can enter informations about your experiences and how it
            will benefit employers/clients.
          </DialogDescription>
        </DialogHeader>
        <AddOrEditExperienceForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddExperienceButton;
