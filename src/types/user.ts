export interface User {
    uid: string,
    email: string,
    fullName? : string;
    photoUrl? : string;
};
export type ResumeFile = {
  uri: string;
  name: string;
  size?: number;
  type?: string;
};

export type Resume = {
  id: string;
  fileName: string;
  overallScore: number;
  summary: string;
}