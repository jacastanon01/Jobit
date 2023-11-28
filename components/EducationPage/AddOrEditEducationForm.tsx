'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';

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

import { UserEducation } from '@/types';
import createSupabaseBrowserClient, {
  uploadImage,
} from '@/lib/supabase/browser';
import CustomImage from '../shared/CustomImage/CustomImage';
import CustomImageUploadField from '../shared/CustomImageUploadField/CustomImageUploadField';
import { addUserObject, updateUserObject } from '@/lib/supabase/actions';
import { educationSchema } from '@/lib/validations/profile';
import { z } from 'zod';

const AddOrEditEducationForm = ({
  setOpen,
  educationData = {
    image_url: null,
    institution: '',
    degree: '',
    field_of_study: '',
  },
  type = 'add',
}: {
  setOpen: any;
  educationData?: Partial<UserEducation>;
  type?: string;
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [updating, setUpdating] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<UserEducation>>({});
  const [education, setEducation] = useState(educationData);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from:
      (educationData?.start_date && new Date(educationData?.start_date)) ||
      undefined,
    to:
      (educationData?.end_date && new Date(educationData?.end_date)) ||
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
      let imageUrl = education.image_url;

      // If a new file is selected, upload it
      if (selectedFile) {
        imageUrl = await uploadImage(
          selectedFile,
          education.institution!,
          'educations',
        );
      }

      // If image is removed, delete the old image from storage
      if (
        (education.image_url === null && educationData.image_url) ||
        (imageUrl && educationData.image_url)
      ) {
        const oldFilename = educationData.image_url.split('/').pop();
        await supabase.storage.from('educations').remove([oldFilename!]);
      }

      // Update the education with the new or removed image
      const updatedEducation = { ...education, image_url: imageUrl };

      // validate the education
      const parsedEducation = educationSchema.parse(updatedEducation);

      if (type === 'add') {
        await addUserObject(parsedEducation, 'educations');
      } else if (type === 'edit' && educationData.id) {
        await updateUserObject(parsedEducation, 'educations');
      }

      toast({
        title: `Education ${type}ed successfully! 🎉`,
        description: `The education was ${type}ed successfully.`,
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
      setEducation((prevState: any) => ({
        ...prevState,
        start_date: date.from!,
        end_date: date.to!,
      }));
    }

    if (date?.from && !date?.to) {
      setEducation((prevState: any) => ({
        ...prevState,
        start_date: date.from!,
        end_date: null,
      }));
    }
  }, [date]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  return (
    <>
      {(education?.image_url || imagePreview) && (
        <div className='flex shrink-0 items-center gap-2'>
          <div className='relative h-20 w-20  overflow-hidden rounded-lg'>
            <CustomImage
              className='!object-contain'
              src={imagePreview || education?.image_url || ''}
            />
          </div>
          <button
            onClick={() => {
              setEducation((prevState) => ({ ...prevState, image_url: null }));
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
            <Label htmlFor='institution'>Institution:</Label>
            <Input
              type='text'
              name='institution'
              value={education.institution}
              onChange={handleChange}
              placeholder='Enter the institution / school name you attended'
              className={formErrors.institution && '!border-red-500'}
            />
            <span className='text-red-500'>{formErrors.institution}</span>
          </div>
        </div>
        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='flex w-full items-center gap-x-[13px]'>
            <div className='flex w-full flex-col gap-2'>
              <Label htmlFor='degree'>Degree:</Label>
              <Input
                type='text'
                name='degree'
                value={education.degree}
                onChange={handleChange}
                placeholder='Enter the degree you obtained'
                className={formErrors.degree && '!border-red-500'}
              />
              <span className='text-red-500'>{formErrors.degree}</span>
            </div>
          </div>
          <div className='flex w-full items-center gap-x-[13px]'>
            <div className='flex w-full flex-col gap-2'>
              <Label htmlFor='field_of_study'>Field of Study:</Label>
              <Input
                type='text'
                name='field_of_study'
                value={education.field_of_study}
                onChange={handleChange}
                placeholder='Enter the field you studied'
                className={formErrors.field_of_study && '!border-red-500'}
              />
              <span className='text-red-500'>{formErrors.field_of_study}</span>
            </div>
          </div>
        </div>

        <div className='grid gap-2'>
          <Label>When have you studied here ?:</Label>
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
            {type === 'add' && 'Add this education to your profile'}
            {type === 'edit' && 'Update this education'}
          </button>
        )}
      </form>
    </>
  );
};

export default AddOrEditEducationForm;
