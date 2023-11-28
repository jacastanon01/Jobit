'use client';

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { format } from 'date-fns';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';

import { addUserObject, updateUserObject } from '@/lib/supabase/actions';
import { UserProject } from '@/types';
import createSupabaseBrowserClient, {
  uploadImage,
} from '@/lib/supabase/browser';
import CustomImage from '../shared/CustomImage/CustomImage';
import CustomImageUploadField from '../shared/CustomImageUploadField/CustomImageUploadField';
import { Textarea } from '../ui/textarea';
import { projectSchema } from '@/lib/validations/profile';
import { z } from 'zod';

const AddOrEditProjectForm = ({
  setOpen,
  projectData = {
    image_url: null,
    link: '',
    project_name: '',
    description: '',
  },
  type = 'add',
}: {
  setOpen: any;
  projectData?: Partial<UserProject>;
  type?: string;
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [updating, setUpdating] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<UserProject>>({});
  const [project, setProject] = useState(projectData);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from:
      (projectData?.start_date && new Date(projectData?.start_date)) ||
      undefined,
    to: (projectData?.end_date && new Date(projectData?.end_date)) || undefined,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { toast } = useToast();

  const supabase = createSupabaseBrowserClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = project.image_url;

      // If a new file is selected, upload it
      if (selectedFile) {
        imageUrl = await uploadImage(
          selectedFile,
          project.project_name!,
          'projects',
        );
      }

      // If image is removed, delete the old image from storage
      if (
        (project.image_url === null && projectData.image_url) ||
        (imageUrl && projectData.image_url)
      ) {
        const oldFilename = projectData.image_url.split('/').pop();
        await supabase.storage.from('projects').remove([oldFilename!]);
      }

      // Update the project with the new or removed image
      const updatedProject = { ...project, image_url: imageUrl };

      // validate the project
      const parsedProject = projectSchema.parse(updatedProject);

      if (type === 'add') {
        await addUserObject(parsedProject, 'projects');
      } else if (type === 'edit' && projectData.id) {
        await updateUserObject(parsedProject, 'projects');
      }

      toast({
        title: `Project ${type}ed successfully! 🎉`,
        description: `The project was ${type}ed successfully.`,
        variant: 'success',
        duration: 2000,
      });
      setFormErrors({});
      setOpen(false);
    } catch (error: any) {
      // Handle zod errors
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
        return;
      }

      // Handle other errors
      toast({
        title: 'Error updating project!',
        description: `Error: ${error.message}`,
        variant: 'destructive',
        duration: 2000,
      });
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (date?.from && date?.to) {
      setProject((prevState: any) => ({
        ...prevState,
        start_date: date.from!,
        end_date: date.to!,
      }));
    }

    if (date?.from && !date?.to) {
      setProject((prevState: any) => ({
        ...prevState,
        start_date: date.from!,
        end_date: null,
      }));
    }
  }, [date]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  return (
    <>
      {(project?.image_url || imagePreview) && (
        <div className='flex shrink-0 items-center gap-2'>
          <div className='relative h-20 w-20  overflow-hidden rounded-lg'>
            <CustomImage
              className='!object-contain'
              src={imagePreview || project?.image_url || ''}
            />
          </div>
          <button
            onClick={() => {
              setProject((prevState) => ({ ...prevState, image_url: null }));
              setImagePreview(null);
              setSelectedFile(null);
              if (imageRef.current) {
                imageRef.current.value = '';
              }
            }}
          >
            <FaRegTrashCan className='h-5 w-5 text-red-500' />
          </button>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='flex w-full shrink flex-col flex-wrap gap-y-4 '
      >
        <div className='flex w-full items-center gap-x-[13px]'>
          <div className='flex w-full flex-col gap-2'>
            <Label htmlFor='image_url'>Image:</Label>
            <CustomImageUploadField
              imageRef={imageRef}
              setImagePreview={setImagePreview}
              setSelectedFile={setSelectedFile}
              className={formErrors.image_url && '!border-red-500'}
            />
            <span className='text-red-500'>{formErrors.image_url}</span>
          </div>
        </div>

        <div className='flex w-full items-center gap-x-[13px]'>
          <div className='flex w-full flex-col gap-2'>
            <Label htmlFor='project_name'>Project Name:</Label>
            <Input
              type='text'
              name='project_name'
              value={project.project_name}
              onChange={handleChange}
              placeholder='Enter the project name'
              className={formErrors.project_name && '!border-red-500'}
            />
            <span className='text-red-500'>{formErrors.project_name}</span>
          </div>
        </div>
        <div className='flex w-full items-center gap-x-[13px]'>
          <div className='flex w-full flex-col gap-2'>
            <Label htmlFor='link'>URL:</Label>
            <Input
              type='url'
              name='link'
              value={project.link}
              onChange={handleChange}
              placeholder='Enter the project link'
              className={formErrors.link && '!border-red-500'}
            />
            <span className='text-red-500'>{formErrors.link}</span>
          </div>
        </div>
        <div className='flex w-full items-center gap-x-[13px]'>
          <div className='flex w-full flex-col gap-2'>
            <Label htmlFor='description'>Description:</Label>
            <Textarea
              name='description'
              rows={5}
              maxLength={400}
              value={project.description || ''}
              onChange={handleChange}
              placeholder='Enter a description of your project (max 400 characters)'
              className={formErrors.description && '!border-red-500'}
            />
            <span className='text-red-500'>{formErrors.description}</span>
          </div>
        </div>
        <div className='grid gap-2'>
          <Label>When have you built this project ?:</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id='date'
                variant={'outline'}
                className={cn(
                  'w-full rounded-[10px] dark:hover:!bg-darkbg-3 border border-natural-5/60 bg-natural-2 px-5 py-3 text-[13px] font-bold text-natural-8 outline-none dark:border-natural-8 dark:bg-darkbg-2 dark:text-white dark:focus:ring-1 dark:focus:ring-primary dark:active:ring-1 dark:active:ring-primary',
                  !date && 'text-muted-foreground',
                  formErrors.start_date && '!border-red-500',
                  formErrors.end_date && '!border-red-500',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <div className='flex gap-2'>
                    <span>Pick a date</span>
                    <span className='text-red-500'>
                      {formErrors.start_date?.toString()}
                    </span>
                    <span className='text-red-500'>
                      {formErrors.end_date?.toString()}
                    </span>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto rounded-lg p-0 dark:border-darkbg-4 dark:bg-darkbg-3'
              align='start'
            >
              <Calendar
                captionLayout='dropdown'
                fromYear={1960}
                toYear={2025}
                initialFocus
                mode='range'
                className='rounded-lg dark:bg-darkbg-1'
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {updating ? (
          <button
            type='submit'
            disabled
            className='mt-4 rounded-[10px] bg-primary/10 px-5 py-3 text-[13px] font-bold text-white transition-all hover:bg-primary/10 '
          >
            Updating...
          </button>
        ) : (
          <button
            type='submit'
            className='mt-4 rounded-[10px] bg-primary px-5 py-3 text-[13px] font-bold text-white transition-all hover:bg-primary/90 '
          >
            {type === 'add' && 'Add this project to your profile'}
            {type === 'edit' && 'Update this project'}
          </button>
        )}
      </form>
    </>
  );
};

export default AddOrEditProjectForm;
