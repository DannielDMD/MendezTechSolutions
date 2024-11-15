import { createClient } from "@supabase/supabase-js";

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  employees: number;
  location: string;
  context: string;
  problems: string[];
  challenges: string;
  objectives: string[];
  solution: {
    title: string;
    description: string;
  }[];
  solution_text: string;
  results: string[];
  heroImage: string;
  shortDescription: string;
  link: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  const { data, error } = await supabase.from("case_studies").select("*");

  if (error) throw error;
  return data;
};

export const getCaseStudyById = async (id: string): Promise<CaseStudy> => {
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};
