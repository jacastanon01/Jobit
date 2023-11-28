import React from 'react';

import { FaLink, FaCode } from 'react-icons/fa6';

import { getProfile } from '@/lib/supabase/actions';
import CustomImage from '../shared/CustomImage/CustomImage';
import moment from 'moment';
import Link from 'next/link';
import DeleteProjectButton from './DeleteProjectButton';
import EditProjectButton from './EditProjectButton';

const ExperienceCard = async ({
  link,
  imageUrl,
  profileId,
  id,
  projectName,
  description,
  startDate,
  endDate,
}: {
  id: string;
  imageUrl?: string | null;
  profileId: string;
  projectName: string;
  link: string;
  description: string;
  startDate: Date;
  endDate: Date | undefined | null;
}) => {
  const profile = await getProfile();

  return (
    <div
      className={`group relative flex w-full flex-col  gap-5 rounded-lg bg-white p-7 shadow-md ring-1 ring-natural-5 transition-all dark:bg-darkbg-3 dark:text-white dark:ring-darkbg-4
      lg:w-[calc(50%-6px)]`}
    >
      {imageUrl && (
        <div className='relative h-14 w-40 shrink-0 overflow-hidden '>
          <CustomImage
            className='!object-contain object-left'
            src={`${imageUrl}?height=40`}
          />
        </div>
      )}
      <div className='flex flex-col gap-2'>
        <div className='flex flex-wrap items-center  gap-2 xl:flex-row'>
          <h3 className='flex items-center gap-3 text-xl font-bold '>
            <FaCode /> {projectName}
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
          <h4 className='flex items-center gap-1 text-base font-medium '>
            <FaLink />{' '}
            <Link className='hover:text-primary/7 text-primary' href={link}>
              {link}
            </Link>
          </h4>
        </div>
        <p>{description}</p>
      </div>

      {profile?.id === profileId && (
        <div className='absolute -top-3 right-3 flex shrink-0 items-center gap-2 transition-all  group-hover:visible group-hover:opacity-100 md:invisible md:opacity-0'>
          <EditProjectButton
            project={{
              id,
              image_url: imageUrl,
              profile_id: profileId,
              project_name: projectName,
              link,
              description,
              start_date: startDate,
              end_date: endDate,
            }}
          />
          <DeleteProjectButton id={id} imageUrl={imageUrl} />
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
