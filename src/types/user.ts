export interface User {
    uid: string,
    email: string,
    fullName? : string;
    photoUrl? : string;
};
type ResumeFile = {
  uri: string;
  name: string;
  size?: number;
  type?: string;
};