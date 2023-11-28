'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { JobListingType } from '@/types';
interface SavedJobsContextType {
  savedJobs: JobListingType[] | [];
  setSavedJobs: React.Dispatch<React.SetStateAction<JobListingType[] | []>>;
}

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(
  undefined,
);

export function SavedJobsProvider({ children }: { children: React.ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<JobListingType[]>(
    typeof window !== 'undefined' &&
      window.localStorage &&
      JSON.parse(localStorage.getItem('savedJobs') || '[]'),
  );

  useEffect(() => {
    window.localStorage &&
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  return (
    <SavedJobsContext.Provider value={{ savedJobs, setSavedJobs }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobsContext() {
  const context = useContext(SavedJobsContext);

  if (context === undefined) {
    throw new Error(
      'useSavedJobsContext must be used within a SavedJobsProvider',
    );
  }

  return context;
}
