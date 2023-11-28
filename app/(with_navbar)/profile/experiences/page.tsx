import ExperienceCard from '@/components/ExperiencePage/ExperienceCard';
import { getUserObject } from '@/lib/supabase/actions';
import AddExperienceButton from '@/components/ExperiencePage/AddExperienceButton';
import NoExperienceFound from '@/components/ExperiencePage/NoExperienceFound';

export default async function ExperiencePage() {
  const experiences = await getUserObject('experiences');

  return (
    <section className='flex grow flex-col items-center '>
      {experiences && experiences.length > 0 ? (
        <>
          <div className='flex w-full flex-wrap justify-between gap-3'>
            {experiences.map((experience) => {
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
          <div className='flex w-full'>
            <AddExperienceButton />
          </div>
        </>
      ) : (
        <NoExperienceFound />
      )}
    </section>
  );
}
