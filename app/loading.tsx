import Logo from '@/components/Logo';

const Loading = () => {
  return (
    <div className='flex h-[calc(100vh-200px)] animate-pulse items-center justify-center'>
      <Logo height={110} width={430} />
    </div>
  );
};

export default Loading;
