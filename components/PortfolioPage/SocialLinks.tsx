import Link from 'next/link';
import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaEnvelope,
} from 'react-icons/fa';

const SocialLinks = ({ profile }: { profile: any }) => {
  return (
    <div className='my-2 flex gap-2'>
      {profile.github && (
        <Link
          className='text-2xl transition-all hover:text-primary dark:text-natural-5'
          href={profile.github}
        >
          <FaGithub />
        </Link>
      )}
      {profile.linkedin && (
        <Link
          className='text-2xl transition-all hover:text-primary dark:text-natural-5'
          href={profile.linkedin}
        >
          <FaLinkedin />
        </Link>
      )}
      {profile.twitter && (
        <Link
          className='text-2xl transition-all hover:text-primary dark:text-natural-5'
          href={profile.twitter}
        >
          <FaTwitter />
        </Link>
      )}
      {profile.website && (
        <Link
          className='text-2xl transition-all hover:text-primary dark:text-natural-5'
          href={profile.website}
        >
          <FaGlobe />
        </Link>
      )}
      {profile.email && (
        <Link
          className='text-2xl transition-all hover:text-primary dark:text-natural-5'
          href={`mailto:${profile.email}`}
        >
          <FaEnvelope />
        </Link>
      )}
    </div>
  );
};

export default SocialLinks;
