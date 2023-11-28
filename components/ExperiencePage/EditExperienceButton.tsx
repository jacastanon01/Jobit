'use client';

import { FaRegEdit } from 'react-icons/fa';
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { useState } from 'react';
import { UserExperience } from '@/types';
import AddOrEditExperienceForm from './AddOrEditExperienceForm';
import { PiBagSimpleDuotone } from 'react-icons/pi';

const EditExperienceButton = ({
  experience,
}: {
  experience: UserExperience;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='mt-6 flex items-center gap-2 rounded-lg bg-natural-5 p-2 font-semibold text-natural-7 transition-all hover:bg-primary hover:text-white dark:bg-natural-8 dark:text-white dark:hover:bg-primary'>
        <FaRegEdit />
      </DialogTrigger>
      <DialogContent className='dark:border-darkbg-2 dark:bg-darkbg-1 '>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2 text-lg dark:text-natural-4'>
            <div className='text-xl'>
              <PiBagSimpleDuotone />
            </div>
            You can update the experience details here.
          </DialogTitle>
          <DialogDescription className='mt-2 dark:text-natural-6'>
            Fill the form below and click on the update button.
          </DialogDescription>
        </DialogHeader>
        <AddOrEditExperienceForm
          setOpen={setOpen}
          experienceData={experience}
          type='edit'
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditExperienceButton;
