import AddProjectButton from '@/components/ProjectsPage/AddProjectButton';
import NoProjectFound from '@/components/ProjectsPage/NoProjectFound';
import ProjectCard from '@/components/ProjectsPage/ProjectCard';
import { getUserObject } from '@/lib/supabase/actions';

export default async function ProjectsPage() {
  const projects = await getUserObject('projects');

  return (
    <section className='flex grow flex-col items-center '>
      {projects && projects.length > 0 ? (
        <>
          <div className='flex w-full flex-wrap justify-between gap-3'>
            {projects.map((project) => {
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
          <div className='flex w-full'>
            <AddProjectButton />
          </div>
        </>
      ) : (
        <NoProjectFound />
      )}
    </section>
  );
}
