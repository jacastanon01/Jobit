'use server';

import { redirect } from 'next/navigation';
import createSupabaseServerClient from '../server';
import { revalidatePath } from 'next/cache';
import { SavedJobsType, UserEducation, UserExperience } from '@/types';
import { profileSchema, profileValidations } from '@/lib/validations/profile';

export async function readUserServerSession() {
  const supabase = await createSupabaseServerClient();

  return supabase.auth.getSession();
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/auth/login');
}

export const getProfile = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session?.user) return null;

  const userId = session.user.id;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getProfileByUsername = async (username: string) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error) throw new Error(error.message);
  if (data) {
    return data;
  }
};

export const updateProfile = async (profileData: any) => {
  try {
    profileSchema.parse(profileData);

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', profileData.id);

    if (error) throw new Error(error.message);
    revalidatePath('/profile');
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserObject = async (
  typeOfObject: 'educations' | 'experiences' | 'projects',
  profileId?: string,
) => {
  let localProfileId = profileId;
  const supabase = await createSupabaseServerClient();

  if (!localProfileId) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session || !session?.user)
      throw new Error(
        `You need to be logged in to retrieve ${typeOfObject} without passing a profile id`,
      );
    localProfileId = session?.user.id;
  }

  const { data, error } = await supabase
    .from(`user_${typeOfObject}`)
    .select('*')
    .eq('profile_id', localProfileId);

  if (error) throw new Error(error.message);
  return data || [];
};

export const addUserObject = async (
  objectData:
    | Partial<UserEducation>
    | Partial<UserExperience>
    | Partial<UserExperience>,
  typeOfObject: 'educations' | 'experiences' | 'projects',
) => {
  // before we put it into the db
  try {
    profileValidations[typeOfObject as keyof typeof profileValidations].parse(
      objectData,
    );
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session || !session?.user)
      throw new Error(
        `You need to be logged in to add ${typeOfObject} to your profile`,
      );
    const { data, error } = await supabase
      .from(`user_${typeOfObject}`)
      .insert({ ...objectData, profile_id: session?.user.id });

    if (error) throw new Error(error.message);
    revalidatePath(`/profile/${typeOfObject}`);
    revalidatePath(`/portfolio/${objectData.profile_id}`);
    return data || [];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUserObject = async (
  objectData:
    | Partial<UserEducation>
    | Partial<UserExperience>
    | Partial<UserExperience>,
  typeOfObject: 'educations' | 'experiences' | 'projects',
) => {
  // before we put it into the db
  try {
    profileValidations[typeOfObject as keyof typeof profileValidations].parse(
      objectData,
    );

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from(`user_${typeOfObject}`)
      .update(objectData)
      .eq('id', objectData.id);

    if (error) throw new Error(error.message);
    revalidatePath(`/profile/${typeOfObject}`);
    revalidatePath(`/portfolio/${objectData.profile_id}`);
    return data || [];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const removeUserObject = async (
  objectId: string,
  typeOfObject: 'educations' | 'experiences' | 'projects',
) => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session || !session?.user)
    throw new Error(
      `You need to be logged in to remove ${typeOfObject} from your profile`,
    );

  const { data, error } = await supabase
    .from(`user_${typeOfObject}`)
    .delete()
    .eq('id', objectId);

  if (error) throw new Error(error.message);
  revalidatePath(`/profile/${typeOfObject}`);
  revalidatePath(`/portfolio/${session?.user.id}`);

  return data || [];
};

export const getSavedJobsFromUser = async () => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('profile_saved_jobs')
    .select(`saved_jobs (*)`);

  const savedJobs = data?.map((job) => job.saved_jobs) || [];

  if (error) throw Error(error.message);

  return savedJobs as SavedJobsType[];
};

export const removeJobFromDb = async (jobId: string, path: string) => {
  const supabase = await createSupabaseServerClient();
  // select saved_jobs based on job_id
  const { data, error } = await supabase
    .from('profile_saved_jobs')
    .select(`saved_jobs (*)`)
    .eq('saved_jobs.job_id', jobId);

  if (error) throw Error(error.message);
  // isolate current saved_job
  const jobToDelete: any[] = data.filter(
    // eslint-disable-next-line camelcase
    ({ saved_jobs }) => saved_jobs != null,
  );

  await supabase
    .from('profile_saved_jobs')
    .delete()
    .eq('job_id', jobToDelete[0].saved_jobs.id); // Delete from profile_saved_jobs first since it contains relation key

  await supabase
    .from('saved_jobs')
    .delete()
    .eq('id', jobToDelete[0].saved_jobs.id);

  if (path === '/saved-jobs') {
    revalidatePath('/saved-jobs');
  }
};

export const saveJobToDb = async (
  jobToSave: SavedJobsType,
  userId: any,
  path: string,
) => {
  const supabase = await createSupabaseServerClient();
  const { data: existingJobs } = await supabase
    .from('saved_jobs')
    .select('id')
    .eq('job_id', jobToSave.job_id);

  if (existingJobs && existingJobs.length > 0) {
    await supabase.from('profile_saved_jobs').insert({
      profile_id: userId,
      job_id: existingJobs[0].id,
    });
  } else {
    const saveJobToTable = await supabase
      .from('saved_jobs')
      .insert({
        job_id: jobToSave.job_id,
        job_description: jobToSave.job_description,
        job_title: jobToSave.job_title,
        job_city: jobToSave.job_city,
        job_country: jobToSave.job_country,
        job_state: jobToSave.job_state,
        job_posted_at_timestamp: jobToSave.job_posted_at_timestamp,
        employer_name: jobToSave.employer_name,
        employer_website: jobToSave.employer_website,
        employer_logo: jobToSave.employer_logo,
        job_apply_quality_score: jobToSave.job_apply_quality_score,
        job_min_salary: jobToSave.job_min_salary,
        job_max_salary: jobToSave.job_max_salary,
      })
      .select();

    if (!saveJobToTable.data) {
      throw Error(
        `error saving to saved_jobs tables ${JSON.stringify(
          saveJobToTable.error,
        )}`,
      );
    }

    await supabase.from('profile_saved_jobs').insert({
      profile_id: userId,
      job_id: saveJobToTable?.data[0].id,
    });

    if (path === '/saved-jobs') {
      revalidatePath('/saved-jobs');
    }
  }
};
