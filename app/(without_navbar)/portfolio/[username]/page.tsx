import EducationCard from '@/components/EducationPage/EducationCard';
import ExperienceCard from '@/components/ExperiencePage/ExperienceCard';
import BuiltWithJobit from '@/components/PortfolioPage/BuiltWithJobit';
import EditProfileButton from '@/components/PortfolioPage/EditProfileButton';
import SocialLinks from '@/components/PortfolioPage/SocialLinks';
import ProjectCard from '@/components/ProjectsPage/ProjectCard';
import CustomImage from '@/components/shared/CustomImage/CustomImage';

import {
  getProfile,
  getProfileByUsername,
  getUserObject,
} from '@/lib/supabase/actions';
import { UserEducation, UserExperience, UserProject } from '@/types';

import { notFound } from 'next/navigation';
import { PiBagSimpleDuotone, PiGraduationCapDuotone } from 'react-icons/pi';

const Portfolio = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  let profile: any;
  let userProfile: any;
  let userEducations: any;
  let userExperiences: any;
  let userProjects: any;

  try {
    profile = await getProfileByUsername(username);

    if (!profile) {
      notFound();
    }

    userProfile = await getProfile();
    userEducations = await getUserObject('educations', profile.id);
    userExperiences = await getUserObject('experiences', profile.id);
    userProjects = await getUserObject('projects', profile.id);
  } catch (e) {
    notFound();
  }

  return (
    <main className='main-container w-full py-6'>
      <section>
        <div className='mb-4 flex flex-col gap-4 md:flex-row md:items-center md:gap-10'>
          {profile.image_url && (
            <div className='relative h-60 w-60 shrink-0 overflow-hidden rounded-md shadow-md shadow-primary outline-none ring-2 ring-primary md:rounded-3xl'>
              <CustomImage src={profile.image_url} />
            </div>
          )}
          <div className=''>
            {profile.full_name && (
              <h1 className='font-bold text-base-black dark:text-white '>
                {profile.full_name}
              </h1>
            )}
            {profile.role && (
              <h2 className='text-base font-medium leading-6 text-natural-6 sm:text-[20px] sm:leading-8'>
                {profile.role}
              </h2>
            )}
            <SocialLinks profile={profile} />
            <p className='text-base dark:text-white'>{profile?.bio}</p>
          </div>
        </div>
      </section>
      {userEducations && userEducations.length > 0 && (
        <section className='mt-8 flex grow flex-col items-center gap-3 '>
          <h2 className='flex w-full items-center justify-start gap-2 text-2xl font-extrabold uppercase dark:text-white'>
            <PiGraduationCapDuotone /> Education
          </h2>
          <div className='flex w-full flex-wrap justify-between gap-3'>
            {userEducations.map((education: UserEducation) => {
              return (
                <EducationCard
                  key={education.id}
                  imageUrl={education.image_url}
                  profileId={education.profile_id}
                  id={education.id}
                  institution={education.institution}
                  degree={education.degree}
                  fieldOfStudy={education.field_of_study}
                  startDate={education.start_date}
                  endDate={education.end_date}
                />
              );
            })}
          </div>
        </section>
      )}
      {userExperiences && userExperiences.length > 0 && (
        <section className='mt-8 flex grow flex-col items-center gap-3 '>
          <h2 className='flex w-full items-center justify-start gap-2 text-2xl font-extrabold uppercase dark:text-white'>
            <PiBagSimpleDuotone /> Experiences
          </h2>
          <div className='flex w-full flex-wrap justify-between gap-3'>
            {userExperiences.map((experience: UserExperience) => {
              return (
                <ExperienceCard
                  key={experience.id}
                  imageUrl={experience.image_url}
                  id={experience.id}
                  profileId={experience.profile_id}
                  company={experience.company}
                  role={experience.role}
                  description={experience.description}
                  startDate={experience.start_date}
                  endDate={experience.end_date}
                />
              );
            })}
          </div>
        </section>
      )}
      {userProjects && userProjects.length > 0 && (
        <section className='mt-8 flex grow flex-col items-center gap-3 '>
          <h2 className='flex w-full items-center justify-start gap-2 text-2xl font-extrabold uppercase dark:text-white'>
            <PiBagSimpleDuotone /> Projects
          </h2>
          <div className='flex w-full flex-wrap justify-between gap-3'>
            {userProjects.map((project: UserProject) => {
              return (
                <ProjectCard
                  key={project.id}
                  imageUrl={project.image_url}
                  id={project.id}
                  description={project.description}
                  profileId={project.profile_id}
                  projectName={project.project_name}
                  link={project.link}
                  startDate={project.start_date}
                  endDate={project.end_date}
                />
              );
            })}
          </div>
        </section>
      )}
      <BuiltWithJobit />
      {userProfile && userProfile.id === profile.id && <EditProfileButton />}
    </main>
  );
};

export default Portfolio;
