interface Score {
    P: number;
  }
  
  interface Candidate {
    id: number;
    candidate_firstName: string;
    candidate_lastName: string;
    candidateGender: string;
    candidateComment: string;
    candidate_email: string;
  }
  
  interface HandledBy {
    id: number;
    last_login: string | null;
    userEmail: string;
    username: string;
    firstName: string;
    lastName: string;
    userRole: string;
  }
  
  interface Job {
    id: number;
    jobRequest_Title: string;
    jobRequest_Role: string;
    jobRequest_KeySkills: string;
    jobRequest_Description: string;
  }
  
  interface UserDetails {
    id: number;
    question_score: number | null;
    status: string | null;
    candidate: Candidate;
    handled_by: HandledBy;
    job_id: Job;
  }
  
 export interface Event {
    id: number;
    summary: string;
    desc: string;
    start: string; // ISO 8601 date-time string
    end: string; // ISO 8601 date-time string
    attendees: null; // Replace with appropriate type if attendees are present
    status: null; // Replace with appropriate type if status is present
    comment: null; // Replace with appropriate type if comment is present
    score: Score;
    link: string;
    user_det: UserDetails;
    job_id: Job;
  }