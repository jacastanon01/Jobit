import AddEducationButton from '@/components/EducationPage/AddEducationButton';
import EducationCard from '@/components/EducationPage/EducationCard';
import NoEducationFound from '@/components/EducationPage/NoEducationFound';
import { getUserObject } from '@/lib/supabase/actions';

export default async function EducationPage() {
  const educations = await getUserObject('educations');

  return (
    <section className='flex grow flex-col items-center '>
      {educations && educations.length > 0 ? (
        <>
          <div className='flex w-full flex-wrap justify-between gap-3'>
            {educations.map((education) => {
              return (
                <EducationCard
                  key={education.id}
                  imageUrl={education.image_url}
                  id={education.id}
                  profileId={education.profile_id}
                  institution={education.institution}
                  degree={education.degree}
                  fieldOfStudy={education.field_of_study}
                  startDate={education.start_date}
                  endDate={education.end_date}
                />
              );
            })}
          </div>
          <div className='flex w-full'>
            <AddEducationButton />
          </div>
        </>
      ) : (
        <NoEducationFound />
      )}
    </section>
  );
}
