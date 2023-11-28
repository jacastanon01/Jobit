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
import { UserProject } from '@/types';
import AddOrEditProjectForm from './AddOrEditProjectForm';
import { PiBracketsCurlyDuotone } from 'react-icons/pi';

const EditProjectButton = ({ project }: { project: UserProject }) => {
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
              <PiBracketsCurlyDuotone />
            </div>
            You can update the project details here.
          </DialogTitle>
          <DialogDescription className='mt-2 dark:text-natural-6'>
            Fill the form below and click on the update button.
          </DialogDescription>
        </DialogHeader>
        <AddOrEditProjectForm
          setOpen={setOpen}
          projectData={project}
          type='edit'
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectButton;
