import React from 'react';

import { FaSchoolFlag } from 'react-icons/fa6';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { PiBooksLight } from 'react-icons/pi';
import { headers } from 'next/headers';

import DeleteEducationButton from './DeleteEducationButton';
import EditEducationButton from './EditEducationButton';
import { getProfile } from '@/lib/supabase/actions';
import CustomImage from '../shared/CustomImage/CustomImage';
import moment from 'moment';

const EducationCard = async ({
  institution,
  imageUrl,
  profileId,
  id,
  degree,
  fieldOfStudy,
  startDate,
  endDate,
}: {
  id: string;
  imageUrl?: string | null;
  profileId: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date | undefined | null;
}) => {
  const heads = headers();

  const pathname = heads.get('next-url');

  const profile = await getProfile();

  return (
    <div
      className={`group relative flex w-full flex-col gap-5  rounded-lg bg-white p-7 shadow-md ring-1 ring-natural-5 transition-all dark:bg-darkbg-3 dark:text-white dark:ring-darkbg-4 lg:w-[calc(50%-6px)] ${
        pathname === '/profile/education'
          ? '2xl:flex-row 2xl:items-center'
          : 'lg:flex-row lg:items-center'
      }`}
    >
      {imageUrl && (
        <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-lg'>
          <CustomImage className='!object-contain' src={imageUrl} />
        </div>
      )}
      <div className='flex flex-col gap-2'>
        <div className='flex flex-wrap items-center  gap-2 xl:flex-row'>
          <h3 className='flex items-center gap-3 text-xl font-bold '>
            <FaSchoolFlag /> {institution}
          </h3>
          <div className='flex items-center justify-center gap-2 rounded-lg bg-natural-4 px-4 py-1 dark:bg-natural-8/50'>
            <h4 className='text-sm'>
              {moment(new Date(startDate)).utc().format('MM/yyyy')}
            </h4>
            -
            <h4 className='text-sm'>
              {endDate
                ? moment(new Date(endDate)).utc().format('MM/yyyy')
                : 'Now'}
            </h4>
          </div>
        </div>

        <div className='flex items-center gap-2  xl:flex-row'>
          <h4 className='flex items-center gap-1 text-base font-medium'>
            <IoDocumentTextOutline /> {degree}
          </h4>
          •
          <h4 className='flex items-center gap-1 text-base font-medium'>
            <PiBooksLight /> {fieldOfStudy}
          </h4>
        </div>
      </div>

      {profile?.id === profileId && (
        <div className='absolute -top-3 right-3 flex shrink-0 items-center gap-2 transition-all  group-hover:visible group-hover:opacity-100 md:invisible md:opacity-0'>
          <EditEducationButton
            education={{
              id,
              image_url: imageUrl,
              profile_id: profileId,
              institution,
              degree,
              field_of_study: fieldOfStudy,
              start_date: startDate,
              end_date: endDate,
            }}
          />
          <DeleteEducationButton id={id} imageUrl={imageUrl} />
        </div>
      )}
    </div>
  );
};

export default EducationCard;
