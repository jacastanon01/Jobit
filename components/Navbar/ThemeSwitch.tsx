'use client';
import { Switch } from '@/components/ui/switch';
import { useThemeContext } from '@/context/ThemeProvider';
import { setCookie } from 'cookies-next';
import Image from 'next/image';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const ThemeSwitch = () => {
  const { mode, setMode } = useThemeContext();

  useEffect(() => {
    if (!mode && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setCookie('theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setCookie('theme', mode === 'dark' ? 'light' : 'dark');
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const themeMotionVariants = {
    selectedMode: {
      opacity: 1,
      scale: 1,
    },
    notSelectedMode: {
      opacity: 0.4,
      scale: 0.7,
    },
  };

  return (
    <div className='flex gap-2.5'>
      <motion.div
        animate={
          mode === 'light'
            ? themeMotionVariants.selectedMode
            : themeMotionVariants.notSelectedMode
        }
      >
        <Image
          src={'/assets/icons/sun.svg'}
          width={24}
          height={24}
          alt='sun icon'
        />
      </motion.div>
      <Switch
        className='!bg-natural-2 transition-colors duration-300 dark:!bg-darkbg-3 [&>span]:bg-primary dark:[&>span]:bg-primary'
        checked={mode === 'dark'}
        onCheckedChange={toggleTheme}
      />

      <motion.div
        animate={
          mode === 'dark'
            ? themeMotionVariants.selectedMode
            : themeMotionVariants.notSelectedMode
        }
      >
        <Image
          src={'/assets/icons/moon.svg'}
          width={24}
          height={24}
          alt='sun icon'
        />
      </motion.div>
    </div>
  );
};

export default ThemeSwitch;
