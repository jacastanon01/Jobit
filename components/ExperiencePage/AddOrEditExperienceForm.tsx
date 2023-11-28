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
import { z } from 'zod';
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
import { UserExperience } from '@/types';
import createSupabaseBrowserClient, {
  uploadImage,
} from '@/lib/supabase/browser';
import CustomImage from '../shared/CustomImage/CustomImage';
import CustomImageUploadField from '../shared/CustomImageUploadField/CustomImageUploadField';
import { Textarea } from '../ui/textarea';
import { experienceSchema } from '@/lib/validations/profile';

const AddOrEditExperienceForm = ({
  setOpen,
  experienceData = {
    image_url: null,
    company: '',
    role: '',
    description: '',
  },
  type = 'add',
}: {
  setOpen: any;
  experienceData?: Partial<UserExperience>;
  type?: string;
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [updating, setUpdating] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<UserExperience>>({});
  const [experience, setExperience] = useState(experienceData);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from:
      (experienceData?.start_date && new Date(experienceData?.start_date)) ||
      undefined,
    to:
      (experienceData?.end_date && new Date(experienceData?.end_date)) ||
      undefined,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { toast } = useToast();

  const supabase = createSupabaseBrowserClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = experience.image_url;

      // If a new file is selected, upload it
      if (selectedFile) {
        imageUrl = await uploadImage(
          selectedFile,
          experience.company!,
          'experiences',
        );
      }

      // If image is removed, delete the old image from storage
      if (
        (experience.image_url === null && experienceData.image_url) ||
        (imageUrl && experienceData.image_url)
      ) {
        const oldFilename = experienceData.image_url.split('/').pop();
        await supabase.storage.from('experiences').remove([oldFilename!]);
      }

      // Update the experience with the new or removed image
      const updatedExperience = { ...experience, image_url: imageUrl };

      // validate the experience
      const parsedExperience = experienceSchema.parse(updatedExperience);

      if (type === 'add') {
        await addUserObject(parsedExperience, 'experiences');
      } else if (type === 'edit' && experienceData.id) {
        await updateUserObject(parsedExperience, 'experiences');
      }

      toast({
        title: `Experience ${type}ed successfully! 🎉`,
        description: `The experience was ${type}ed successfully.`,
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
        title: 'Error updating experience!',
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
      setExperience((prevState: any) => ({
        ...prevState,
        start_date: date.from!,
        end_date: date.to!,
      }));
    }

    if (date?.from && !date?.to) {
      setExperience((prevState: any) => ({
        ...prevState,
        start_date: date.from!,
        end_date: null,
      }));
    }
  }, [date]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  return (
    <>
      {(experience?.image_url || imagePreview) && (
        <div className='flex shrink-0 items-center gap-2'>
          <div className='relative h-20 w-20  overflow-hidden rounded-lg'>
            <CustomImage
              className='!object-contain'
              src={imagePreview || experience?.image_url || ''}
            />
          </div>
          <button
            onClick={() => {
              setExperience((prevState) => ({ ...prevState, image_url: null }));
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
            <Label htmlFor='company'>Company:</Label>
            <Input
              type='text'
              name='company'
              value={experience.company}
              onChange={handleChange}
              placeholder='Enter the company name you worked for'
              className={formErrors.company && '!border-red-500'}
            />
            <span className='text-red-500'>{formErrors.company}</span>
          </div>
        </div>
        <div className='flex w-full items-center gap-x-[13px]'>
          <div className='flex w-full flex-col gap-2'>
            <Label htmlFor='role'>Role:</Label>
            <Input
              type='text'
              name='role'
              value={experience.role}
              onChange={handleChange}
              placeholder='Enter the role you had in that company'
              className={formErrors.role && '!border-red-500'}
            />
            <span className='text-red-500'>{formErrors.role}</span>
          </div>
        </div>
        <div className='flex w-full items-center gap-x-[13px]'>
          <div className='flex w-full flex-col gap-2'>
            <Label htmlFor='description'>Description:</Label>
            <Textarea
              name='description'
              rows={5}
              maxLength={400}
              value={experience.description || ''}
              onChange={handleChange}
              placeholder='Enter a description of your experience (max 400 characters)'
              className={formErrors.description && '!border-red-500'}
            />
            <span className='text-red-500'>{formErrors.description}</span>
          </div>
        </div>
        <div className='grid gap-2'>
          <Label>When have you worked here ?:</Label>
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
            {type === 'add' && 'Add this experience to your profile'}
            {type === 'edit' && 'Update this experience'}
          </button>
        )}
      </form>
    </>
  );
};

export default AddOrEditExperienceForm;
