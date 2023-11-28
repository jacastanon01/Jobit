/* eslint-disable */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profile_saved_jobs: {
        Row: {
          job_id: string;
          profile_id: string;
        };
        Insert: {
          job_id: string;
          profile_id: string;
        };
        Update: {
          job_id?: string;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profile_saved_jobs_job_id_fkey';
            columns: ['job_id'];
            isOneToOne: false;
            referencedRelation: 'saved_jobs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'profile_saved_jobs_profile_id_fkey';
            columns: ['profile_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          bio: string;
          email: string;
          full_name: string;
          github: string;
          id: string;
          image_url: string;
          linkedin: string;
          published: boolean;
          role: string;
          twitter: string;
          username: string;
          website: string;
        };
        Insert: {
          bio?: string;
          email?: string;
          full_name?: string;
          github?: string;
          id: string;
          image_url?: string;
          linkedin?: string;
          published?: boolean;
          role?: string;
          twitter?: string;
          username?: string;
          website?: string;
        };
        Update: {
          bio?: string;
          email?: string;
          full_name?: string;
          github?: string;
          id?: string;
          image_url?: string;
          linkedin?: string;
          published?: boolean;
          role?: string;
          twitter?: string;
          username?: string;
          website?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      saved_jobs: {
        Row: {
          created_at: string;
          employer_logo: string | null;
          employer_name: string | null;
          employer_website: string | null;
          id: string;
          job_apply_quality_score: number | null;
          job_city: string | null;
          job_country: string | null;
          job_description: string | null;
          job_id: string | null;
          job_max_salary: number | null;
          job_min_salary: number | null;
          job_posted_at_timestamp: number | null;
          job_state: string | null;
          job_title: string;
        };
        Insert: {
          created_at?: string;
          employer_logo?: string | null;
          employer_name?: string | null;
          employer_website?: string | null;
          id?: string;
          job_apply_quality_score?: number | null;
          job_city?: string | null;
          job_country?: string | null;
          job_description?: string | null;
          job_id?: string | null;
          job_max_salary?: number | null;
          job_min_salary?: number | null;
          job_posted_at_timestamp?: number | null;
          job_state?: string | null;
          job_title: string;
        };
        Update: {
          created_at?: string;
          employer_logo?: string | null;
          employer_name?: string | null;
          employer_website?: string | null;
          id?: string;
          job_apply_quality_score?: number | null;
          job_city?: string | null;
          job_country?: string | null;
          job_description?: string | null;
          job_id?: string | null;
          job_max_salary?: number | null;
          job_min_salary?: number | null;
          job_posted_at_timestamp?: number | null;
          job_state?: string | null;
          job_title?: string;
        };
        Relationships: [];
      };
      user_educations: {
        Row: {
          degree: string | null;
          end_date: string | null;
          field_of_study: string | null;
          id: string;
          image_url: string | null;
          institution: string | null;
          profile_id: string;
          start_date: string | null;
        };
        Insert: {
          degree?: string | null;
          end_date?: string | null;
          field_of_study?: string | null;
          id?: string;
          image_url?: string | null;
          institution?: string | null;
          profile_id: string;
          start_date?: string | null;
        };
        Update: {
          degree?: string | null;
          end_date?: string | null;
          field_of_study?: string | null;
          id?: string;
          image_url?: string | null;
          institution?: string | null;
          profile_id?: string;
          start_date?: string | null;
        };
        Relationships: [];
      };
      user_experiences: {
        Row: {
          company: string | null;
          description: string | null;
          end_date: string | null;
          id: string;
          image_url: string | null;
          profile_id: string | null;
          role: string | null;
          start_date: string | null;
        };
        Insert: {
          company?: string | null;
          description?: string | null;
          end_date?: string | null;
          id?: string;
          image_url?: string | null;
          profile_id?: string | null;
          role?: string | null;
          start_date?: string | null;
        };
        Update: {
          company?: string | null;
          description?: string | null;
          end_date?: string | null;
          id?: string;
          image_url?: string | null;
          profile_id?: string | null;
          role?: string | null;
          start_date?: string | null;
        };
        Relationships: [];
      };
      user_projects: {
        Row: {
          description: string | null;
          end_date: string | null;
          id: string;
          image_url: string | null;
          link: string | null;
          profile_id: string | null;
          project_name: string | null;
          start_date: string | null;
        };
        Insert: {
          description?: string | null;
          end_date?: string | null;
          id?: string;
          image_url?: string | null;
          link?: string | null;
          profile_id?: string | null;
          project_name?: string | null;
          start_date?: string | null;
        };
        Update: {
          description?: string | null;
          end_date?: string | null;
          id?: string;
          image_url?: string | null;
          link?: string | null;
          profile_id?: string | null;
          project_name?: string | null;
          start_date?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
