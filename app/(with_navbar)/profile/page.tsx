import ProfileForm from '@/components/ProfilePage/ProfileForm';
import { getProfile } from '@/lib/supabase/actions';

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <section className='flex grow flex-col items-center '>
      {profile && <ProfileForm profile={profile} />}
    </section>
  );
}
