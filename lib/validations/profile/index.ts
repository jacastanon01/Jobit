import { z } from 'zod';

export const experienceSchema = z
  .object({
    id: z.string().optional(),
    image_url: z.string().nullable(),
    company: z.string().trim().min(1, { message: 'Company is required' }),
    description: z
      .string()
      .trim()
      .min(1, { message: 'Description is required' })
      .max(400, { message: 'The description should be 400 caracters or less' }),
    role: z.string().trim().min(1, { message: 'Role is required' }),
    start_date: z.date({ required_error: 'Start date is required' }),
    end_date: z.date().nullable().optional(),
  })
  .refine((data) => data.end_date == null || data.start_date < data.end_date, {
    message: 'Start date must be before end date',
    path: ['start_date', 'end_date'],
  });

export const educationSchema = z
  .object({
    id: z.string().optional(),
    image_url: z.string().nullable(),
    institution: z
      .string()
      .trim()
      .min(1, { message: 'Institution is required' }),
    degree: z.string().trim().min(1, { message: 'Degree is required' }),
    field_of_study: z
      .string()
      .trim()
      .min(1, { message: 'Field of Study is required' }),
    start_date: z.date({ required_error: 'Start date is required' }),
    end_date: z.date().nullable().optional(),
  })
  .refine((data) => data.end_date == null || data.start_date < data.end_date, {
    message: 'Start date must be before end date',
    path: ['start_date', 'end_date'],
  });

export const projectSchema = z
  .object({
    id: z.string().optional(),
    image_url: z.string().nullable(),
    project_name: z
      .string()
      .trim()
      .min(1, { message: 'Project Name is required' }),
    link: z
      .string()
      .trim()
      .min(1, { message: 'Url of the project is required' }),
    description: z
      .string()
      .trim()
      .min(1, { message: 'Description is required' })
      .max(400, { message: 'The description should be 400 caracters or less' }),
    start_date: z.date({ required_error: 'Start date is required' }),
    end_date: z.date().nullable().optional(),
  })
  .refine((data) => data.end_date == null || data.start_date < data.end_date, {
    message: 'Start date must be before end date',
    path: ['start_date', 'end_date'],
  });

export const profileSchema = z.object({
  id: z.string().uuid({ message: 'Invalid ID format' }).optional(),
  bio: z
    .string()
    .trim()
    .min(1, { message: 'Bio must be at least 1 caracter' })
    .max(400, { message: 'Bio must be at 400 caracters or less' })
    .optional()
    .nullable(),
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(1, { message: 'Email is required' }),
  full_name: z.string().trim().min(1, { message: 'Full name is required' }),
  github: z
    .string()
    .url({ message: 'Invalid URL format' })
    .optional()
    .nullable(),
  image_url: z
    .string()
    .url({ message: 'Invalid URL format' })
    .optional()
    .nullable(),
  linkedin: z
    .string()
    .url({ message: 'Invalid URL format' })
    .optional()
    .nullable(),
  published: z.boolean(),
  role: z.string().trim().min(1, { message: 'Role is required' }),
  twitter: z
    .string()
    .url({ message: 'Invalid URL format' })
    .optional()
    .nullable(),
  username: z.string().trim().min(1, { message: 'Username is required' }),
  website: z
    .string()
    .url({ message: 'Invalid URL format' })
    .optional()
    .nullable(),
});

export const profileValidations = {
  experiences: experienceSchema,
  projects: projectSchema,
  educations: educationSchema,
};
