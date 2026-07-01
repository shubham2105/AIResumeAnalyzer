export interface ResumeAnalysis {
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

export interface Resume {
  id: string;

  userId: string;
  fileName: string;
  fileSize?: number;
  mimeType?: string;

  extractedText?: string;
  characters?: number;

  overallScore: number;
  summary: string;

  skills: {
    name: string;
    proficiency: string;
    category: string;
  }[];

  strengths: string[];
  weaknesses: string[];
  recommendations: string[];

  jobRoles: {
    role: string;
    match_score: number;
    notes: string;
  }[];

  uploadedAt?: any;
  status: string;
}