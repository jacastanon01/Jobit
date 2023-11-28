'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
interface ThemeContextType {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  defaultMode,
  children,
}: {
  defaultMode: string;
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState(defaultMode);

  const theme = getCookie('theme');

  const handleThemeChange = () => {
    if (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setMode('dark');
      document.documentElement.classList.add('dark');
    } else {
      setMode('light');
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
}
