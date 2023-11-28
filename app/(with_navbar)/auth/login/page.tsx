import { SignInWithGithub } from '@/components/Auth/SignInWithGithub';
import Logo from '@/components/Logo';

export default async function Login() {
  return (
    <main className='mt-[59px] flex flex-col items-center gap-6'>
      <Logo width={300} />
      <h1 className='text-center font-normal dark:text-white'>
        Find your new next engineer job
        <br />
        <span className='font-extrabold italic'>
          in days, <span className='underline'>not month</span>
        </span>
      </h1>
      <SignInWithGithub />
    </main>
  );
}
