'use client';

import Link from 'next/link';
import { FaGithub, FaGlobe, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { useToast } from '@/components/ui/use-toast';
import { updateProfile } from '@/lib/supabase/actions';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import CustomImage from '../shared/CustomImage/CustomImage';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import createSupabaseBrowserClient, {
  uploadImage,
} from '@/lib/supabase/browser';
import CustomImageUploadField from '../shared/CustomImageUploadField/CustomImageUploadField';
import { z } from 'zod';
import { Database } from '@/types/supabase';
import { profileSchema } from '@/lib/validations/profile';

const ProfileForm = ({
  profile,
}: {
  profile: Database['public']['Tables']['profiles']['Row'];
}) => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [formErrors, setFormErrors] = useState<
    Partial<Database['public']['Tables']['profiles']['Row']>
  >({});
  const [localProfile, setLocalProfile] = useState(profile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  const supabase = createSupabaseBrowserClient();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setLocalProfile({ ...localProfile, [e.target.name]: e.target.value });
  };

  const handleSelectPublishedChange = (value: string) => {
    setLocalProfile({
      ...localProfile,
      published: value === 'true',
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = localProfile.image_url;

      if (selectedFile) {
        imageUrl =
          (await uploadImage(selectedFile, profile.id, 'avatars')) || '';
      }

      if (imageUrl && profile.image_url) {
        const oldFilename = profile.image_url.split('/').pop();
        await supabase.storage.from('avatars').remove([oldFilename!]);
      }

      const updatedProfile = { ...localProfile, image_url: imageUrl };

      // validate the profile
      const parsedProfile = profileSchema.parse(updatedProfile);

      await updateProfile(parsedProfile);

      toast({
        title: 'Profile Updated!',
        description: 'Your profile has been updated successfully',
        variant: 'success',
        duration: 2000,
      });

      setFormErrors({});
    } catch (error: any) {
      // Handle zod errors
      if (error instanceof z.ZodError) {
        setFormErrors(error.flatten().fieldErrors);
        return;
      }

      // Handle other errors
      toast({
        title: 'Error updating Profile!',
        description: `Error: ${error.message}`,
        variant: 'destructive',
        duration: 2000,
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section className='flex w-full flex-col gap-y-4 '>
      <div className='mb-4 flex items-center gap-4'>
        <div className='flex items-center gap-3'>
          <div className='relative h-28 w-28 overflow-hidden rounded-3xl shadow-md shadow-primary outline-none ring-2 ring-primary'>
            <CustomImage src={imagePreview || localProfile.image_url} />
          </div>
        </div>
        <div className=''>
          <h1 className='font-bold text-base-black dark:text-white '>
            {localProfile.full_name}
          </h1>
          <h2 className='text-base font-medium leading-6 text-natural-6 sm:text-[20px] sm:leading-8'>
            {localProfile.role}
          </h2>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className='flex w-full shrink flex-col gap-y-4 '
      >
        <div className='flex w-full items-center gap-x-[13px]'>
          <div className='flex w-full flex-col gap-2'>
            <Label htmlFor='published'>
              Do you want to publish your profile ?
            </Label>

            <Select
              name='published'
              value={localProfile.published.toString()}
              onValueChange={handleSelectPublishedChange}
            >
              <SelectTrigger
                className={`${
                  localProfile.published
                    ? '!border-primary/20 !bg-primary/20'
                    : '!border-red-600/20 !bg-red-600/20'
                } ${
                  formErrors.published && '!border-red-500'
                } w-full cursor-pointer rounded-[10px] border px-5 py-3 text-[13px] font-bold !text-natural-8 !outline-none !ring-0 focus:!outline-none focus:ring-0  dark:!text-white`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  className='cursor-pointer focus:!bg-primary/20'
                  value='true'
                >
                  Yes, I want it to be published
                </SelectItem>
                <SelectItem
                  className='cursor-pointer !ring-red-500 focus:!bg-red-500/20'
                  value='false'
                >
                  No, I do not want it to be published
                </SelectItem>
              </SelectContent>
            </Select>

            <span className='text-red-500'>{formErrors.published}</span>

            {localProfile.published && (
              <div className='dark:text-natural-6'>
                Your portfolio page will be:
                <Link
                  className='ml-1 font-bold dark:text-natural-5'
                  href={`/portfolio/${localProfile.username}`}
                >{`/portfolio/${localProfile.username}`}</Link>
                <br />
                <span className='text-xs text-red-500'>
                  Make sure to save your change for it to be live
                </span>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='flex w-full items-center gap-x-[13px]'>
            <div className='flex w-full flex-col gap-2'>
              <Label htmlFor='full_name'>Full Name:</Label>
              <Input
                type='text'
                name='full_name'
                value={localProfile.full_name || ''}
                onChange={handleChange}
                placeholder='Enter your full name'
                className={formErrors.full_name && '!border-red-500'}
              />
              <span className='text-red-500'>{formErrors.full_name}</span>
            </div>
          </div>
          <div className='flex w-full items-center gap-x-[13px]'>
            <div className='flex w-full flex-col gap-2'>
              <Label htmlFor='username'>Username:</Label>
              <Input
                type='text'
                name='username'
                value={localProfile.username || ''}
                onChange={handleChange}
                pattern='^[a-zA-Z0-9]{1,100}$'
                max='100'
                title='Username must be 1-100 characters long and contain only letters and numbers.'
                placeholder='Enter your username'
                className={formErrors.username && '!border-red-500'}
              />
              <span className='text-red-500'>{formErrors.username}</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='flex w-full items-center gap-x-[13px]'>
            <div className='flex w-full flex-col gap-2'>
              <Label htmlFor='role'>Role:</Label>
              <Input
                type='text'
                name='role'
                value={localProfile.role || ''}
                onChange={handleChange}
                placeholder='Enter your role'
                className={formErrors.role && '!border-red-500'}
              />
              <span className='text-red-500'>{formErrors.role}</span>
            </div>
          </div>

          <div className='flex w-full items-center gap-x-[13px]'>
            <div className='flex w-full flex-col gap-2'>
              <Label htmlFor='email'>Contact Email:</Label>
              <Input
                type='email'
                name='email'
                value={localProfile.email || ''}
                onChange={handleChange}
                placeholder='Enter your contact email adress'
                className={formErrors.email && '!border-red-500'}
              />
              <span className='text-red-500'>{formErrors.email}</span>
            </div>
          </div>
        </div>

        <div className='flex w-full items-center gap-x-[13px]'>
          <div className='flex w-full flex-col gap-2'>
            <Label htmlFor='image_url'>Image URL:</Label>
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
            <Label htmlFor='bio'>
              Bio:{' '}
              <span className='text-sm opacity-50'>(max 400 characters)</span>
            </Label>
            <Textarea
              name='bio'
              rows={5}
              maxLength={400}
              value={localProfile.bio || ''}
              onChange={handleChange}
              placeholder='Enter your bio (max 400 characters)'
              className={formErrors.bio && '!border-red-500'}
            />
            <span className='text-red-500'>{formErrors.bio}</span>
          </div>
        </div>

        <div>
          <h3 className='font-extrabold dark:text-white'>Social Links:</h3>

          <div className='flex flex-col gap-4 md:flex-row'>
            <div className='flex w-full items-center gap-x-[13px]'>
              <div className='flex w-full flex-col gap-2'>
                <Label htmlFor='github'>Github</Label>
                <div className='relative flex w-full items-center gap-x-[13px]'>
                  <Input
                    type='url'
                    name='github'
                    value={localProfile.github || ''}
                    onChange={handleChange}
                    placeholder='Enter Github URL'
                    className={`peer py-3 pl-10 pr-5 ${
                      formErrors.github && '!border-red-500'
                    }`}
                  />
                  <FaGithub className='absolute left-3 text-lg text-gray-400 peer-focus:text-primary' />
                  <span className='text-red-500'>{formErrors.github}</span>
                </div>
              </div>
            </div>
            <div className='flex w-full items-center gap-x-[13px]'>
              <div className='flex w-full flex-col gap-2'>
                <Label htmlFor='linkedin'>Linkedin</Label>
                <div className='relative flex w-full items-center gap-x-[13px]'>
                  <Input
                    type='url'
                    name='linkedin'
                    value={localProfile.linkedin || ''}
                    onChange={handleChange}
                    placeholder='Enter Linkedin URL'
                    className={`peer py-3 pl-10 pr-5 ${
                      formErrors.linkedin && '!border-red-500'
                    }`}
                  />
                  <FaLinkedin className='absolute left-3 text-lg text-gray-400 peer-focus:text-primary' />
                </div>
                <span className='text-red-500'>{formErrors.linkedin}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 md:flex-row'>
          <div className='flex w-full items-center gap-x-[13px]'>
            <div className='flex w-full flex-col gap-2'>
              <Label htmlFor='twitter'>Twitter</Label>
              <div className='relative flex w-full items-center gap-x-[13px]'>
                <Input
                  type='url'
                  name='twitter'
                  value={localProfile.twitter || ''}
                  onChange={handleChange}
                  placeholder='Enter Twitter URL'
                  className={`peer py-3 pl-10 pr-5 ${
                    formErrors.twitter && '!border-red-500'
                  }`}
                />
                <FaTwitter className='absolute left-3 text-lg text-gray-400 peer-focus:text-primary' />
              </div>
              <span className='text-red-500'>{formErrors.twitter}</span>
            </div>
          </div>

          {/* Website URL */}
          <div className='flex w-full items-center gap-x-[13px]'>
            <div className='flex w-full flex-col gap-2'>
              <Label htmlFor='website'>Website</Label>
              <div className='relative flex w-full items-center gap-x-[13px]'>
                <Input
                  type='url'
                  name='website'
                  value={localProfile.website || ''}
                  onChange={handleChange}
                  placeholder='Enter Website URL'
                  className={`peer py-3 pl-10 pr-5 ${
                    formErrors.website && '!border-red-500'
                  }`}
                />
                <FaGlobe className='absolute left-3 text-lg text-gray-400 peer-focus:text-primary' />
              </div>
              <span className='text-red-500'>{formErrors.website}</span>
            </div>
          </div>
        </div>
        {/* Add other fields following the same pattern */}

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
            Update Profile
          </button>
        )}
      </form>
    </section>
  );
};

export default ProfileForm;
