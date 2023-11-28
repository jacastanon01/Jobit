import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { programmingLanguages } from '@/constants/programmingLanguages';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { jsearchapi } from '@/constants/jsearchapi';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function jsearchFetch(url: string) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.XRapidAPIKey || '',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return { data: data.data, parameters: data.parameters };
  } catch (e) {
    console.error(e);
  }
}

export async function fetchEmployerParams(employerName: string | null) {
  try {
    const results = await jsearchFetch(
      `${jsearchapi.searchFilter}?query=${employerName}%20jobs`,
    );
    if (results?.data) {
      const {
        data: { employers },
      } = results;
      return employers;
    }
  } catch (e) {
    console.log(e);
  }
}

export async function theCompaniesApiFetch(companyName: string | null) {
  try {
    const url = `https://api.thecompaniesapi.com/v1/companies/by-name?name=${companyName}`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${process.env.CompaniesAPIKey}`,
      },
    };

    const response = await fetch(url, options);
    const { companies } = await response.json();

    return companies[0];
  } catch (e) {
    console.log(e);
  }
}

const unitlist = ['', 'K', 'M', 'B'];
export function formatNumber(number: number) {
  const sign = Math.sign(number);
  let unit = 0;

  while (Math.abs(number) >= 1000) {
    unit = unit + 1;
    number = Math.floor(Math.abs(number) / 100) / 10;
  }
  return sign * Math.abs(number) + unitlist[unit];
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

export function findKeywords(jobDescription: string, maxKeywords: number = 7) {
  const descriptionLowerCase = jobDescription.toLowerCase();
  const uniqueKeywords = new Set<string>();

  for (const programmingLanguage of programmingLanguages) {
    if (uniqueKeywords.size >= maxKeywords) {
      break; // Stop the loop if we've reached the maximum number of keywords
    }
    // Only use the lowercase version for comparison
    if (descriptionLowerCase.includes(programmingLanguage.toLowerCase())) {
      uniqueKeywords.add(programmingLanguage); // Add the original case version to the Set
    }
  }

  return Array.from(uniqueKeywords);
}

export const addOrReplaceJobSearchParams = (
  paramsArray: Record<string, string>[],
  router: AppRouterInstance,
  url: string = '/jobs-search',
) => {
  if (!router) return;
  if (!window) return;

  const queryParams = new URLSearchParams(window.location.search);

  paramsArray.forEach((param) => {
    const key = Object.keys(param)[0];
    const value = param[key];
    if (key && value !== undefined) {
      // Ensure the key is not empty and the value is not undefined
      queryParams.set(key, value);
    }
  });

  router.push(`${url}?${queryParams.toString()}`, { scroll: false });
};

export function formatLocation(
  city?: string | null,
  state?: string | null,
  country?: string | null,
): string | null {
  const locationParts = [city, state, country].filter(Boolean);
  return locationParts.length > 0 ? locationParts.join(', ') : null;
}
