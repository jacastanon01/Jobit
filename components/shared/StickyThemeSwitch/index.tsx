import ThemeSwitch from '@/components/Navbar/ThemeSwitch';

const StickyThemeSwitch = () => {
  return (
    <div className='fixed bottom-2 right-2 rounded-lg bg-white p-3 shadow-md dark:bg-[#111116]'>
      <ThemeSwitch />
    </div>
  );
};

export default StickyThemeSwitch;
