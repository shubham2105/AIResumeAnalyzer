
export interface ResumeAnalysis{
    overall_score: number;
    summary: string;

    skills: {
    name: string;
    proficiency: string;
    category: string;
  }[];

  strengths: string[];

  weaknesses: string[];

  recommendations: string[];

  job_roles: {
    role: string;
    match_score: number;
    notes: string;
  }[];
}