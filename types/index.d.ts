export enum employmentType {
  'FULLTIME',
  'PARTTIME',
  'CONTRACT',
  'TEMPORARY',
}

export interface JobData {
  employer_name: string;
  employer_logo: string | null;
  employer_website: string | null;
  employer_company_type: string | null;
  job_publisher: string;
  job_id: string;
  job_employment_type: employmentType;
  job_title: string;
  job_apply_link: string;
  job_apply_is_direct: boolean;
  job_apply_quality_score: number;
  job_description: string;
  job_is_remote: boolean;
  job_posted_at_timestamp: number;
  job_posted_at_datetime_utc: string;
  job_city: string;
  job_state: string;
  job_country: string;
  job_latitude: number;
  job_longitude: number;
  job_benefits: string[];
  job_google_link: string;
  job_offer_expiration_datetime_utc: string;
  job_offer_expiration_timestamp: number;
  job_required_experience: {
    no_experience_required: boolean;
    required_experience_in_months: number;
    experience_mentioned: boolean;
    experience_preferred: boolean;
  };
  job_required_skills: string[] | null;
  job_required_education: {
    postgraduate_degree: boolean;
    professional_certification: boolean;
    high_school: boolean;
    associates_degree: boolean;
    bachelors_degree: boolean;
    degree_mentioned: boolean;
    degree_preferred: boolean;
    professional_certification_mentioned: boolean;
  };
  job_experience_in_place_of_education: boolean;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_currency: string | null;
  job_salary_period: string | null;
  job_highlights: {
    Qualifications: string[];
    Responsibilities: string[];
    Benefits: string[];
  };
  job_job_title: string | null;
  job_posting_language: string;
  job_onet_soc: string;
  job_onet_job_zone: string;
  job_occupational_categories: string[];
  estimated_salaries: any[];
  apply_options: {
    option_name: string;
    option_value: string;
  }[][];
  employer_reviews: any[];
}

export type JobDetailsData = JobData[];

export type MenuLinkType = {
  label: string;
  route: string;
};

export interface CommonFilterDataShapeType {
  name: string;
  value: string;
  est_count: number;
}

interface CategoryType extends CommonFilterDataShapeType {}

interface JobTitleType extends CommonFilterDataShapeType {}

interface DatePostedType extends CommonFilterDataShapeType {}

interface EmploymentTypeType extends CommonFilterDataShapeType {}

interface JobRequirementType extends CommonFilterDataShapeType {}

interface CompanyTypesType extends CommonFilterDataShapeType {}

interface EmployersType extends CommonFilterDataShapeType {}

export interface FiltersType {
  categories: CategoryType[];
  job_titles: JobTitleType[];
  date_posted: DatePostedType[];
  employment_types: EmploymentTypeType[];
  job_requirements: JobRequirementType[];
  company_types: CompanyTypesType[];
  employers: EmployersType[];
}

interface JobRequiredExperienceType {
  no_experience_required?: boolean;
  required_experience_in_months: number | null;
  experience_mentioned?: boolean;
  experience_preferred?: boolean;
}

interface JobRequiredEducationType {
  postgraduate_degree: boolean;
  professional_certification: boolean;
  high_school: boolean;
  associates_degree: boolean;
  bachelors_degree: boolean;
  degree_mentioned: boolean;
  degree_preferred: boolean;
  professional_certification_mentioned: boolean;
}

interface JobHighlightsType {
  Qualifications: string[];
  Responsibilities: string[];
  Benefits: string[];
}

export interface JobListingType {
  employer_name?: string | null;
  employer_logo?: string | null;
  employer_website?: string | null;
  employer_company_type?: string | null;
  job_publisher?: string | null;
  job_id?: string | null;
  job_employment_type?: string | null;
  job_title?: string | null;
  job_apply_link?: string | null;
  job_apply_is_direct?: boolean | null;
  job_apply_quality_score?: number | null;
  job_description?: string | null;
  job_is_remote?: boolean | null;
  job_posted_at_timestamp?: number | null;
  job_posted_at_datetime_utc?: string | null;
  job_city?: string | null;
  job_state?: string | null;
  job_country?: string | null;
  job_latitude?: number | null;
  job_longitude?: number | null;
  job_occupational_categories?: string[] | null;
  job_benefits?: any[] | null; // This can be replaced with a specific type if the benefits structure is known.
  job_google_link?: string | null;
  job_offer_expiration_datetime_utc?: string | null;
  job_offer_expiration_timestamp?: number | null;
  job_required_experience?: JobRequiredExperienceType | null;
  job_required_skills?: any[] | null; // Replace with a type if the structure becomes available.
  job_required_education?: JobRequiredEducationType | null;
  job_experience_in_place_of_education?: boolean | null;
  job_min_salary?: number | null;
  job_max_salary?: number | null;
  job_salary_currency?: string | null;
  job_salary_period?: string | null;
  job_highlights?: JobHighlightsType | null | object;
  job_job_title?: string | null;
  job_posting_language?: string | null;
  job_onet_soc?: string | null;
  job_onet_job_zone?: string | null;
  job_naics_code?: string | null;
  job_naics_name?: string | null;
}

export interface CompanyDataType {
  company_links?:
    | {
        text: string;
        url: string;
      }[]
    | null;
  description?: string | null;
  employees?: string | null;
  facebookId?: string | null;
  founded?: number | null;
  hq_location?: string | null;
  indeed_final_url?: string | null;
  logo_url?: string | null;
  name?: string | null;
  rating?: number | null;
  revenue?: string | null;
  review_count?: number | null;
  sectors?: string[] | null;
  twitterId?: string | null;
}

export type CompanyInfoTypes = {
  description: string;
  name: string;
  followers: number;
  about: string;
  image: string;
};

export type JobSalaryEntryType = {
  location?: string;
  job_title?: string;
  publisher_name?: string;
  publisher_link?: string;
  min_salary?: number;
  max_salary?: number;
  median_salary?: number;
  salary_period?: 'YEAR';
  salary_currency?: 'CAD';
};

export interface UserEducation {
  image_url?: string | null;
  id: string;
  profile_id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: Date;
  end_date?: Date | null | undefined;
}

export interface UserExperience {
  image_url?: string | null;
  id: string;
  profile_id: string;
  company: string;
  role: string;
  description: string;
  start_date: Date;
  end_date?: Date | null | undefined;
}

export interface UserProject {
  image_url?: string | null;
  id: string;
  profile_id: string;
  project_name: string;
  description: string;
  link: string;
  start_date: Date;
  end_date?: Date | null | undefined;
}

export type SavedJobsType = {
  job_id?: string | null;
  job_title?: string | null;
  job_description?: string | null;
  job_apply_quality_score?: number | null;
  job_max_salary?: number | null;
  job_min_salary?: number | null;
  employer_website?: string | null;
  job_city?: string | null;
  job_country?: string | null;
  job_state?: string | null;
  employer_logo?: string | null;
  employer_name?: string | null;
  job_posted_at_timestamp?: number | null;
};
